import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { GenerateIconService } from './generate-icon.service';

describe('GenerateIconService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [HttpClient],
      imports: [HttpClientTestingModule],
    }),
  );

  it('should be created', () => {
    const service: GenerateIconService = TestBed.get(GenerateIconService);
    expect(service).toBeTruthy();
  });
});
