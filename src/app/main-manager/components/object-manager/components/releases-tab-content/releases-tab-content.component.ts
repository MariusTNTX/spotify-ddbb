import { Component, OnInit } from '@angular/core';
import { Release, Artist } from '../../../../interfaces';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SpotifyObjectsService } from '../../../../services/spotify-objects.service';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ReleaseRowComponent } from './components/release-row/release-row.component';

type Column = 'NAME' | 'DATE' | 'PLAYS';
type View = 'FORM' | 'MATCH';

@Component({
  selector: 'app-releases-tab-content',
  templateUrl: './releases-tab-content.component.html',
  styleUrls: ['./releases-tab-content.component.css'],
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, 
    MatIconModule, MatSelectModule, MatButtonToggleModule, ReleaseRowComponent]
  })
  export class ReleasesTabContentComponent implements OnInit { /* TODO Suggestions */

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

  releaseMatchQuery(release: Release){
    if(this.query.length === 0) return true;
    if(release.name.toLowerCase().includes(this.query.toLowerCase())) return true;
    if(release._children?.some((r: Release) => r.name.toLowerCase().includes(this.query.toLowerCase()))) return true;
    return false;
  }

  onOrderChange(column: Column){
    this.orderStatus.isAscendent = column === this.orderStatus.column ? !this.orderStatus.isAscendent : true;
    this.orderStatus.column = column;
    switch(column){
      case 'NAME': this.sortReleasesByName(this.orderStatus.isAscendent); break;
      case 'DATE': this.sortReleasesByDate(this.orderStatus.isAscendent); break;
      /* case 'PLAYS': this.sortReleasesByPlaycount(this.orderStatus.isAscendent); break; */
      default: return;
    }
  }

  sortReleasesByName(isAscendent: boolean){
    this.releases = isAscendent 
      ? [...this.releases].sort((a, b) => a.name.localeCompare(b.name))
      : [...this.releases].sort((a, b) => b.name.localeCompare(a.name));
  }

  sortReleasesByDate(isAscendent: boolean){
    this.releases = [...this.releases].sort((a, b) => {
      let aDate = new Date(a.year ?? 0, (a.month ?? 1) - 1, a.day ?? 1).getTime();
      let bDate = new Date(b.year ?? 0, (b.month ?? 1) - 1, b.day ?? 1).getTime();
      return isAscendent ? aDate - bDate : bDate - aDate;
    });
  }

  /* sortReleasesByPlaycount(isAscendent: boolean){
    this.releases = isAscendent 
      ? [...this.releases].sort((a, b) => a.name.localeCompare(b.name))
      : [...this.releases].sort((a, b) => b.name.localeCompare(a.name));
  } */
}
