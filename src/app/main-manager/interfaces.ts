import { ReleaseType } from "./types"

export interface Country {
  code: string, 
  name?: string
}

export interface City {
  name: string,
  country: Country,
  region: string
}

export interface Artist {
  id: string,
  name: string,
  avatarImage?: string,
  monthlyListeners?: number,
  followers?: number,
  shareId?: string,
  headerImage?: string,
  description?: string,
  backBaseColor?: string,
  hasFullProfile?: boolean,
  verified?: boolean,
  onList?: boolean,
  lastUpload?: Date,
}

export interface ArtistTopCity {
  city: City,
  listeners: number,
  index: number
  artist?: Artist,
}

export interface ArtistExternalLink {
  artist: Artist,
  name: 'FACEBOOK'|'INSTAGRAM'|'TWITTER'|'WIKIPEDIA',
  url: string
}

export interface ArtistImage {
  artist: Artist,
  image: string
}

export interface RelatedArtist {
  originArtist: Artist,
  targetArtist: Artist,
  index: number
}

export interface Release {
  id: string,
  name: string,
  normalicedName: string,
  type: ReleaseType,
  coverArt: string,
  totalTracks: number,
  year: number,
  artist: Artist
  month?: number,
  day?: number,
  timeIndex?: number,
  parentRelease?: Release,
  shareId?: string,
  lastUpload?: Date,
  tracks?: Track[],
  _children?: Release[]
}

export interface Track {
  id: string,
  name: string,
  normalicedName: string,
  release: Release,
  playcount: number,
  length: number,
  trackNumber: number,
  discNumber?: number,
  playcountTrack?: Track,
  parentTrack?: Track,
  originalTrack?: Track,
  maxPlaycountTrack?: Track,
  lastUpload?: Date,
  _children?: Track[]
  artists?: Artist[]
}

export interface TrackArtist {
  track: Track,
  artist: Artist
}

export interface SpotifyObjects {
  countries: Country[],
  cities: City[],
  artists: Artist[],
  artistTopCities: ArtistTopCity[],
  artistExternalLinks: ArtistExternalLink[],
  artistImages: ArtistImage[],
  relatedArtists: RelatedArtist[],
  releases: Release[],
  tracks: Track[],
  trackArtists: TrackArtist[]
}