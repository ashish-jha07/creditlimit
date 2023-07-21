import { TestBed } from '@angular/core/testing';

import { HomedataResolver } from './homedata.resolver';

describe('HomedataResolver', () => {
  let resolver: HomedataResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(HomedataResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
