import { Component, EventEmitter, Input, OnInit, Output, OutputEmitterRef, OutputRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Release, Artist, Track } from '../../../../../../interfaces';
import { SpotifyObjectsService } from '../../../../../../services/spotify-objects.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReleaseType, View } from '../../../../../../types';
import { ReleaseService } from '../../../../../../services/release.service';
import { TrackService } from '../../../../../../services/track.service';

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
  public types: ReleaseType[] = ['FULL_LENGTH', 'ALBUM', 'SINGLE', 'EP', 'COMPILATION', 'VIDEO', 'LIVE', 'DEMO', 'TRIBUTE', 'SPLIT', 'BOOTLEG'];
  public releases!: Release[];
      
  constructor(
    private _spotifyService: SpotifyObjectsService,
    private _releaseService: ReleaseService,
    private _trackService: TrackService,
  ) { }

  ngOnInit() {
    this.artists = this._spotifyService.artists;
    this.releases = this._spotifyService.releases;
    this.query = this.release.name;
  }

  get duplicatedDates(): boolean {
    return this._releaseService.hasDuplicates(this.release);
  }
  
  subQueryMatchReleases(query: string): Release[] {
    return this._releaseService.filterFromRelease(this.release, query);
  }

  unmatch(){
    this._releaseService.unmatch(this.release);
  }

  match(){
    this.matchedRelease.emit(this.release);
  }

  onMatchedRelease(childRelease: Release){
    this._releaseService.match(this.release, childRelease);
  }

  updateTrackOrder(){
    this.release.tracks?.map((track: Track) => {
      let parentTrack = track.parentTrack || track;
      let trackChildren = track.parentTrack ? track.parentTrack._children ?? [] : track._children ?? [];
      this._trackService.setOriginalTrack([ parentTrack, ...trackChildren ]);
    });
  }

  onDateChange(event: Event): void {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    const day: number = parseInt(input.value, 10) || 1;
    this.release.date.setDate(day);
  }

  onMonthChange(event: Event): void {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    const month: number = parseInt(input.value, 10) || 1;
    this.release.date.setMonth(month - 1);
  }

  onYearChange(event: Event): void {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    const year: number = parseInt(input.value, 10);
    year && this.release.date.setFullYear(year);
  }
}
