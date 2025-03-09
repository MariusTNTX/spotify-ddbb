import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Artist } from '../../../../interfaces';
import { SpotifyObjectsService } from '../../../../services/spotify-objects.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-artist-tab-content',
  templateUrl: './artist-tab-content.component.html',
  styleUrls: ['./artist-tab-content.component.css'],
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, 
            MatCheckboxModule, MatIconModule]
})
export class ArtistTabContentComponent implements OnInit {

  public artists!: Artist[];

  constructor(private _spotifyService: SpotifyObjectsService) { }

  get avatarImage(){
    return this.artists?.[0]?.avatarImages?.[0]?.url || '';
  }

  get headerImage(){
    return this.artists?.[0]?.headerImages?.[0]?.url || '';
  }

  onAvatarImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if(this.artists?.[0]?.avatarImages?.[0]?.url) {
      this.artists[0].avatarImages[0].url = input.value;
    }
  }

  onHeaderImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if(this.artists?.[0]?.headerImages?.[0]?.url) {
      this.artists[0].headerImages[0].url = input.value;
    }
  }

  ngOnInit() {
    this.artists = this._spotifyService.artists;
  }

}
