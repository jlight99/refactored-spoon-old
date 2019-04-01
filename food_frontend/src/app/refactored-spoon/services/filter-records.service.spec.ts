import { TestBed } from '@angular/core/testing';

import { FilterRecordsService } from './filter-records.service';

describe('FilterRecordsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilterRecordsService = TestBed.get(FilterRecordsService);
    expect(service).toBeTruthy();
  });
});
