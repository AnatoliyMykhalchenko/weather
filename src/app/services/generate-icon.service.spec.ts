import { TestBed } from '@angular/core/testing';

import { GenerateIconService } from './generate-icon.service';

describe('GenerateIconService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenerateIconService = TestBed.get(GenerateIconService);
    expect(service).toBeTruthy();
  });
});
