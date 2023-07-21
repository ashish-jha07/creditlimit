import { TestBed } from '@angular/core/testing';

import { MastermanagementService } from './mastermanagement.service';

describe('MastermanagementService', () => {
  let service: MastermanagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MastermanagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
