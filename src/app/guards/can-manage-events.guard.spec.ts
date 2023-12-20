import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { canManageEventsGuard } from './can-manage-events.guard';

describe('canManageEventsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canManageEventsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
