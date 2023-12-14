import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
    this.checkRole();

  }

  checkRole(){
    this.http.get("https://ajo-tsys-gamelink-spring-1011-production.up.railway.app/user/1");
  }
}
