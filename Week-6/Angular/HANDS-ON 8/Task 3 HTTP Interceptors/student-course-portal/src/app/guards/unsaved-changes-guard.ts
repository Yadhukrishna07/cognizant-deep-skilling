import { CanDeactivateFn } from '@angular/router';

export interface CanComponentDeactivate {
  canDeactivate: () => boolean;
}

export const unsavedChangesGuard:
  CanDeactivateFn<CanComponentDeactivate> = (component) => {

    if (component.canDeactivate) {
      return component.canDeactivate();
    }

    return true;
  };