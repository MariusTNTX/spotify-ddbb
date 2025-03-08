import { Injectable } from '@angular/core';
import { SpotifyObjectsService } from './spotify-objects.service';
import { Artist, Release, Track } from '../interfaces';
import { ReleaseType } from '../types';
import { ReleaseService } from './release.service';
import { TrackService } from './track.service';

@Injectable({
  providedIn: 'root'
})
export class HarReaderService {

  constructor(
    private _spotifyService: SpotifyObjectsService,
    private _releaseService: ReleaseService,
    private _trackService: TrackService,
  ) { }

  public setFullBandInfo(json: any){

    /* FULL PROFILE */
    const artistOverview = this.getArtistOverview(json);
    this.setMainArtist(artistOverview);
    this.setTopCities(artistOverview);
    this.setExternalLinks(artistOverview);
    this.setArtistGallery(artistOverview);

    /* RELATED ARTISTS */
    this.setRelatedArtists(json);

    /* FULL RELEASES */
    this.setFullReleases(json);

    /* FULL TRACKS */
    this.setFullTracks(json);
    
    /* RELEASE DEPURATION */
    this._releaseService.depurateReleases();
    
    /* TRACK DEPURATION */
    this._trackService.depurateTracks();

    console.log(this._spotifyService.DATA);
  }

  private getArtistOverview(json: any){
    return json.log.entries
      .filter((entry: any) => entry.request.url.includes('queryArtistOverview') && entry.response.content.text)
      .map((entry: any) => JSON.parse(entry.response.content.text))
      .map((content: any) => content.data.artistUnion)
      [0];
  }

  private setMainArtist(artistOverview: any){
    this._spotifyService.artists.slice(0, this._spotifyService.artists.length);
    this._spotifyService.artists.push({
      id: artistOverview.id,
      name: artistOverview.profile.name,
      avatarImage: artistOverview.visuals.avatarImage.sources.reduce((acc: any, item: any) => acc && acc.width > item.width ? acc : item, null)?.url ?? '',
      monthlyListeners: artistOverview.stats.monthlyListeners,
      followers: artistOverview.stats.followers,
      shareId: artistOverview.sharingInfo.shareId,
      headerImage: artistOverview.headerImage.data.sources.reduce((acc: any, item: any) => acc && acc.maxWidth > item.maxWidth ? acc : item, null)?.url ?? '',
      description: artistOverview.profile.biography.text ?? '',
      backBaseColor: this.convertRgbToHex(artistOverview.visualIdentity.wideFullBleedImage.extractedColorSet.highContrast.backgroundBase),
      hasFullProfile: true,
      verified: artistOverview.profile.verified,
      onList: true,
      lastUpload: new Date(),
    });
  }

  private setTopCities(artistOverview: any){
    this._spotifyService.artistTopCities.slice(0, this._spotifyService.artistTopCities.length);
    this._spotifyService.artistTopCities.push(...artistOverview.stats.topCities.items
      .map((item: any, index: number) => {
        let country = this._spotifyService.countries.find((c: any) => c.code === item.country);
        if(!country){
          country = { code: item.country };
          this._spotifyService.countries.push(country);
        }
        let city = this._spotifyService.cities.find((c: any) => c.name === item.city);
        if(!city){
          city = { name: item.city, region: item.region, country };
          this._spotifyService.cities.push(city);
        }
        return { city, index, listeners: item.numberOfListeners, artist: this._spotifyService.artists[0] };
      })
    );
  }

  private setExternalLinks(artistOverview: any){
    this._spotifyService.artistExternalLinks.slice(0, this._spotifyService.artistExternalLinks.length);
    this._spotifyService.artistExternalLinks.push(...artistOverview.profile.externalLinks.items
      .map((link: any) => ({
        artist: this._spotifyService.artists[0],
        name: link.name,
        url: link.url
      }))
    );
  }

  private setArtistGallery(artistOverview: any){
    this._spotifyService.artistImages.slice(0, this._spotifyService.artistImages.length);
    this._spotifyService.artistImages.push(...artistOverview.visuals.gallery.items
      .map((item: any) => ({
        artist: this._spotifyService.artists[0],
        image: item.sources.reduce((acc: any, item: any) => acc && acc.width > item.width ? acc : item, null)?.url ?? '',
      }))
    );
  }

  private setRelatedArtists(json: any){
    this._spotifyService.relatedArtists.slice(0, this._spotifyService.relatedArtists.length);
    this._spotifyService.relatedArtists.push(...json.log.entries
      .filter((entry: any) => entry.request.url.includes('queryArtistRelated') && entry.response.content.text)
      .map((entry: any) => JSON.parse(entry.response.content.text))
      .map((content: any) => content.data.artistUnion.relatedContent.relatedArtists.items)[0]
      .map((artist: any, index: number) => {
        let targetArtist = {
          id: artist.id,
          name: artist.profile.name,
          avatarImage: artist.visuals.avatarImage.sources.reduce((acc: any, item: any) => acc && acc.width > item.width ? acc : item, null)?.url ?? '',
        };
        this._spotifyService.artists.push(targetArtist);
        return { originArtist: this._spotifyService.artists[0], targetArtist, index };
      })
    );
  }

  private setFullReleases(json: any){
    this._spotifyService.releases.slice(0, this._spotifyService.releases.length);
    this._spotifyService.releases.push(...json.log.entries
      .filter((entry: any) => entry.request.url.includes('queryArtistDiscographyAll') && entry.response.content.text)
      .map((entry: any) => JSON.parse(entry.response.content.text))
      .reduce((releases: any[], group: any) => {
        releases.push(...group.data.artistUnion.discography.all.items);
        return releases;
      }, [])
      .reduce((releases: any[], release: any) => {
        releases.push(...release.releases.items);
        return releases;
      }, [])
      .map((release: any) => ({
        id: release.id,
        name: release.name,
        normalicedName: this._releaseService.normalizeRelease(release.name),
        type: release.type,
        coverArt: release.coverArt.sources.reduce((acc: any, item: any) => acc && acc.width > item.width ? acc : item, null)?.url ?? '',
        totalTracks: release.tracks.totalCount,
        year: release.date.year,
        month: release.date.precision === 'DAY' ? new Date(release.date.isoString).getMonth()+1 : 1,
        day: release.date.precision === 'DAY' ? new Date(release.date.isoString).getDate() : 1,
        artist: this._spotifyService.artists[0],
        timeIndex: 1,
        shareId: release.sharingInfo.shareId ?? undefined,
        lastUpload: new Date(),
        tracks: [],
        parentRelease: undefined,
      }))
      .map((release: Release) => {
        if(release.month === 1 && release.day === 1){
          release.month = 0;
          release.day = 0;
        }
        return release;
      })
    );
  }

  private setFullTracks(json: any){
    this._spotifyService.tracks.slice(0, this._spotifyService.tracks.length);
    this._spotifyService.tracks.push(...json.log.entries
      .filter((entry: any) => entry.request.url.includes('queryAlbumTracks') && entry.response.content.text)
      .map((entry: any) => ({ 
        releaseId: entry.request.url.substring(entry.request.url.indexOf('album%3A')+8, entry.request.url.indexOf('%22%2C%22offset')), 
        content: JSON.parse(entry.response.content.text) 
      }))
      .reduce((tracks: any[], group: any) => { 
        tracks.push(...group.content.data.albumUnion.tracksV2.items.map((item: any) => ({ ...item.track, release: group.releaseId })) );
        return tracks;
      }, [])
      .map((track: any) => ({
        id: track.uri.replace('spotify:track:',''),
        name: track.name,
        normalicedName: this._trackService.normalizeTrack(track.name),
        release: this._spotifyService.releases.find(release => release.id === track.release) ?? undefined,
        playcount: parseInt(track.playcount),
        length: track.duration.totalMilliseconds,
        trackNumber: track.trackNumber,
        discNumber: track.discNumber,
        playcountTrack: undefined,
        parentTrack: undefined,
        originalTrack: undefined,
        maxPlaycountTrack: undefined,
        lastUpload: new Date(),
        artists: track.artists.items.map((artist: any) => {
          let id = artist.uri.replace('spotify:artist:', '');
          let foundArtist = this._spotifyService.artists.find((a: Artist) => a.id === id);
          return foundArtist || { id, name: artist.profile.name };
        }),
      }))
      .map((track: Track) => {
        track.artists?.map((artist: Artist) => this._spotifyService.trackArtists.push({ track, artist }));
        !track.release.tracks?.some((t: Track) => t.id === track.id) && track.release.tracks?.push(track);
        return track;
      })
    );
  }

  private convertRgbToHex(base: { alpha: number, blue: number, green: number, red: number }): string {
    return `${((1 << 24) | (base.red << 16) | (base.green << 8) | base.blue).toString(16).slice(1).toUpperCase()}`;
  }
}
