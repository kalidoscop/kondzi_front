import { TestBed } from '@angular/core/testing';

import { RestContriesService } from './rest-contries.service';

describe('RestContriesService', () => {
  let service: RestContriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestContriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
