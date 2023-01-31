import {TestBed} from '@angular/core/testing';

import {TravellService} from './travell.service';

describe('TravellService', () => {
  let service: TravellService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TravellService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
