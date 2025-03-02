import { Component, OnInit } from '@angular/core';
import { ArtistExternalLink } from '../../../../interfaces';
import { SpotifyObjectsService } from '../../../../services/spotify-objects.service';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-external-links-tab-content',
  templateUrl: './external-links-tab-content.component.html',
  styleUrls: ['./external-links-tab-content.component.css'],
  imports: [FormsModule, MatFormFieldModule, MatListModule, MatIconModule, MatInputModule]
})
export class ExternalLinksTabContentComponent implements OnInit {

  public externalLinks!: ArtistExternalLink[];
  
  constructor(private _spotifyService: SpotifyObjectsService) { }

  ngOnInit() {
    this.externalLinks = this._spotifyService.artistExternalLinks;
  }

}
