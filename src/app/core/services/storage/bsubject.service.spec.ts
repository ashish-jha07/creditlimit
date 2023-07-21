import { TestBed } from '@angular/core/testing';

import { BsubjectService } from './bsubject.service';

describe('BsubjectService', () => {
  let service: BsubjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BsubjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
