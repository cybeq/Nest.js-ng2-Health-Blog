import { TestBed } from '@angular/core/testing';

import { TabEmitService } from './tab-emit.service';

describe('TabEmitService', () => {
  let service: TabEmitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabEmitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
