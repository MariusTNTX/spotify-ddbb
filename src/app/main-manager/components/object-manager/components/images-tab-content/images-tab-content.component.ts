import { Component, OnInit } from '@angular/core';
import { SpotifyObjectsService } from '../../../../services/spotify-objects.service';
import { ArtistImage } from '../../../../interfaces';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-images-tab-content',
  templateUrl: './images-tab-content.component.html',
  styleUrls: ['./images-tab-content.component.css'],
  imports: [FormsModule, MatFormFieldModule, MatInputModule]
})
export class ImagesTabContentComponent implements OnInit {

  public images!: ArtistImage[];
      
  constructor(private _spotifyService: SpotifyObjectsService) { }

  ngOnInit() {
    this.images = this._spotifyService.artistImages;
  }

}
