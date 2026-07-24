import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import {
  unsavedChangesGuard,
  CanComponentDeactivate
} from './unsaved-changes-guard';

describe('unsavedChangesGuard', () => {
  const executeGuard: CanDeactivateFn<CanComponentDeactivate> = (...guardParameters) =>
      TestBed.runInInjectionContext(() => unsavedChangesGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should allow deactivation when component has no unsaved changes', () => {
    const mockComponent: CanComponentDeactivate = {
      canDeactivate: () => true
    };

    const result = executeGuard(
      mockComponent,
      {} as any,
      {} as any,
      {} as any
    );

    expect(result).toBeTrue();
  });
});