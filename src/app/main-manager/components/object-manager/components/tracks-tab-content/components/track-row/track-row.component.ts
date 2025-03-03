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
  public types: ReleaseType[] = ['ALBUM', 'SINGLE', 'EP', 'COMPILATION'];
  public tracks!: Track[];
      
  constructor(private _spotifyService: SpotifyObjectsService) { }

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
    if(query?.length === 0) return [];
    return this.tracks.filter((t: Track) => t.id !== this.track.id && !this.track._children?.includes(t) && t.name.toLowerCase().includes(query.toLowerCase()));
  }

  unmatch(){
    let childTrackIndex: number | undefined = this.track.parentTrack?._children?.findIndex((r: Track) => r === this.track);
    if(childTrackIndex !== undefined && childTrackIndex >= 0){
      // Remove track from parent-children and remove track's parent-track
      this.track.parentTrack!._children!.splice(childTrackIndex,1);
      // If unmatched track was playcount-track and there's child tracks left
      if(this.track.playcountTrack === undefined && this.track.parentTrack?._children?.length){
        const samePlaycountTracks = this.track.parentTrack!._children!.filter((t: Track) => t.playcount === this.track.playcount);
        // Re-assign playcount-track
        samePlaycountTracks.length > 0 && samePlaycountTracks.forEach((t: Track, i: number) => {
          t.playcountTrack = i === 0 ? undefined : samePlaycountTracks[0];
        });
      }
      // If unmatched track was the max-playcount-track resets max-playcount-track
      if(!this.track.maxPlaycountTrack && this.track.parentTrack?._children?.length){
        this.setMaxPlaycountTrack([...this.track.parentTrack._children]);
      } else if(!this.track.parentTrack!._children?.length) {
        this.track.parentTrack!.maxPlaycountTrack = undefined;
      }
      // If unmatched track was the original-track resets original-track
      if(!this.track.originalTrack && this.track.parentTrack?._children?.length){
        this.setOriginalTrack([...this.track.parentTrack._children]);
      } else if(!this.track.parentTrack!._children?.length) {
        this.track.parentTrack!.originalTrack = undefined;
      }
      //Remove parent-track, playcount-track, max-playcount-track and original-Track from unmatched track
      this.track.parentTrack = undefined;
      this.track.playcountTrack = undefined;
      this.track.maxPlaycountTrack = undefined;
      this.track.originalTrack = undefined;
    } else throw Error('childTrackIndex was not found');
  }

  match(){
    this.matchedTrack.emit(this.track);
  }

  onMatchedTrack(trackMatch: Track){
    // Add Child-Track to Upper-Track Children
    if(!this.track._children){ 
      this.track._children = [trackMatch];
    } else this.track._children.push(trackMatch);

    // Sort Upper-Track Children
    this.track._children.sort((a,b) =>
      b.playcount - a.playcount || 
      a.name.localeCompare(b.name) || 
      a.release.year - b.release.year
    );

    // Set Child-Track's playcount Track
    if(trackMatch.playcount === this.track.playcount){
      trackMatch.playcountTrack = this.track;
    } else {
      const samePlaycountTracks = this.track._children.filter((t: Track) => t.playcount === trackMatch.playcount);
      if(samePlaycountTracks[0]!.id === trackMatch.id){
        samePlaycountTracks.forEach((t: Track) => t.playcountTrack = trackMatch);
        trackMatch.playcountTrack = undefined;
      } else {
        trackMatch.playcountTrack = samePlaycountTracks[0];
      }
    }

    // Set Track's Max-Playcount-Track
    this.setMaxPlaycountTrack([this.track, ...this.track._children]);

    // Set Track's Original-Track
    this.setOriginalTrack([this.track, ...this.track._children]);

    // Set Child-Track's Parent-Track
    trackMatch.parentTrack = this.track;
  }

  setPlaycountTrack(){
    if(!this.track.playcountTrack) return; // Track remains as playcount track (with the same role)
    // If track is playcount child
    let playcountTracks = this.track.parentTrack?._children?.filter((t: Track) => t.playcount === this.track.playcount);
    playcountTracks?.forEach((t: Track) => t.playcountTrack = this.track);
    this.track.playcountTrack = undefined;
    this.track.parentTrack?._children && this.setMaxPlaycountTrack([this.track.parentTrack, ...this.track.parentTrack._children]);
  }

  setOriginalTrack(list: Track[]){
    let originalTrack = list.sort((a, b) => {
      let aDate = new Date(a.release.year ?? 0, (a.release.month ?? 1) - 1, a.release.day ?? 1).getTime() + (a.release.timeIndex ?? 0);
      let bDate = new Date(b.release.year ?? 0, (b.release.month ?? 1) - 1, b.release.day ?? 1).getTime() + (b.release.timeIndex ?? 0);
      return aDate - bDate;
    })[0];
    list.forEach((t: Track) => t.originalTrack = t.id !== originalTrack.id ? originalTrack : undefined);
  }

  setMaxPlaycountTrack(list: Track[]){
    let maxPlaycountTrack = list.filter((t: Track) => !t.playcountTrack).sort((a, b) => b.playcount - a.playcount)[0];
    list.forEach((t: Track) => t.maxPlaycountTrack = t.id !== maxPlaycountTrack.id ? maxPlaycountTrack : undefined);
  }
}
