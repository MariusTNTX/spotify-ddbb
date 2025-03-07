import { Injectable } from '@angular/core';
import { SpotifyObjectsService } from './spotify-objects.service';
import { Artist, Release } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class HarReaderService {

  constructor(private _spotifyService: SpotifyObjectsService) { }

  public setFullBandInfo(json: any){
    /* FULL PROFILE */
    const artistOverview = this.getArtistOverview(json);
    this.setMainArtist(artistOverview);
    this.setTopCities(artistOverview);
    this.setExternalLinks(artistOverview);

    /* RELATED ARTISTS */
    this.setRelatedArtists(json);

    /* FULL RELEASES */
    this.setFullReleases(json);

    /* FULL TRACKS */
    this.setFullTracks(json);
    
    /* TOP TRACKS */
    /* this.groupTracks(); */

    console.log(this._spotifyService.DATA);
    

    /* console.clear();
    console.log('TOP TRACKS: ', topTracks);
    console.log('FULL TRACKS: ', albumTracksEntries);
    console.log('FULL RELEASES: ', artistDiscographyAllEntries); */
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
      avatarImage: artistOverview.visuals.avatarImage.sources[0].url ?? '',
      monthlyListeners: artistOverview.stats.monthlyListeners,
      followers: artistOverview.stats.followers,
      shareId: artistOverview.sharingInf.shareId,
      headerImage: artistOverview.headerImage.data.sources.reduce((acc: any, item: any) => acc && acc.maxWidth > item.maxWidth ? acc : item, null),
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

  private setArtistGallery(artistOverview: any){ /* TODO */
    /* this._spotifyService.artistExternalLinks.slice(0, this._spotifyService.artistExternalLinks.length);
    this._spotifyService.artistExternalLinks.push(...artistOverview.profile.externalLinks.items
      .map((link: any) => ({
        artist: this._spotifyService.artists[0],
        name: link.name,
        url: link.url
      }))
    ); */
  }

  private setRelatedArtists(json: any){
    this._spotifyService.artists.push(...json.log.entries
      .filter((entry: any) => entry.request.url.includes('queryArtistRelated') && entry.response.content.text)
      .map((entry: any) => JSON.parse(entry.response.content.text))
      /* .reduce((releases: any[], group: any) => {
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
        type: release.type,
        coverArt: release.coverArt.sources[release.coverArt.sources.length-1].url ?? '',
        totalTracks: release.tracks.totalCount,
        year: release.date.year,
        month: release.date.precision === 'DAY' ? new Date(release.date.isoString).getMonth()+1 : undefined,
        day: release.date.precision === 'DAY' ? new Date(release.date.isoString).getDate() : undefined,
        artist: 'TODO GetArtistFullInfo()',
        timeIndex: 1,
        shareId: release.sharingInfo.shareId ?? undefined,
        lastUpload: new Date(),
        tracks: [],
        _children: [],
        parentRelease: undefined,
      })) */
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
        type: release.type,
        coverArt: release.coverArt.sources[release.coverArt.sources.length-1].url ?? '',
        totalTracks: release.tracks.totalCount,
        year: release.date.year,
        month: release.date.precision === 'DAY' ? new Date(release.date.isoString).getMonth()+1 : undefined,
        day: release.date.precision === 'DAY' ? new Date(release.date.isoString).getDate() : undefined,
        artist: 'TODO GetArtistFullInfo()',
        timeIndex: 1,
        shareId: release.sharingInfo.shareId ?? undefined,
        lastUpload: new Date(),
        tracks: [],
        _children: [],
        parentRelease: undefined,
      }))
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
        artists: track.artists.items.map((artist: any) => ({ 
          id: artist.uri.replace('spotify:artist:', ''), 
          name: artist.profile.name 
        })),
        _children: [],
      }))
      .map((track: any) => {
        // TODO Reemplazar ID de artistas por objeto de artista conocido
        !track.release.tracks.some((t: any) => t.uri === track.uri) && track.release.tracks.push(track);
        return track;
      })
    );
  }

  /* private groupTracks(){
    topTracks = albumTracksEntries
      .sort((a, b) => parseInt(b.playcount)-parseInt(a.playcount))
      .reduce((groups, track) => {
        if(groups[groups.length-1] && groups[groups.length-1].some(t => {
          return t.playcount === track.playcount && realNameOf(t.name).includes(realNameOf(track.name)) || realNameOf(track.name).includes(realNameOf(t.name))
        })){
          groups[groups.length-1].push(track);
        } else groups.push([track]);
        return groups;
      }, [])
      .map(trackGroup => {
        if(trackGroup.some(t => t.release.type === 'ALBUM')){
          trackGroup = trackGroup.filter(t => t.release.type === 'ALBUM');
        }
        return trackGroup.reduce((res, t) => {
          if(!res.name || t.name.length < res.name.length || 
            (t.name.length === res.name.length && t.release.date.year < res.release.date.year)){
            return t;
          }
          return res;
        }, {});
      })
  } */

  private convertRgbToHex(base: { alpha: number, blue: number, green: number, red: number }): string {
    return `${((1 << 24) | (base.red << 16) | (base.green << 8) | base.blue).toString(16).slice(1).toUpperCase()}`;
  }

}
