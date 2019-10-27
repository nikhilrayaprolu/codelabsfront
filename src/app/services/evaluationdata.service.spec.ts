import { TestBed } from '@angular/core/testing';

import { EvaluationdataService } from './evaluationdata.service';

describe('EvaluationdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EvaluationdataService = TestBed.get(EvaluationdataService);
    expect(service).toBeTruthy();
  });
});
