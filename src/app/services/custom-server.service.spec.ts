import { TestBed } from '@angular/core/testing';

import { CustomServerService } from './custom-server.service';

describe('CustomServerService', () => {
  let service: CustomServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
