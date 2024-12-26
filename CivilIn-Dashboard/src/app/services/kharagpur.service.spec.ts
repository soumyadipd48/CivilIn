import { TestBed } from '@angular/core/testing';

import { KharagpurService } from './kharagpur.service';

describe('KharagpurService', () => {
  let service: KharagpurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KharagpurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
