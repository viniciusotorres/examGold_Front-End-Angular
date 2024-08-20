import { TestBed } from '@angular/core/testing';

import { SharedsService } from './shareds.service';

describe('SharedsService', () => {
  let service: SharedsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
