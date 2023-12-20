import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const api="https://ajo-tsys-gamelink-spring-1011-production.up.railway.app/"

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(userName: string, password: string): Observable<any> {
    return this.http.post(api + 'login', {
      userName,
      password
    }, httpOptions);
  }
  register(userName: string, email: string, password: string): Observable<any> {
    return this.http.post(api + 'user/add', {
      userName,
      email,
      password
    }, httpOptions);
  }
}
