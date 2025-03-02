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

export interface ArtistTopCity {
  artist: Artist,
  city: City,
  listeners: number,
  index: number
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
  type: 'ALBUM'|'SINGLE'|'EP'|'COMPILATION',
  coverArt: string,
  totalTracks: number,
  year: number,
  artist: Artist
  month?: number,
  day?: number,
  parentRelease?: Release,
  shareId?: string,
  lastUpload?: Date,
  _children?: Release[],
  _suggestions?: Release[],
}

export interface Track {
  id: string,
  release: Release,
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