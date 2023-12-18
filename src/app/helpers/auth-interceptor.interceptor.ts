import { HttpInterceptorFn } from '@angular/common/http';
import { TokenStorageService } from '../services/token-storage.service';

const TOKEN_HEADER_KEY = 'Authorization';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  let tok:TokenStorageService = new TokenStorageService();
  let authReq = req;
  const token = tok.getToken();
  if(token != null){
    authReq = req.clone({ setHeaders: {Authorization: `Bearer ${token}`}});
  }
  return next(authReq);
};
