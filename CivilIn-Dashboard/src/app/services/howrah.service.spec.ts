import { TestBed } from '@angular/core/testing';

import { HowrahService } from './howrah.service';

describe('HowrahService', () => {
  let service: HowrahService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HowrahService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
