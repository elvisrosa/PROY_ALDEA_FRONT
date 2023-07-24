import { TestBed } from '@angular/core/testing';

import { CasaServiceService } from './casa-service.service';

describe('CasaServiceService', () => {
  let service: CasaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CasaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
