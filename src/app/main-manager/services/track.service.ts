import { Injectable } from '@angular/core';
import { SpotifyObjectsService } from './spotify-objects.service';
import { Track } from '../interfaces';
import { ReleaseType } from '../types';
import { SPOTIFY_ORDERED_TYPES } from '../constants';
import { NameManagerService } from './name-manager.service';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  constructor(
    private _spotifyService: SpotifyObjectsService,
    private _nameService: NameManagerService,
  ) { }

  public filterFromTrack(track: Track, query: string): Track[] {
    if(query?.length === 0) return [];
    return this._spotifyService.tracks.filter((t: Track) => t.id !== track.id && !track._children?.includes(t) && t.name.toLowerCase().includes(query.toLowerCase()));
  }

  public setPlaycountTrack(track: Track){
    if(!track.playcountTrack) return; // Track remains as playcount track (with the same role)
    // If track is playcount child
    let playcountTracks = track.parentTrack?._children?.filter((t: Track) => t.playcount === track.playcount);
    playcountTracks?.forEach((t: Track) => t.playcountTrack = track);
    track.playcountTrack = undefined;
    track.parentTrack?._children && this.setMaxPlaycountTrack([track.parentTrack, ...track.parentTrack._children]);
  }

  public match(parentTrack: Track, childTrack: Track): void {
    // Add Child-Track to Parent-Track Children
    if(!parentTrack._children){ 
      parentTrack._children = [childTrack];
    } else parentTrack._children.push(childTrack);

    // Sort Parent-Track Children
    parentTrack._children.sort((a: Track, b: Track) => {
      // Playcount
      if(b.playcount - a.playcount !== 0) return b.playcount - a.playcount;
      // Normaliced Name
      if(!this._nameService.matchedNames(a, b)) return a.normalicedName.localeCompare(b.normalicedName);
      // Parent Album
      let aIsParentAlbum = b.release.parentRelease && b.release.parentRelease === a.release;
      let bIsParentAlbum = a.release.parentRelease && a.release.parentRelease === b.release;
      if(aIsParentAlbum || bIsParentAlbum) return aIsParentAlbum ? -1 : 1;
      // Type Order
      let aTypeIndex = SPOTIFY_ORDERED_TYPES.findIndex((type: ReleaseType) => type === a.release.type);
      let bTypeIndex = SPOTIFY_ORDERED_TYPES.findIndex((type: ReleaseType) => type === b.release.type);
      if(aTypeIndex >= 0 && bTypeIndex >= 0 && aTypeIndex - bTypeIndex !== 0) return aTypeIndex - bTypeIndex;
      // Date
      let aTime = a.release.date.getTime();
      let bTime = b.release.date.getTime();
      if(aTime - bTime !== 0) return aTime - bTime;
      // Name Length
      if(a.name.length - b.name.length !== 0) return a.name.length - b.name.length;
      // Track Count
      let aTracks = a.release.tracks ? a.release.tracks.length : 0;
      let bTracks = b.release.tracks ? b.release.tracks.length : 0;
      if(aTracks - bTracks !== 0) return aTracks - bTracks;
      return 1;
    }
    );

    // Set Child-Track's playcount Track
    if(childTrack.playcount === parentTrack.playcount){
      childTrack.playcountTrack = parentTrack;
    } else {
      const samePlaycountTracks = parentTrack._children.filter((t: Track) => t.playcount === childTrack.playcount);
      if(samePlaycountTracks[0]!.id === childTrack.id){
        samePlaycountTracks.forEach((t: Track) => t.playcountTrack = childTrack);
        childTrack.playcountTrack = undefined;
      } else {
        childTrack.playcountTrack = samePlaycountTracks[0];
      }
    }

    // Set Track's Max-Playcount-Track
    this.setMaxPlaycountTrack([parentTrack, ...parentTrack._children]);

    // Set Track's Original-Track
    this.setOriginalTrack([parentTrack, ...parentTrack._children]);

    // Set Child-Track's Parent-Track
    childTrack.parentTrack = parentTrack;
  }

  public unmatch(childTrack: Track): void {
    let childTrackIndex: number | undefined = childTrack.parentTrack?._children?.findIndex((r: Track) => r === childTrack);
    if(childTrackIndex !== undefined && childTrackIndex >= 0){
      // Remove track from parent-children and remove track's parent-track
      childTrack.parentTrack!._children!.splice(childTrackIndex,1);
      // If unmatched track was playcount-track and there's child tracks left
      if(childTrack.playcountTrack === undefined && childTrack.parentTrack?._children?.length){
        const samePlaycountTracks = childTrack.parentTrack!._children!.filter((t: Track) => t.playcount === childTrack.playcount);
        // Re-assign playcount-track
        samePlaycountTracks.length > 0 && samePlaycountTracks.forEach((t: Track, i: number) => {
          t.playcountTrack = i === 0 ? undefined : samePlaycountTracks[0];
        });
      }
      // If unmatched track was the max-playcount-track resets max-playcount-track
      if(!childTrack.maxPlaycountTrack && childTrack.parentTrack?._children?.length){
        this.setMaxPlaycountTrack([...childTrack.parentTrack._children]);
      } else if(!childTrack.parentTrack!._children?.length) {
        childTrack.parentTrack!.maxPlaycountTrack = undefined;
      }
      // If unmatched track was the original-track resets original-track
      if(!childTrack.originalTrack && childTrack.parentTrack?._children?.length){
        this.setOriginalTrack([...childTrack.parentTrack._children]);
      } else if(!childTrack.parentTrack!._children?.length) {
        childTrack.parentTrack!.originalTrack = undefined;
      }
      //Remove parent-track, playcount-track, max-playcount-track and original-Track from unmatched track
      childTrack.parentTrack = undefined;
      childTrack.playcountTrack = undefined;
      childTrack.maxPlaycountTrack = undefined;
      childTrack.originalTrack = undefined;
    } else throw Error('childTrackIndex was not found');
  }

  public setOriginalTrack(tracks: Track[]){
    let originalTrack = tracks.sort((a, b) => {
      let aTime = a.release.date.getTime() + (a.release.timeIndex ?? 0);
      let bTime = b.release.date.getTime() + (b.release.timeIndex ?? 0);
      return aTime - bTime;
    })[0];
    tracks.forEach((t: Track) => t.originalTrack = t.id !== originalTrack.id ? originalTrack : undefined);
  }

  private setMaxPlaycountTrack(tracks: Track[]){
    let maxPlaycountTrack = tracks.filter((t: Track) => !t.playcountTrack).sort((a, b) => b.playcount - a.playcount)[0];
    tracks.forEach((t: Track) => t.maxPlaycountTrack = t.id !== maxPlaycountTrack.id ? maxPlaycountTrack : undefined);
  }

  public depurateTracks(){
    let tracks = this._spotifyService.tracks;

    // Delete Duplicated Tracks
    for(let i = tracks.length - 1; i >= 0; i--) { 
      tracks.some((track: Track, idx: number) => idx !== i && tracks[i].id === track.id) && tracks.splice(i, 1);
    }
    
    // Parent Tracks Proposals
    let sortedTracks = [...tracks].sort((a: Track, b: Track) => { 
      if(!this._nameService.matchedNames(a, b)) return a.normalicedName.localeCompare(b.normalicedName);
      // Parent Album
      let aIsParentAlbum = b.release.parentRelease && b.release.parentRelease === a.release;
      let bIsParentAlbum = a.release.parentRelease && a.release.parentRelease === b.release;
      if(aIsParentAlbum || bIsParentAlbum) return aIsParentAlbum ? -1 : 1;
      // Type Order
      let typeOrder: ReleaseType[] = SPOTIFY_ORDERED_TYPES;
      let aTypeIndex = typeOrder.findIndex((type: ReleaseType) => type === a.release.type);
      let bTypeIndex = typeOrder.findIndex((type: ReleaseType) => type === b.release.type);
      if(aTypeIndex >= 0 && bTypeIndex >= 0 && aTypeIndex - bTypeIndex !== 0) return aTypeIndex - bTypeIndex;
      // Date
      let aTime = a.release.date.getTime();
      let bTime = b.release.date.getTime();
      if(aTime - bTime !== 0) return aTime - bTime;
      // Name Length
      if(a.name.length - b.name.length !== 0) return a.name.length - b.name.length;
      // Playcount
      if(b.playcount - a.playcount !== 0) return b.playcount - a.playcount;
      // Track Count
      let aTracks = a.release.tracks ? a.release.tracks.length : 0;
      let bTracks = b.release.tracks ? b.release.tracks.length : 0;
      if(aTracks - bTracks !== 0) return aTracks - bTracks;
      return 1;
    });

    sortedTracks.map((track: Track) => {
      !track.parentTrack && sortedTracks
        .filter((t: Track) => t.id !== track.id && !t.parentTrack && this._nameService.matchedNames(track, t))
        .map((childTrack: Track) => this.match(track, childTrack))
    });
  }
}
