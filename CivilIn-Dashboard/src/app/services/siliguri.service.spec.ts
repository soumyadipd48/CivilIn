import { TestBed } from '@angular/core/testing';

import { SiliguriService } from './siliguri.service';

describe('SiliguriService', () => {
  let service: SiliguriService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiliguriService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
