import { TestBed } from '@angular/core/testing';

import { TrophiesService } from './trophies.service';

describe('TrophiesService', () => {
  let service: TrophiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrophiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
