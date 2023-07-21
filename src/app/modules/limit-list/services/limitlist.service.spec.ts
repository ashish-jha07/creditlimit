import { TestBed } from '@angular/core/testing';

import { LimitlistService } from './limitlist.service';

describe('LimitlistService', () => {
  let service: LimitlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LimitlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
