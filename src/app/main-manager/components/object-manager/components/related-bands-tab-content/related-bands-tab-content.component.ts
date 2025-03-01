import { Component, OnInit } from '@angular/core';
import { RelatedBand } from '../../../../interfaces';
import { SpotifyObjectsService } from '../../../../services/spotify-objects.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-related-bands-tab-content',
  templateUrl: './related-bands-tab-content.component.html',
  styleUrls: ['./related-bands-tab-content.component.css'],
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, MatIconModule]
})
export class RelatedBandsTabContentComponent implements OnInit {

  public relatedBands!: RelatedBand[];
    
  constructor(private _spotifyService: SpotifyObjectsService) { }

  ngOnInit() {
    this.relatedBands = this._spotifyService.relatedBands;
  }

  onUpBand(i: number){
    this.relatedBands[i].index--;
    this.relatedBands[i-1].index++;
    this.relatedBands = this.relatedBands.sort((a,b) => a.index - b.index);
  }

  onDownBand(i: number){
    this.relatedBands[i].index++;
    this.relatedBands[i+1].index--;
    this.relatedBands = this.relatedBands.sort((a,b) => a.index - b.index);
  }

}
