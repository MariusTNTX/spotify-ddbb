import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { BandTabContentComponent } from "./components/band-tab-content/band-tab-content.component";
import { ImagesTabContentComponent } from "./components/images-tab-content/images-tab-content.component";
import { RelatedBandsTabContentComponent } from "./components/related-bands-tab-content/related-bands-tab-content.component";
import { AlbumsTabContentComponent } from "./components/albums-tab-content/albums-tab-content.component";
import { TracksTabContentComponent } from "./components/tracks-tab-content/tracks-tab-content.component";
import { ExternalLinksTabContentComponent } from "./components/external-links-tab-content/external-links-tab-content.component";
import { TopCitiesTabContentComponent } from "./components/top-cities-tab-content/top-cities-tab-content.component";

@Component({
  selector: 'app-object-manager',
  templateUrl: './object-manager.component.html',
  styleUrls: ['./object-manager.component.css'],
  imports: [MatTabsModule, BandTabContentComponent, ImagesTabContentComponent, 
            RelatedBandsTabContentComponent, AlbumsTabContentComponent, 
            TracksTabContentComponent, ExternalLinksTabContentComponent, 
            TopCitiesTabContentComponent]
})
export class ObjectManagerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }

}
