/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ReleaseService } from './release.service';

describe('Service: Release', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReleaseService]
    });
  });

  it('should ...', inject([ReleaseService], (service: ReleaseService) => {
    expect(service).toBeTruthy();
  }));
});
