import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsersService } from '../services/users.service';

export const isAdminGuard: CanActivateFn = (route, state) => {
  const user: UsersService = inject(UsersService);
  if(user.isAdmin()){
    return true;
  }
  else{
    const router: Router = inject(Router);
    router.navigate(['login']);
    return false
  }
};
