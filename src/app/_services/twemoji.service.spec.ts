import { TestBed } from '@angular/core/testing';

import { TwemojiService } from './twemoji.service';

describe('TwemojiService', () => {
  let service: TwemojiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TwemojiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
