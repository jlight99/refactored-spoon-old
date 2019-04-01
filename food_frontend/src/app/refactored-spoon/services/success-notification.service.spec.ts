import { TestBed } from '@angular/core/testing';

import { SuccessNotificationService } from './success-notification.service';

describe('SuccessNotificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SuccessNotificationService = TestBed.get(SuccessNotificationService);
    expect(service).toBeTruthy();
  });
});
