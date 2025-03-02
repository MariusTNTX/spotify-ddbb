import { Component, OnInit } from '@angular/core';
import { RelatedArtist } from '../../../../interfaces';
import { SpotifyObjectsService } from '../../../../services/spotify-objects.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-related-artists-tab-content',
  templateUrl: './related-artists-tab-content.component.html',
  styleUrls: ['./related-artists-tab-content.component.css'],
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, MatIconModule]
})
export class RelatedArtistsTabContentComponent implements OnInit {

  public relatedArtists!: RelatedArtist[];
    
  constructor(private _spotifyService: SpotifyObjectsService) { }

  ngOnInit() {
    this.relatedArtists = this._spotifyService.relatedArtists;
  }

  onUpArtist(i: number){
    this.relatedArtists[i].index--;
    this.relatedArtists[i-1].index++;
    this.relatedArtists = this.relatedArtists.sort((a,b) => a.index - b.index);
  }

  onDownArtist(i: number){
    this.relatedArtists[i].index++;
    this.relatedArtists[i+1].index--;
    this.relatedArtists = this.relatedArtists.sort((a,b) => a.index - b.index);
  }

}
