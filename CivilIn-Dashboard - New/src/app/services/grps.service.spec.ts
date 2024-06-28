import { TestBed } from '@angular/core/testing';

import { GrpsService } from './grps.service';

describe('GrpsService', () => {
  let service: GrpsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrpsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
