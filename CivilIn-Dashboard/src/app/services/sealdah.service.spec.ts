import { TestBed } from '@angular/core/testing';

import { SealdahService } from './sealdah.service';

describe('SealdahService', () => {
  let service: SealdahService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SealdahService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
