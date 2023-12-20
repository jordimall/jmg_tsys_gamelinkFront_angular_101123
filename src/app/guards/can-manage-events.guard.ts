import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsersService } from '../services/users.service';

export const canManageEventsGuard: CanActivateFn = (route, state) => {
  const user: UsersService = inject(UsersService);
  if(user.canManage()){
    return true;
  }
  else{
    const router: Router = inject(Router);
    router.navigate(['login']);
    return false
  }
};
