import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Track } from '../../../../../../interfaces';
import { SpotifyObjectsService } from '../../../../../../services/spotify-objects.service';
import { ReleaseType, View } from '../../../../../../types';
import { MatBadgeModule } from '@angular/material/badge';
import { TrackService } from '../../../../../../services/track.service';

@Component({
  selector: 'app-track-row',
  templateUrl: './track-row.component.html',
  styleUrls: ['./track-row.component.css'],
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatBadgeModule]
})
export class TrackRowComponent implements OnInit {

  @Input() track!: Track;
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

  @Output() matchedTrack = new EventEmitter<Track>()

  public query!: string;
  public types: ReleaseType[] = ['ALBUM', 'SINGLE', 'EP', 'COMPILATION', 'LIVE'];
  public tracks!: Track[];
      
  constructor(
    private _spotifyService: SpotifyObjectsService,
    private _trackService: TrackService,
  ) { }

  ngOnInit() {
    this.tracks = this._spotifyService.tracks;
    this.query = this.track.name;
  }
  
  get playcountTrackIsEven(): boolean { // Track playcount is even (Par)
    let uniquePlaycounts = this.track.parentTrack?._children?.reduce((list: number[], track: Track) => {
      !list.includes(track.playcount) && list.push(track.playcount);
      return list;
    }, []);
    let playcountIndex = uniquePlaycounts?.findIndex((count: number) => count === this.track.playcount);
    return playcountIndex! >= 0 ? !(playcountIndex! % 2) : false;
  }

  get playsetIsDisabled(): boolean { // Show if plays differs from parent plays and there's another track with the same plays
    return  this.track.playcount === this.track.parentTrack?.playcount ||
            !this.track.parentTrack?._children?.some((t: Track) => t.playcount === this.track.playcount && t.id !== this.track.id);
  }

  subQueryMatchTracks(query: string): Track[] { // Show Tracks by query (hide the same track and child tracks)
    return this._trackService.filterFromTrack(this.track, query);
  }

  unmatch(){
    this._trackService.unmatch(this.track);
  }

  match(){
    this.matchedTrack.emit(this.track);
  }

  onMatchedTrack(childTrack: Track){
    this._trackService.match(this.track, childTrack);
  }

  setPlaycountTrack(){
    this._trackService.setPlaycountTrack(this.track);
  }
}
