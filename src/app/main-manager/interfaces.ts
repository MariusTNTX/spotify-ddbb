export interface Country {
  code: string, 
  name?: string
}

export interface City {
  name: string,
  country: Country,
  region: string
}

export interface Band {
  id: string,
  name: string,
  avatarImage: string,
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

export interface BandTopCity {
  band: Band,
  city: City,
  listeners: number,
  index: number
}

export interface BandExternalLink {
  band: Band,
  name: 'FACEBOOK'|'INSTAGRAM'|'TWITTER'|'WIKIPEDIA',
  url: string
}

export interface BandImage {
  band: Band,
  image: string
}

export interface RelatedBand {
  originBand: Band,
  targetBand: Band,
  index: number
}

export interface Record {
  name: string
}

export interface Album {
  id: string,
  name: string,
  type: 'ALBUM'|'SINGLE'|'EP'|'COMPILATION',
  length: number,
  coverArt: string,
  totalTracks: number,
  year: number,
  month?: number,
  day?: number,
  parentAlbum?: Album,
  record?: Record,
  shareUrl?: string,
  lastUpload?: Date,

  bands?: Band[]
}

export interface BandAlbum {
  band: Band,
  album: Album
}

export interface Track {
  id: string,
  album: Album,
  name: string,
  playcount: number,
  length: number,
  trackNumber: number,
  discNumber?: number,
  playcountTrack?: Track,
  parentTrack?: Track,
  originalTrack?: Track,
  maxPlaycountTrack?: Track,
  isExplicit: boolean,
  lastUpload?: Date,

  bands?: Band[]
}

export interface TrackBand {
  track: Track,
  band: Band
}

export interface SpotifyObjects {
  countries: Country[],
  cities: City[],
  bands: Band[],
  bandTopCities: BandTopCity[],
  bandExternalLinks: BandExternalLink[],
  bandImages: BandImage[],
  relatedBands: RelatedBand[],
  records: Record[],
  albums: Album[],
  bandAlbums: BandAlbum[],
  tracks: Track[],
  trackBands: TrackBand[]
}