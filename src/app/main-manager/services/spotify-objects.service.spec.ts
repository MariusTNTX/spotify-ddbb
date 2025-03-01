/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SpotifyObjectsService } from './spotify-objects.service';

describe('Service: SpotifyObjects', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpotifyObjectsService]
    });
  });

  it('should ...', inject([SpotifyObjectsService], (service: SpotifyObjectsService) => {
    expect(service).toBeTruthy();
  }));
});
