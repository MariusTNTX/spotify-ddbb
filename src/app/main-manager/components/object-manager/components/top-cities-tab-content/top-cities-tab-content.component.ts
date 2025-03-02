import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { ArtistTopCity } from '../../../../interfaces';
import { SpotifyObjectsService } from '../../../../services/spotify-objects.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-top-cities-tab-content',
  templateUrl: './top-cities-tab-content.component.html',
  styleUrls: ['./top-cities-tab-content.component.css'],
  imports: [FormsModule, MatFormFieldModule, MatListModule, MatIconModule, MatInputModule, MatButtonModule]
})
export class TopCitiesTabContentComponent implements OnInit {

  public topCities!: ArtistTopCity[];
    
  constructor(private _spotifyService: SpotifyObjectsService) { }

  ngOnInit() {
    this.topCities = this._spotifyService.artistTopCities;
  }

  onUpCity(i: number){
    this.topCities[i].index--;
    this.topCities[i-1].index++;
    this.topCities = this.topCities.sort((a,b) => a.index - b.index);
  }

  onDownCity(i: number){
    this.topCities[i].index++;
    this.topCities[i+1].index--;
    this.topCities = this.topCities.sort((a,b) => a.index - b.index);
  }

}
