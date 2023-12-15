import { inject } from '@angular/core';
import { CanActivateFn, Route, Router } from '@angular/router';

export const loggedInGuard: CanActivateFn = (route, state) => {

  const router: Router = inject(Router);
  router.navigate(['login']);
  return false;
};
