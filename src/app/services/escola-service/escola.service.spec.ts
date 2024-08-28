import { TestBed } from '@angular/core/testing';

import { EscolaService } from './escola.service';

describe('EscolaService', () => {
  let service: EscolaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EscolaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
