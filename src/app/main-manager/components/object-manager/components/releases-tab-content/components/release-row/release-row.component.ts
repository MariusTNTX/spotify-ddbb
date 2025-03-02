import { Component, EventEmitter, Input, OnInit, Output, OutputEmitterRef, OutputRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Release, Artist } from '../../../../../../interfaces';
import { SpotifyObjectsService } from '../../../../../../services/spotify-objects.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReleaseType, View } from '../../../../../../types';

@Component({
  selector: 'app-release-row',
  templateUrl: './release-row.component.html',
  styleUrls: ['./release-row.component.css'],
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule]
})
export class ReleaseRowComponent implements OnInit {

  @Input() release!: Release;
  @Input() isChild: boolean = false;
  @Input() isMatch: boolean = false;
  
  private _view!: View;
  @Input() set view(value: View) {
    if(value !== this._view) {
      this._view = value;
    }
  }
  get view(): View {
    return this._view;
  }

  @Output() matchedRelease = new EventEmitter<Release>()

  public query!: string;
  public artists!: Artist[];
  public types: ReleaseType[] = ['ALBUM', 'SINGLE', 'EP', 'COMPILATION'];
  public releases!: Release[];
      
  constructor(private _spotifyService: SpotifyObjectsService) { }

  ngOnInit() {
    this.artists = this._spotifyService.artists;
    this.releases = this._spotifyService.releases;
    this.releases.forEach((r: Release) => r.timeIndex = 1);
    this.query = this.release.name;
  }

  get duplicatedDates(): boolean {
    let currentReleaseDate = new Date(
      this.release.year ?? 0, 
      (this.release.month ?? 1) - 1, 
      this.release.day ?? 1
    ).getTime() + (this.release.timeIndex ?? 0);

    return this.releases.some((r: Release) => {
      let rDate = new Date(r.year ?? 0, (r.month ?? 1) - 1, r.day ?? 1).getTime() + (r.timeIndex ?? 0);
      return r.id !== this.release.id && currentReleaseDate === rDate;
    });
  }
  
  subQueryMatchReleases(query: string): Release[] {
    if(query?.length === 0) return [];
    return this.releases.filter((r: Release) => !r.parentRelease && !r._children && r.id !== this.release.id && r.name.toLowerCase().includes(query.toLowerCase()));
  }

  unmatch(){
    let childReleaseIndex: number | undefined = this.release.parentRelease?._children?.findIndex((r: Release) => r === this.release);
    if(childReleaseIndex !== undefined && childReleaseIndex >= 0){
      this.release.parentRelease!._children!.splice(childReleaseIndex,1);
      this.release.parentRelease = undefined;
    } else throw Error('childReleaseIndex was not found');
  }

  match(){
    this.matchedRelease.emit(this.release);
  }

  onMatchedRelease(releaseMatch: Release){
    this.release._children?.push(releaseMatch);
    releaseMatch.parentRelease = this.release;
  }
}
