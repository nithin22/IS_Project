import { TestBed } from '@angular/core/testing';

import { AspquerygeneratorService } from './aspquerygenerator.service';

describe('AspquerygeneratorService', () => {
  let service: AspquerygeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AspquerygeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
