/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HarReaderService } from './har-reader.service';

describe('Service: HarReader', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HarReaderService]
    });
  });

  it('should ...', inject([HarReaderService], (service: HarReaderService) => {
    expect(service).toBeTruthy();
  }));
});
