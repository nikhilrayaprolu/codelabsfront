import { TestBed } from '@angular/core/testing';

import { TrackslistService } from './trackslist.service';

describe('TrackslistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrackslistService = TestBed.get(TrackslistService);
    expect(service).toBeTruthy();
  });
});
