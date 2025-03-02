import { Injectable } from '@angular/core';
import { Release, Artist, ArtistExternalLink, ArtistImage, ArtistTopCity, City, Country, RelatedArtist, SpotifyObjects, Track, TrackArtist } from '../interfaces';

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
    tracks: [],
    trackArtists: [],
  };

  constructor() { 
    const NIGHTWISH: Artist = {
      followers: 2325822,
      hasFullProfile: true,
      id: '2NPduAUeLVsfIauhRwuft1',
      monthlyListeners: 2697962,
      name: "Nightwish",
      verified: true,
      onList: true,
      avatarImage: 'https://i.scdn.co/image/ab6761610000e5ebf3284e60d4e43c9a7b52c08d',
      description: "Finland's Nightwish are an award-winning, best-selling symphonic metal artist fronted by <a href=\"spotify:artist:2ZNTJ9Bu9QMJwBboMSpQgJ\">Floor Jansen</a>, their third female vocalist. They're the most successful Finnish artist worldwide, selling more than nine million records and netting more than 60 gold and platinum awards, including five number one releases and 13 chart-topping singles. While they're hardly the first goth-influenced metallers with a woman up front -- <a href=\"spotify:artist:2kO6zjt4a1OIqxOERhliEX\">the Gathering</a> from the Netherlands, Italy's <a href=\"spotify:artist:4OAddazJM576euUnFSvXSL\">Lacuna Coil</a>, and Sweden's <a href=\"spotify:artist:5c8Cw62ZYj9XO6iDLRDEsi\">Therion</a> all preceded them -- their rich melodicism, dynamic textures, and theatrical approach to performance make them a unique musical entity with global appeal. By the time they issued their second release, 1998's Oceanborn, featuring the operatically trained vocalist Tarja Turunen, they had begun filling concert halls and small sports arenas across Europe. Once, released in 2004, put them at the peak of early commercial success, but Nightwish parted ways with Turunen after the tour. (She went on to have a successful solo career.) In 2007, <a href=\"spotify:artist:37561fPR6pVMtyLd3eOFys\">Anette Olzon</a> was chosen as her replacement, and her debut with the artist, Dark Passion Play, went multi-platinum and the subsequent tour lasted nearly two years. <a href=\"spotify:artist:37561fPR6pVMtyLd3eOFys\">Olzon</a> also sang on 2012's conceptual outing Imaginaerum before leaving Nightwish while on tour. Dutch soprano <a href=\"spotify:artist:2ZNTJ9Bu9QMJwBboMSpQgJ\">Floor Jansen</a> (<a href=\"spotify:artist:6ISyfZw4EVt16zhmH2lvxp\">After Forever</a>, <a href=\"spotify:artist:4LPznDHsWRPbEivBW6aYqv\">ReVamp</a>) was hired to complete the remaining dates and fit in so well with the group and fans that she was asked to join formally. Her first studio release was 2015's Endless Forms Most Beautiful. Nightwish issued their ninth studio outing, Human. :II: Nature., in 2020, followed by 2024's U.K. Rock and Metal chart-topping Yesterwynde. The most successful Finnish artist worldwide, they netted more than 60 gold and platinum awards, including seven number one studio releases and 13 chart-topping singles.\r\n\nNightwish was founded in 1996 by keyboardist <a href=\"spotify:artist:4rpsPzapLwm5LJPZmmWhFI\">Tuomas Holopainen</a>. Initially attempting to create acoustic music, he recruited trained opera vocalist Tarja Turunen, but soon added full metal artist instrumentation with guitarist Emppo Vuorinen, bassist Sami Vänskä, and drummer Jukka Nevalainen. Nightwish's demos landed them a contract with the Finnish label <a href=\"spotify:search:label%3A%22Spinefarm%22\">Spinefarm</a>, which released their debut release, Angels Fall First, in late 1997 (it appeared in the rest of Europe the following year). The follow-up, Oceanborn, appeared in late 1998 and made Nightwish a bona fide mainstream success in their homeland; the release reached the Finnish Top Five and spun off three Top Ten singles. \r\n\nNightwish toured Europe heavily, consolidating their success, and in 2000 recorded their third release, Wishmaster. Not only did it top the Finnish charts, but it also became the group's first release to be released in the U.S. (by <a href=\"spotify:search:label%3A%22Century+Media%22\">Century Media</a>, which reissued their previous releases in 2001 as well). Released in 2002, Century Child proved a massive hit in Finland and around Europe, but 2004's Once saw them go one step further and conquer Europe. Number one in Germany and number one in the European Top 100, Once's success was the product of a artist at the top of its game following years of hard work. Marco Hietala was now on bass, replacing Sami Vänskä, while in 2005 Swedish singer <a href=\"spotify:artist:37561fPR6pVMtyLd3eOFys\">Anette Olzon</a> replaced Tarja Turunen, who was fired for personal reasons. Dark Passion Play (2007) and the concept release Imaginaerum (2011) both featured <a href=\"spotify:artist:37561fPR6pVMtyLd3eOFys\">Olzon</a> before she and the artist parted ways in 2012, halfway through their world tour. \r\n\nOn short notice, ex-<a href=\"spotify:artist:6ISyfZw4EVt16zhmH2lvxp\">After Forever</a> frontwoman <a href=\"spotify:artist:2ZNTJ9Bu9QMJwBboMSpQgJ\">Floor Jansen</a> stepped in to take over lead vocal duties; the immense pressures on her were later revealed in the behind-the-scenes film Please Learn the Setlist in 48 Hours. <a href=\"spotify:artist:2ZNTJ9Bu9QMJwBboMSpQgJ\">Jansen</a>'s powerful voice was a perfect fit for Nightwish. She was embraced immediately by their passionate fans and was soon made a permanent member, alongside English piper <a href=\"spotify:artist:5GaTFqOouKCHf6AVwTdClk\">Troy Donockley</a>. Nightwish's first commercial release with <a href=\"spotify:artist:2ZNTJ9Bu9QMJwBboMSpQgJ\">Jansen</a> was 2013's live release Showtime, Storytime, which documented their triumphant show at that year's Wacken Open Air metal festival in front of an 85,000-strong crowd. Endless Forms Most Beautiful, the group's eighth studio release and first with <a href=\"spotify:artist:2ZNTJ9Bu9QMJwBboMSpQgJ\">Jansen</a> on board, followed in early 2015. The set placed on no less than ten different charts including the Top 200 (number 34) and hard rock charts (number two). It was supported by a lavish multimedia touring extravaganza over the following 18 months. Two concerts at Wembley Stadium (which featured an on-stage appearance from scientist Richard Dawkins) and Ratina Stadion in Finland were produced as a deluxe two-disc video package titled Vehicle of Spirit, issued in December 2016. A separate audio soundtrack was also released.\r\n\nThe artist took an extended break in preparation for activities to celebrate its 20th anniversary in 2018. <a href=\"spotify:artist:4rpsPzapLwm5LJPZmmWhFI\">Holopainen</a> formed the folk-influenced trio <a href=\"spotify:artist:75lPfGiZ6x0pFKz5oYfBXx\">Auri</a> with his wife, singer and violinist <a href=\"spotify:artist:7fsO7iJz8gv776THRffk0A\">Johanna Kurkela</a>, and <a href=\"spotify:artist:5GaTFqOouKCHf6AVwTdClk\">Donockley</a>. They released their eponymous debut in 2017. Nightwish's next release was Decades, a double-length collection compiled from eight studio releases and, as a bonus, including their very first demo. The release was released in March of 2018 and coincided with Nightwish's 20th anniversary world tour, which produced the live release Decades Live in Buenos Aires. In July of 2019, drummer Jukka Nevalainen stepped away as the artist's drummer and Kai Hahto was named his replacement. Nevalainen explained that he would continue taking care of artist-related business behind the scenes. \r\n\nNightwish issued their ninth studio outing, Human. :||: Nature., in 2020. A double-length recording, the first half contained nine unreleased songs, while side two offered the conceptual suite (divided into eight parts) entitled \"All the Works of Nature Which Adorn the World.\" Recorded between August and October of 2019 at four studios, it was mixed by Mikko Karmila and mastered by Mika Jussila at Finnvox Studio. 2021 brought a remastered and expanded edition of their most popular release, Once, featuring bonus instrumental, demo, and live tracks, and 2023 saw the first full physical audio release (on <a href=\"spotify:search:label%3A%22Svart%22\">Svart</a>) of their 2001 live release From Wishes to Eternity, originally released in a limited edition in Finland only and later on CD and DVD. Yesterwynde, the group's tenth studio release, arrived in September 2024, topping the U.K. Rock and Metal Releases chart. ~ Steve Huey, Rovi",
      headerImage: 'https://image-cdn-ak.spotifycdn.com/image/ab6761860000eab1e742a16b1862b5465106e542',
      backBaseColor: this.convertRgbToHex(88, 48, 40),
      shareId: '-Y1q1UtIQ_awABXynH0OnA'
    };
    
    this.DATA.artists.push(NIGHTWISH);

    this.DATA.artistExternalLinks.push(
      { artist: NIGHTWISH, name: "FACEBOOK", url: "https://facebook.com/nightwish" },
      { artist: NIGHTWISH, name: "INSTAGRAM", url: "https://instagram.com/nightwish" },
      { artist: NIGHTWISH, name: "TWITTER", url: "https://twitter.com/nightwishartist" },
      { artist: NIGHTWISH, name: "WIKIPEDIA", url: "https://en.wikipedia.org/wiki/Nightwish" }
    );

    const FI: Country = { code: 'FI' };
    const CZ: Country = { code: 'CZ' };
    const SE: Country = { code: 'SE' };
    const BR: Country = { code: 'BR' };

    this.DATA.countries.push(FI, CZ, SE, BR);

    const HELSINKI: City = { country: FI, name: 'Helsinki', region: '18' };
    const PRAGUE: City = { country: CZ, name: 'Prague', region: '10' };
    const STOCKHOLM: City = { country: SE, name: 'Stockholm', region: 'AB' };
    const SAO_PAULO: City = { country: BR, name: 'São Paulo', region: 'SP' };
    const TAMPERE: City = { country: FI, name: 'Tampere', region: '11' };

    this.DATA.cities.push(HELSINKI, PRAGUE, STOCKHOLM, SAO_PAULO, TAMPERE);

    this.DATA.artistTopCities.push(
      { artist: NIGHTWISH, city: HELSINKI, listeners: 132153, index: 0 },
      { artist: NIGHTWISH, city: PRAGUE, listeners: 55458, index: 1 },
      { artist: NIGHTWISH, city: STOCKHOLM, listeners: 51501, index: 2 },
      { artist: NIGHTWISH, city: SAO_PAULO, listeners: 45679, index: 3 },
      { artist: NIGHTWISH, city: TAMPERE, listeners: 43798, index: 4 }
    );

    this.DATA.artistImages.push(
      { artist: NIGHTWISH, image: "https://i.scdn.co/image/ab6761670000ecd4017e5ca634611a2be01ca3dd" },
      { artist: NIGHTWISH, image: "https://i.scdn.co/image/ab6761670000ecd439add831c27ff5122eb43fcf" },
      { artist: NIGHTWISH, image: "https://i.scdn.co/image/ab6761670000ecd4e4ce6f11439240b77a8cced1" },
      { artist: NIGHTWISH, image: "https://i.scdn.co/image/ab6761670000ecd475c2983c117c9fe0a41977e1" },
      { artist: NIGHTWISH, image: "https://i.scdn.co/image/ab6761670000ecd400618e381a1e5b576bd6ba89" },
      { artist: NIGHTWISH, image: "https://i.scdn.co/image/ab6761670000ecd4b6d6c35e0d6f6ed8eda12dd9" },
      { artist: NIGHTWISH, image: "https://i.scdn.co/image/ab6761670000ecd4824805482f307fad68689925" },
      { artist: NIGHTWISH, image: "https://i.scdn.co/image/ab6761670000ecd4fb9d40f8fb4812459dc013fc" },
      { artist: NIGHTWISH, image: "https://i.scdn.co/image/ab6761670000ecd4c800938f8c9c63b2fdffce7d" },
      { artist: NIGHTWISH, image: "https://i.scdn.co/image/ab6761670000ecd42832edaf7e706bc6e2460faf" },
      { artist: NIGHTWISH, image: "https://i.scdn.co/image/ab6761670000ecd4668ee13cd69df62387f01d6c" },
      { artist: NIGHTWISH, image: "https://i.scdn.co/image/ab6761670000ecd41e28cd9d1518b96fddcb21cc" },
      { artist: NIGHTWISH, image: "https://i.scdn.co/image/ab6761670000ecd4f51e88480073b32b7d883aeb" },
      { artist: NIGHTWISH, image: "https://i.scdn.co/image/ab6761670000ecd434e614ec8f901bce175843d6" },
      { artist: NIGHTWISH, image: "https://i.scdn.co/image/ab6761670000ecd4b5c763d520c064e970fc9665" },
      { artist: NIGHTWISH, image: "https://i.scdn.co/image/ab6761670000ecd4f0dbff1f954c8f216f2a9008" },
      { artist: NIGHTWISH, image: "https://i.scdn.co/image/ab6761670000ecd4ecb13520d2ffae79622d4cbd" },
      { artist: NIGHTWISH, image: "https://i.scdn.co/image/ab6761670000ecd4ba42689123fc9c423d3ae29b" },
    );

    this.DATA.relatedArtists.push(
      { index: 0, originArtist: NIGHTWISH, targetArtist: { id: '3hE8S8ohRErocpkY7uJW4a', name: "Within Temptation", avatarImage: "https://i.scdn.co/image/ab6761610000e5ebd7fd83f3a54ab822936034b6" } },
      { index: 1, originArtist: NIGHTWISH, targetArtist: { id: '5YeoQ1L71cXDMpSpqxOjfH', name: "Sonata Arctica", avatarImage: "https://i.scdn.co/image/ab6761610000e5eb3c36e8b69cb376bf869aedc2" } },
      { index: 2, originArtist: NIGHTWISH, targetArtist: { id: '5HA5aLY3jJV7eimXWkRBBp', name: "Epica", avatarImage: "https://i.scdn.co/image/ab6761610000e5ebcc23a0fa1fc8dd11c396c608" } },
      { index: 3, originArtist: NIGHTWISH, targetArtist: { id: '7k5jeohQCF20a8foBD9ize', name: "Battle Beast", avatarImage: "https://i.scdn.co/image/ab6761610000e5eb37463b08e518a0302168ddd3" } },
      { index: 4, originArtist: NIGHTWISH, targetArtist: { id: '1Ih0fEQQsy9EeAJbYEeQRa', name: "Avantasia", avatarImage: "https://i.scdn.co/image/ab6761610000e5eb28190c50d303fd27ed7c12ee" } },
      { index: 5, originArtist: NIGHTWISH, targetArtist: { id: '2KaW48xlLnXC2v8tvyhWsa', name: "Amaranthe", avatarImage: "https://i.scdn.co/image/ab6761610000e5eb293f7f4aebb31292f607bf3b" } },
      { index: 6, originArtist: NIGHTWISH, targetArtist: { id: '0rEuaTPLMhlViNCJrg3NEH', name: "Beast In Black", avatarImage: "https://i.scdn.co/image/ab6761610000e5eb7b60ba4ab40815357c713dc2" } },
    );

    const ONCE: Release = { 
        id: '2wM6svkNOCsYP8sr9gP2zc', name: "Once", type: 'ALBUM', totalTracks: 11, artist: NIGHTWISH,
        day: 7, month: 6, year: 2004, shareId: "iRVrB-RMTCCmepyFSs1jlw", 
        coverArt: "https://i.scdn.co/image/ab67616d0000b273c7190a75bf05ad902f52c7a2"
    };
    
    const DARK_PASSION_PLAY: Release = { 
      id: '23DKEup8CZAYeGdjtwnpEE', name: "Dark Passion Play", type: 'ALBUM', totalTracks: 26, artist: NIGHTWISH,
      day: 28, month: 9, year: 2007, shareId: "mxMWq6cSQcuJDSFxMu2RTg", 
      coverArt: "https://i.scdn.co/image/ab67616d0000b27383f074bfd3e213283dcdb561"
    };

    const AMARANTH_EP: Release = { 
        id: '4FCxtdavX8vImgq646VyW9', name: "Amaranth", type: 'EP', totalTracks: 6, artist: NIGHTWISH,
        day: 24, month: 8, year: 2007, shareId: "zJ4egBu3Qqu2Jsos4rYOQw", parentRelease: DARK_PASSION_PLAY,
        coverArt: "https://i.scdn.co/image/ab67616d0000b2733d8d6b25354d4cbda5cc66a8"
    };

    const AMARANTH_SINGLE: Release = { 
        id: '0LFpGSKl8YpGBj6t6UipEm', name: "Amaranth", type: 'SINGLE', totalTracks: 12, artist: NIGHTWISH,
        day: 1, month: 12, year: 2008, shareId: "v9vx1lV-R-We7GXA9JG6CA", parentRelease: DARK_PASSION_PLAY,
        coverArt: "https://i.scdn.co/image/ab67616d0000b2737e90d7f1752d7bd824c23b44"
    };

    DARK_PASSION_PLAY._children = [ AMARANTH_EP, AMARANTH_SINGLE ];

    const ENDLESS_FORMS: Release = { 
        id: '2FviQq6iUOb4FBrnySgWuh', name: "Endless Forms Most Beautiful", type: 'ALBUM', totalTracks: 11, artist: NIGHTWISH,
        day: 27, month: 3, year: 2015, shareId: 'PNFh4XrJQXqtJRoUVeJPbA', 
        coverArt: "https://i.scdn.co/image/ab67616d0000b273a38feeee5617ac9e646cb8f4" 
    };

    const ENDLESS_FORMS_DELUXE: Release = { 
        id: '1tVEWlyn2nsAke3Lp7HoZ0', name: "Endless Forms Most Beautiful (Deluxe Version)", type: 'ALBUM', totalTracks: 22, artist: NIGHTWISH,
        day: 27, month: 3, year: 2015, shareId: 'QORu3_7PSbGEt6rpXGOWlw', parentRelease: ENDLESS_FORMS,
        coverArt: "https://i.scdn.co/image/ab67616d0000b2738acec727a3aac0133137a041"
    };

    ENDLESS_FORMS._children = [ ENDLESS_FORMS_DELUXE ];

    this.DATA.releases.push(ONCE, AMARANTH_EP, DARK_PASSION_PLAY, AMARANTH_SINGLE, ENDLESS_FORMS, ENDLESS_FORMS_DELUXE);

  }

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

  get tracks(): Track[] {
    return this._DATA.tracks;
  }

  get trackArtists(): TrackArtist[] {
    return this._DATA.trackArtists;
  }

  convertRgbToHex(r: number, g: number, b: number): string {
    return `${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()}`;
  }

}
