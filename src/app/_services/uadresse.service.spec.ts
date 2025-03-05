import { TestBed } from '@angular/core/testing';

import { UadresseService } from './uadresse.service';

describe('UadresseService', () => {
  let service: UadresseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UadresseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
