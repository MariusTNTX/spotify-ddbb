import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Band } from '../../../../interfaces';
import { SpotifyObjectsService } from '../../../../services/spotify-objects.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-band-tab-content',
  templateUrl: './band-tab-content.component.html',
  styleUrls: ['./band-tab-content.component.css'],
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, 
            MatCheckboxModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BandTabContentComponent implements OnInit {

  public bands!: Band[];

  constructor(private _spotifyService: SpotifyObjectsService) { }

  ngOnInit() {
    this.bands = this._spotifyService.bands;
  }

}
