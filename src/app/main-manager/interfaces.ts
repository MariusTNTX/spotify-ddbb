import { ExternalLinkName, ImageType, ReleaseType } from "./types"

export interface Country {
  code: string, 
  name?: string
}

export interface City {
  name: string,
  country: Country,
  region?: string
}

export interface Artist {
  id: string,
  name: string,
  style?: string,
  formationYear?: number,
  country?: string,
  city?: string,
  popularity?: number,
  fans?: number,
  avatarImages?: ArtistImage[],
  headerImages?: ArtistImage[],
  gallery?: ArtistImage[],
  monthlyListeners?: number,
  followers?: number,
  shareId?: string,
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
  name: ExternalLinkName,
  url: string
}

export interface ArtistImage {
  artist: Artist,
  url: string,
  type: ImageType,
  height: number,
  width: number,
  index?: number,
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
  totalTracks: number,
  artist: Artist,
  date: Date,
  isPreciseDate: boolean,
  images?: ReleaseImage[],
  timeIndex?: number,
  parentRelease?: Release,
  shareId?: string,
  lastUpload?: Date,
  tracks?: Track[],
  _children?: Release[]
}

export interface ReleaseImage {
  release: Release,
  url: string,
  height: number,
  width: number,
  index?: number,
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
  releaseImages: ReleaseImage[],
  tracks: Track[],
  trackArtists: TrackArtist[]
}