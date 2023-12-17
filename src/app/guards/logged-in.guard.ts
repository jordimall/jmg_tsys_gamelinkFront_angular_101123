import { inject } from '@angular/core';
import { CanActivateFn, Route, Router } from '@angular/router';
import { UsersService } from '../services/users.service';

export const loggedInGuard: CanActivateFn = (route, state) => {

  const user: UsersService = inject(UsersService);
  if(user.loggedIn()){
    return true;
  }
  else{
    const router: Router = inject(Router);
    router.navigate(['login']);
    return false;
  }
};
