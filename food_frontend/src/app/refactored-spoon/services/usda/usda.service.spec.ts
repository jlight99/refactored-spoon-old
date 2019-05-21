import { TestBed } from '@angular/core/testing';

import { UsdaService } from './usda.service';

describe('UsdaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsdaService = TestBed.get(UsdaService);
    expect(service).toBeTruthy();
  });
});
