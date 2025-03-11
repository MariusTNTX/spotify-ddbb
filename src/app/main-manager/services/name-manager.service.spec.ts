/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NameManagerService } from './name-manager.service';

describe('Service: NameManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NameManagerService]
    });
  });

  it('should ...', inject([NameManagerService], (service: NameManagerService) => {
    expect(service).toBeTruthy();
  }));
});
