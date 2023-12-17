import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {}

  loggedIn(){
    return (this.tokenStorage.getToken())
  }
}
