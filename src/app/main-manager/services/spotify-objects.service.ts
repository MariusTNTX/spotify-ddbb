import { Injectable } from '@angular/core';
import { Release, Artist, ArtistExternalLink, ArtistImage, ArtistTopCity, City, Country, RelatedArtist, SpotifyObjects, Track, TrackArtist, ReleaseImage } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class SpotifyObjectsService {

  private _DATA: SpotifyObjects = {
    countries: [],
    cities: [],
    artists: [],
    artistTopCities: [],
    artistExternalLinks: [],
    artistImages: [],
    relatedArtists: [],
    releases: [],
    releaseImages: [],
    tracks: [],
    trackArtists: [],
  };

  constructor() { }

  get DATA(): SpotifyObjects {
    return this._DATA;
  }

  get countries(): Country[] {
    return this._DATA.countries;
  }

  get cities(): City[] {
    return this._DATA.cities;
  }

  get artists(): Artist[] {
    return this._DATA.artists;
  }

  get artistTopCities(): ArtistTopCity[] {
    return this._DATA.artistTopCities;
  }

  get artistExternalLinks(): ArtistExternalLink[] {
    return this._DATA.artistExternalLinks;
  }

  get artistImages(): ArtistImage[] {
    return this._DATA.artistImages;
  }

  get relatedArtists(): RelatedArtist[] {
    return this._DATA.relatedArtists;
  }

  get releases(): Release[] {
    return this._DATA.releases;
  }

  get releaseImages(): ReleaseImage[] {
    return this._DATA.releaseImages;
  }

  get tracks(): Track[] {
    return this._DATA.tracks;
  }

  get trackArtists(): TrackArtist[] {
    return this._DATA.trackArtists;
  }

}
