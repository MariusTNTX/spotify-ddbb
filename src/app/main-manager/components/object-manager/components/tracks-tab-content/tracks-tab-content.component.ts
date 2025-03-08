import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatchHeaderComponent } from '../../shared/match-header/match-header.component';
import { Track } from '../../../../interfaces';
import { SpotifyObjectsService } from '../../../../services/spotify-objects.service';
import { View, Column } from '../../../../types';
import { TrackRowComponent } from './components/track-row/track-row.component';

@Component({
  selector: 'app-tracks-tab-content',
  templateUrl: './tracks-tab-content.component.html',
  styleUrls: ['./tracks-tab-content.component.css'],
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule,
            MatIconModule, MatSelectModule, MatchHeaderComponent, TrackRowComponent]
})
export class TracksTabContentComponent implements OnInit {

  public query: string = '';
  public view: View = 'FORM';
  public column: Column = 'DATE';
  public orderStatus: { isAscendent: boolean, column: Column } = { isAscendent: true, column: this.column };
  public tracks!: Track[];
      
  constructor(private _spotifyService: SpotifyObjectsService) { }

  ngOnInit() {
    this.tracks = this._spotifyService.tracks;
    this.sortTracksByDate(true);
  }

  trackMatchQuery(track: Track): boolean {
    if(this.query.length === 0) return true;
    if(track.name.toLowerCase().includes(this.query.toLowerCase())) return true;
    if(this.view === 'FORM' && track._children?.some((r: Track) => r.name.toLowerCase().includes(this.query.toLowerCase()))) return true;
    return false;
  }

  onOrderChange(column: Column): void {
    this.column = column;
    this.orderStatus.isAscendent = column === this.orderStatus.column ? !this.orderStatus.isAscendent : true;
    this.orderStatus.column = column;
    switch(column){
      case 'NAME': this.sortTracksByName(this.orderStatus.isAscendent); break;
      case 'DATE': this.sortTracksByDate(this.orderStatus.isAscendent); break;
      case 'PLAYS': this.sortTracksByPlaycount(this.orderStatus.isAscendent); break;
      default: return;
    }
  }

  sortTracksByName(isAscendent: boolean): void {
    this.tracks.sort((a, b) => 
      isAscendent ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
  }

  sortTracksByDate(isAscendent: boolean): void {
    this.tracks.sort((a, b) => {
      let aDate = new Date(a.release.year ?? 0, (a.release.month ?? 1) - 1, a.release.day ?? 1).getTime();
      let bDate = new Date(b.release.year ?? 0, (b.release.month ?? 1) - 1, b.release.day ?? 1).getTime();
      return isAscendent ? aDate - bDate : bDate - aDate;
    });
  }

  sortTracksByPlaycount(isAscendent: boolean): void {
    this.tracks.sort((a, b) => 
      isAscendent ? a.playcount - b.playcount : b.playcount - a.playcount
    );
  }

}
