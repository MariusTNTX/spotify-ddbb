import { Injectable } from '@angular/core';
import { SpotifyObjectsService } from './spotify-objects.service';
import { Release, Track } from '../interfaces';
import { ReleaseType } from '../types';
import { ORDERED_TYPES } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ReleaseService {

  constructor(private _spotifyService: SpotifyObjectsService) { }

  public filterFromRelease(release: Release, query: string): Release[] {
    if(query?.length === 0) return [];
    return this._spotifyService.releases.filter((r: Release) => {
      return !r.parentRelease && !r._children && r.id !== release.id && r.name.toLowerCase().includes(query.toLowerCase())
    });
  }

  public hasDuplicates(release: Release): boolean {
    let currentReleaseTime = release.date.getTime() + (release.timeIndex ?? 0);
    return this._spotifyService.releases.some((r: Release) => {
      let rDate = r.date.getTime() + (r.timeIndex ?? 0);
      return r.id !== release.id && currentReleaseTime === rDate;
    });
  }

  public match(parentRelease: Release, childRelease: Release): void {
    if(parentRelease._children) parentRelease._children.push(childRelease);
    else parentRelease._children = [childRelease];
    childRelease.parentRelease = parentRelease;
  }

  public unmatch(childRelease: Release): void {
    let childReleaseIndex: number | undefined = childRelease.parentRelease?._children?.findIndex((r: Release) => r === childRelease);
    if(childReleaseIndex !== undefined && childReleaseIndex >= 0){
      childRelease.parentRelease!._children!.splice(childReleaseIndex,1);
      childRelease.parentRelease = undefined;
    } else throw Error('childReleaseIndex was not found');
  }

  public depurateReleases() {
    let releases = this._spotifyService.releases;

    // Delete Releases Without Tracks
    for(let i = releases.length - 1; i >= 0; i--) { 
      !releases[i].tracks?.length && releases.splice(i, 1);
    }

    // Live Releases
    releases.forEach((release: Release) => { 
      let liveTrackLength = release.tracks?.filter((track: Track) => track.name.toLowerCase().includes('live'))?.length ?? 0;
      if(liveTrackLength && release.tracks?.length && liveTrackLength > (release.tracks.length * 0.66)){
        release.type = 'LIVE';
      }
      return release;
    })

    // Parent Releases Proposals
    let sortedReleases = [...this._spotifyService.releases].sort((a: Release, b: Release) => { 
      if(!this.matchedReleaseNames(a, b)) return a.normalicedName.localeCompare(b.normalicedName);
      // Type Order
      let aTypeIndex = ORDERED_TYPES.findIndex((type: ReleaseType) => type === a.type);
      let bTypeIndex = ORDERED_TYPES.findIndex((type: ReleaseType) => type === b.type);
      if(aTypeIndex >= 0 && bTypeIndex >= 0 && aTypeIndex - bTypeIndex !== 0) return aTypeIndex - bTypeIndex;
      // Date
      let aTime = a.date.getTime();
      let bTime = b.date.getTime();
      if(aTime - bTime !== 0) return aTime - bTime;
      // Name Length
      if(a.name.length - b.name.length !== 0) return a.name.length - b.name.length;
      // Track Count
      if(a.tracks && b.tracks && a.tracks.length - b.tracks.length !== 0) return a.tracks.length - b.tracks.length;
      return 1;
    });
    sortedReleases.map((release: Release) => {
      !release.parentRelease && sortedReleases
        .filter((r: Release) => r.id !== release.id && !r.parentRelease && this.matchedReleaseNames(release, r))
        .forEach((releaseChild: Release) => {
          releaseChild.parentRelease = release;
          if(release._children) release._children.push(releaseChild);
          else release._children = [releaseChild];
          return releaseChild;
        })
    });
  }

  public normalizeRelease(name: string): string {
    const replacements: { regexp: RegExp, replace: string }[] = [
      { regexp: /’|´/g, replace: "'" },
      { regexp: /&/g, replace: 'and' },
      { regexp: /\.\.\./g, replace: '' },
      { regexp: /^(the |an |a )/, replace: '' },
      { regexp: /\s+/g, replace: " " },
    ];
    let cleanedName = name.trim().toLowerCase().split(/[\(\-\:]/)[0];
    return replacements.reduce((res: string, { regexp, replace }) => res.replace(regexp, replace), cleanedName).trim();
  };

  public matchedReleaseNames(originRelease: Release | string, targetRelease: Release | string){
    let cleanOrigin: string;
    let cleanTarget: string;
    if(typeof(originRelease) !== 'string' && typeof(targetRelease) !== 'string'){
      cleanOrigin = originRelease.normalicedName;
      cleanTarget = targetRelease.normalicedName;
    } else {
      cleanOrigin = originRelease as string;
      cleanTarget = targetRelease as string;
    }
    return cleanOrigin === cleanTarget || cleanOrigin.startsWith(cleanTarget) || cleanTarget.startsWith(cleanOrigin);
  }
}
