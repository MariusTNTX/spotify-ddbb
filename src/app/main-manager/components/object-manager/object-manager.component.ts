import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ArtistTabContentComponent } from "./components/artist-tab-content/artist-tab-content.component";
import { ImagesTabContentComponent } from "./components/images-tab-content/images-tab-content.component";
import { RelatedArtistsTabContentComponent } from "./components/related-artists-tab-content/related-artists-tab-content.component";
import { ReleasesTabContentComponent } from "./components/releases-tab-content/releases-tab-content.component";
import { TracksTabContentComponent } from "./components/tracks-tab-content/tracks-tab-content.component";
import { ExternalLinksTabContentComponent } from "./components/external-links-tab-content/external-links-tab-content.component";
import { TopCitiesTabContentComponent } from "./components/top-cities-tab-content/top-cities-tab-content.component";

@Component({
  selector: 'app-object-manager',
  templateUrl: './object-manager.component.html',
  styleUrls: ['./object-manager.component.css'],
  imports: [MatTabsModule, ArtistTabContentComponent, ImagesTabContentComponent, 
            RelatedArtistsTabContentComponent, ReleasesTabContentComponent, 
            TracksTabContentComponent, ExternalLinksTabContentComponent, 
            TopCitiesTabContentComponent]
})
export class ObjectManagerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }

}
