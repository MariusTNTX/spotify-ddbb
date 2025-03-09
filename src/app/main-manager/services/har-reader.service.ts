import { Injectable } from '@angular/core';
import { SpotifyObjectsService } from './spotify-objects.service';
import { Artist, ArtistImage, Release, ReleaseImage, Track } from '../interfaces';
import { ReleaseType } from '../types';
import { ReleaseService } from './release.service';
import { TrackService } from './track.service';
import { ORDERED_TYPES } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class HarReaderService {

  constructor(
    private _spotifyService: SpotifyObjectsService,
    private _releaseService: ReleaseService,
    private _trackService: TrackService,
  ) { }

  public setFullBandInfo(spotifyJSON: any, spiritJSON: any){

    /* FULL PROFILE */
    const artistOverview = this.getArtistOverview(spotifyJSON);
    this.setMainArtist(artistOverview);
    this.setArtistImages(artistOverview);
    this.setTopCities(artistOverview);
    this.setExternalLinks(artistOverview);

    /* RELATED ARTISTS */
    this.setRelatedArtists(spotifyJSON);

    /* FULL RELEASES */
    this.setFullReleases(spotifyJSON);

    /* FULL TRACKS */
    this.setFullTracks(spotifyJSON);

    /* ADDITIONAL ARTIST INFO */
    this.setAdditionalArtistInfo(spiritJSON);

    /* ADDITIONAL RELEASE INFO */
    this.setAdditionalReleaseInfo(spiritJSON);
    
    /* RELEASE DEPURATION */
    this._releaseService.depurateReleases();
    
    /* TRACK DEPURATION */
    this._trackService.depurateTracks();

    console.log(this._spotifyService.DATA);
  }

  private getArtistOverview(spotifyJSON: any){
    return spotifyJSON.log.entries
      .filter((entry: any) => entry.request.url.includes('queryArtistOverview') && entry.response.content.text)
      .map((entry: any) => JSON.parse(entry.response.content.text))
      .map((content: any) => content.data.artistUnion)
      [0];
  }

  private getArtistHTML(spiritJSON: any){
    return spiritJSON.log.entries.filter(
      (entry: any) => entry.request.url.startsWith('https://www.spirit-of-metal.com/en/band/') && entry.response.content.text
    )[0].response.content.text;
  }

  private setMainArtist(artistOverview: any){
    this._spotifyService.artists.slice(0, this._spotifyService.artists.length);
    this._spotifyService.artists.push({
      id: artistOverview.id,
      name: artistOverview.profile.name,
      monthlyListeners: artistOverview.stats.monthlyListeners,
      followers: artistOverview.stats.followers,
      shareId: artistOverview.sharingInfo.shareId,
      description: artistOverview.profile.biography.text ?? '',
      backBaseColor: this.convertRgbToHex(artistOverview.visualIdentity.wideFullBleedImage.extractedColorSet.highContrast.backgroundBase),
      hasFullProfile: true,
      verified: artistOverview.profile.verified,
      onList: true,
      lastUpload: new Date(),
    });
  }

  private setArtistImages(artistOverview: any){
    this._spotifyService.artistImages.slice(0, this._spotifyService.artistImages.length);
    this._spotifyService.artistImages.push(
      ...artistOverview.headerImage.data.sources.map((source: any, index: number) => ({
          artist: this._spotifyService.artists[0],
          url: source.url,
          type: 'HEADER',
          height: source.maxHeight,
          width: source.maxWidth,
          index
        })).sort((a: ArtistImage, b: ArtistImage) => (a.height * a.width) - (b.height * b.width)),
      ...artistOverview.visuals.avatarImage.sources.map((source: any, index: number) => ({
          artist: this._spotifyService.artists[0],
          url: source.url,
          type: 'AVATAR',
          height: source.height,
          width: source.width,
          index
        })).sort((a: ArtistImage, b: ArtistImage) => (a.height * a.width) - (b.height * b.width)),
      ...artistOverview.visuals.gallery.items.reduce((list: ArtistImage[], item: any) => {
        list.push(...item.sources.map((source: any, index: number) => ({
          artist: this._spotifyService.artists[0],
          url: source.url,
          type: 'GALLERY',
          height: source.height,
          width: source.width,
          index
        })).sort((a: ArtistImage, b: ArtistImage) => (a.height * a.width) - (b.height * b.width)));
        return list;
      }, []),
    );
    this._spotifyService.artists[0].headerImages = this._spotifyService.artistImages.filter((image: ArtistImage) => image.type === 'HEADER');
    this._spotifyService.artists[0].avatarImages = this._spotifyService.artistImages.filter((image: ArtistImage) => image.type === 'AVATAR');
    this._spotifyService.artists[0].gallery = this._spotifyService.artistImages.filter((image: ArtistImage) => image.type === 'GALLERY');
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

  private setRelatedArtists(spotifyJSON: any){
    this._spotifyService.relatedArtists.slice(0, this._spotifyService.relatedArtists.length);
    this._spotifyService.relatedArtists.push(...spotifyJSON.log.entries
      .filter((entry: any) => entry.request.url.includes('queryArtistRelated') && entry.response.content.text)
      .map((entry: any) => JSON.parse(entry.response.content.text))
      .map((content: any) => content.data.artistUnion.relatedContent.relatedArtists.items)[0]
      .map((artist: any, index: number) => {
        let targetArtist: Artist = {
          id: artist.id,
          name: artist.profile.name,
        };
        let avatarImages: ArtistImage[] = artist.visuals.avatarImage.sources.map((source: any, index: number) => ({
          artist: targetArtist,
          url: source.url,
          type: 'AVATAR',
          height: source.height,
          width: source.width,
          index
        })).sort((a: ArtistImage, b: ArtistImage) => (a.height * a.width) - (b.height * b.width));
        targetArtist.avatarImages = avatarImages;
        this._spotifyService.artistImages.push(...avatarImages);
        this._spotifyService.artists.push(targetArtist);
        return { originArtist: this._spotifyService.artists[0], targetArtist, index };
      })
    );
  }

  private setFullReleases(spotifyJSON: any){
    this._spotifyService.releases.slice(0, this._spotifyService.releases.length);
    this._spotifyService.releases.push(...spotifyJSON.log.entries
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
      .map((release: any) => {
        let finalRelease: Release = {
          id: release.id,
          name: release.name,
          normalicedName: this._releaseService.normalizeRelease(release.name),
          type: release.type,
          totalTracks: release.tracks.totalCount,
          date: new Date(
            release.date.year, 
            release.date.precision === 'DAY' ? new Date(release.date.isoString).getMonth() + 1 : 1,
            release.date.precision === 'DAY' ? new Date(release.date.isoString).getDate() : 1
          ),
          isPreciseDate: release.date.precision === 'DAY' && !(new Date(release.date.isoString).getMonth() === 0 && new Date(release.date.isoString).getDate() === 1),
          artist: this._spotifyService.artists[0],
          timeIndex: 1,
          shareId: release.sharingInfo.shareId ?? undefined,
          lastUpload: new Date(),
          tracks: [],
          parentRelease: undefined,
        };
        let releaseImages: ReleaseImage[] = release.coverArt.sources.map((source: any, index: number) => ({
          release: finalRelease,
          url: source.url,
          height: source.height,
          width: source.width,
          index
        })).sort((a: ReleaseImage, b: ReleaseImage) => (a.height * a.width) - (b.height * b.width));
        finalRelease.images = releaseImages;
        this._spotifyService.releaseImages.push(...releaseImages);
        return finalRelease;
      })
    );
  }

  private setFullTracks(spotifyJSON: any){
    this._spotifyService.tracks.slice(0, this._spotifyService.tracks.length);
    this._spotifyService.tracks.push(...spotifyJSON.log.entries
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

  private setAdditionalArtistInfo(spiritJSON: any){
    let htmlString: string = spiritJSON.log.entries.filter(
      (entry: any) => entry.request.url.startsWith('https://www.spirit-of-metal.com/en/band/') && entry.response.content.text
    )[0].response.content.text;
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

    let getTextByLabel = (label: string) => {
      const divs = Array.from(doc.querySelectorAll('#profile > div'));
      for (const div of divs) {
        const spans = div.querySelectorAll('span');
        if (spans[0]?.textContent?.trim() === label) {
          return spans[1]?.querySelector('a')?.textContent?.trim() || spans[1]?.textContent?.trim() || '';
        }
      }
      return '';
    }

    let mainArtist = this._spotifyService.artists[0];
    mainArtist.style = getTextByLabel('Style');
    mainArtist.formationYear = parseInt(getTextByLabel('Formed In')) || undefined;
    mainArtist.country = getTextByLabel('Country');
    mainArtist.city = getTextByLabel('City');
    mainArtist.popularity = doc.querySelectorAll('#profile div span i.fa-star').length || 1;
    mainArtist.fans = parseInt(getTextByLabel('Fans')) || 0;
  }

  private setAdditionalReleaseInfo(spiritJSON: any){
    let releaseEntries = spiritJSON.log.entries.filter((entry: any) => entry.request.url.startsWith('https://www.spirit-of-metal.com/ajax/getBandDiscoByType'));
    const parser = new DOMParser();
    const spiritReleases: any[] = releaseEntries
      .filter((entry: any, i: number) => releaseEntries.findIndex((e: any) => e.request.url === entry.request.url) === i)
      .map((entry: any) => entry.response.content.text)
      .map((htmlString: string) => {
        const doc = parser.parseFromString(htmlString, 'text/html');
        const htmlReleases: HTMLElement[] = Array.from(doc.querySelectorAll('a'));
        return htmlReleases.map((htmlRelease: HTMLElement) => ({
            name: htmlRelease.querySelector('h4')?.textContent || '',
            normalicedName: this._releaseService.normalizeRelease(htmlRelease.querySelector('h4')?.textContent || ''),
            year: parseInt(htmlRelease.querySelector('div[itemprop="datePublished"]')?.textContent || '0') || undefined,
            type: htmlRelease.querySelector('div[itemprop="datePublished"]')?.previousSibling?.textContent?.trim()?.replace(' -', '')?.toUpperCase()?.replace('ALBUM','FULL_LENGTH') || 'ALBUM',
          }));
        /* return htmlReleases.map((htmlRelease: HTMLElement) => {
          const releaseExtraInfo = {
            name: htmlRelease.querySelector('h4')?.textContent || '',
            normalicedName: this._releaseService.normalizeRelease(htmlRelease.querySelector('h4')?.textContent || ''),
            year: parseInt(htmlRelease.querySelector('div[itemprop="datePublished"]')?.textContent || '0') || undefined,
            type: htmlRelease.querySelector('div[itemprop="datePublished"]')?.previousSibling?.textContent?.trim()?.replace(' -', '')?.toUpperCase()?.replace('ALBUM','FULL_LENGTH') || 'ALBUM',
          };

          const editedRelease = [...this._spotifyService.releases]
            .filter((release: Release) => this._releaseService.matchedReleaseNames(release.normalicedName, releaseExtraInfo.normalicedName))
            .sort((a: Release, b: Release) => {
              // Date
              if(a.date.getFullYear() === releaseExtraInfo.year) return -1;
              if(b.date.getFullYear() === releaseExtraInfo.year) return 1;
              // Name Length
              if(a.name.length - b.name.length !== 0) return a.name.length - b.name.length;
              // Type Order
              let aTypeIndex = ORDERED_TYPES.findIndex((type: ReleaseType) => type === a.type);
              let bTypeIndex = ORDERED_TYPES.findIndex((type: ReleaseType) => type === b.type);
              if(aTypeIndex >= 0 && bTypeIndex >= 0 && aTypeIndex - bTypeIndex !== 0) return aTypeIndex - bTypeIndex;
              // Track Count
              if(a.tracks && b.tracks && a.tracks.length - b.tracks.length !== 0) return a.tracks.length - b.tracks.length;
              return 0;
            })[0];
            
          if(editedRelease && (editedRelease.type !== releaseExtraInfo.type || editedRelease.date.getFullYear() !== releaseExtraInfo.year)){
            let editedTypeIndex: number = ORDERED_TYPES.findIndex((type: ReleaseType) => type === editedRelease.type) || 0;
            let extraTypeIndex: number = ORDERED_TYPES.findIndex((type: ReleaseType) => type === releaseExtraInfo.type) || 0;
            if(extraTypeIndex < editedTypeIndex){
              editedRelease.type = releaseExtraInfo.type as ReleaseType;
            }
            if(releaseExtraInfo.year && editedRelease.date.getFullYear() !== releaseExtraInfo.year){
              editedRelease.date.setTime(new Date(releaseExtraInfo.year, 0, 1).getTime());
              editedRelease.isPreciseDate = false;
            }
            console.log(editedRelease);
          }
        }) */
      });
    [...this._spotifyService.releases] // TODO Corregir releases de spotify con los de spirit 
      .sort((a: Release, b: Release) => {
        // Type Order
        let aTypeIndex = ORDERED_TYPES.findIndex((type: ReleaseType) => type === a.type);
        let bTypeIndex = ORDERED_TYPES.findIndex((type: ReleaseType) => type === b.type);
        if(aTypeIndex >= 0 && bTypeIndex >= 0 && aTypeIndex - bTypeIndex !== 0) return aTypeIndex - bTypeIndex;
        // Matched Name
        if(!this._releaseService.matchedReleaseNames(a, b)) return a.normalicedName.localeCompare(b.normalicedName);
        // Name Length
        if(a.name.length - b.name.length !== 0) return a.name.length - b.name.length;
        // Date
        let aTime = a.date.getTime();
        let bTime = b.date.getTime();
        if(aTime - bTime !== 0) return aTime - bTime;
        // Track Count
        if(a.tracks && b.tracks && a.tracks.length - b.tracks.length !== 0) return a.tracks.length - b.tracks.length;
        return 1;
      });
  }

  private convertRgbToHex(base: { alpha: number, blue: number, green: number, red: number }): string {
    return `${((1 << 24) | (base.red << 16) | (base.green << 8) | base.blue).toString(16).slice(1).toUpperCase()}`;
  }
}
