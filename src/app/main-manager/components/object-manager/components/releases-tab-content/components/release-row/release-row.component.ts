import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Release, Artist } from '../../../../../../interfaces';
import { SpotifyObjectsService } from '../../../../../../services/spotify-objects.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

type View = 'FORM' | 'MATCH';

@Component({
  selector: 'app-release-row',
  templateUrl: './release-row.component.html',
  styleUrls: ['./release-row.component.css'],
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule]
})
export class ReleaseRowComponent implements OnInit {

  @Input() release!: Release;
  @Input() isChild: boolean = false;
  
  private _view!: View;
  @Input() set view(value: View) {
    if(value !== this._view) {
      this._view = value;
    }
  }
  get view(): View {
    return this._view;
  }

  public query: string = '';
  public artists!: Artist[];
  public types: string[] = ['ALBUM', 'SINGLE', 'EP', 'COMPILATION'];
      
  constructor(private _spotifyService: SpotifyObjectsService) { }

  ngOnInit() {
    this.artists = this._spotifyService.artists;
    this.query = this.release.name;
  }

  unmatch(){
    let childReleaseIndex: number | undefined = this.release.parentRelease?._children?.findIndex((r: Release) => r === this.release);
    if(childReleaseIndex !== undefined && childReleaseIndex >= 0){
      this.release.parentRelease!._children!.splice(childReleaseIndex,1);
      this.release.parentRelease = undefined;
    } else throw Error('childReleaseIndex was not found');
  }

}
