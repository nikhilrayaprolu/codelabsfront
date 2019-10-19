import { TestBed } from '@angular/core/testing';

import { NewlabService } from './newlab.service';

describe('NewlabService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewlabService = TestBed.get(NewlabService);
    expect(service).toBeTruthy();
  });
});
