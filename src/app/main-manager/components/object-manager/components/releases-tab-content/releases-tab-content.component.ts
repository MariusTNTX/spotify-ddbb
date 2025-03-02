import { Component, OnInit } from '@angular/core';
import { Release, Artist, Track } from '../../../../interfaces';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SpotifyObjectsService } from '../../../../services/spotify-objects.service';
import { MatSelectModule } from '@angular/material/select';
import { ReleaseRowComponent } from './components/release-row/release-row.component';
import { MatchHeaderComponent } from "../../shared/match-header/match-header.component";
import { View, Column } from '../../../../types';

@Component({
  selector: 'app-releases-tab-content',
  templateUrl: './releases-tab-content.component.html',
  styleUrls: ['./releases-tab-content.component.css'],
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule,
            MatIconModule, MatSelectModule, ReleaseRowComponent, MatchHeaderComponent]
  })
  export class ReleasesTabContentComponent implements OnInit {

  public query: string = '';
  public view: View = 'FORM';
  public column: Column = 'DATE';
  public orderStatus: { isAscendent: boolean, column: Column } = { isAscendent: true, column: this.column };
  public releases!: Release[];
      
  constructor(private _spotifyService: SpotifyObjectsService) { }

  ngOnInit() {
    this.releases = this._spotifyService.releases;
    this.sortReleasesByDate(true);
  }

  releaseMatchQuery(release: Release): boolean {
    if(this.query.length === 0) return true;
    if(release.name.toLowerCase().includes(this.query.toLowerCase())) return true;
    if(this.view === 'FORM' && release._children?.some((r: Release) => r.name.toLowerCase().includes(this.query.toLowerCase()))) return true;
    return false;
  }

  onOrderChange(column: Column): void {
    this.column = column;
    this.orderStatus.isAscendent = column === this.orderStatus.column ? !this.orderStatus.isAscendent : true;
    this.orderStatus.column = column;
    switch(column){
      case 'NAME': this.sortReleasesByName(this.orderStatus.isAscendent); break;
      case 'DATE': this.sortReleasesByDate(this.orderStatus.isAscendent); break;
      case 'PLAYS': this.sortReleasesByPlaycount(this.orderStatus.isAscendent); break;
      default: return;
    }
  }

  sortReleasesByName(isAscendent: boolean): void {
    this.releases = [...this.releases].sort((a, b) => 
      isAscendent ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
  }

  sortReleasesByDate(isAscendent: boolean): void {
    this.releases = [...this.releases].sort((a, b) => {
      let aDate = new Date(a.year ?? 0, (a.month ?? 1) - 1, a.day ?? 1).getTime();
      let bDate = new Date(b.year ?? 0, (b.month ?? 1) - 1, b.day ?? 1).getTime();
      if(aDate === bDate) return isAscendent ? a.timeIndex! - b.timeIndex! : b.timeIndex! - a.timeIndex!;
      return isAscendent ? aDate - bDate : bDate - aDate;
    });
  }

  sortReleasesByPlaycount(isAscendent: boolean): void {
    this.releases = [...this.releases].sort((a, b) => {
      let aPlays = a.tracks?.reduce((plays: number, track: Track) => plays += track.playcount, 0) ?? 0;
      let bPlays = b.tracks?.reduce((plays: number, track: Track) => plays += track.playcount, 0) ?? 0;
      return isAscendent ? aPlays - bPlays : bPlays - aPlays;
    });
  }
}
