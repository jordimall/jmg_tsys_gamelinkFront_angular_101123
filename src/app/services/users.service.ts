import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { TokenStorageService } from './token-storage.service';

const api="https://ajo-tsys-gamelink-spring-1011-production.up.railway.app/user/"

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {}

  loggedIn(){
    return (this.tokenStorage.getToken());
  }

  isAdmin(){
    return (this.tokenStorage.getUser().role == "ADMIN");
  }

  canManage(){
    return (this.tokenStorage.getUser().role == "ADMIN" || this.tokenStorage.getUser().role == "EVENT_MANAGER");
  }

  getUsers(){
    return this.http.get(api+"all");
  }

  deleteUser(id: number){
    return this.http.delete(api+id);
  }

  getUserProfile(){
    return this.http.get(api+"profile");
  }

  getAllUsersPaginate(numPage: number, size:number): Observable<User[]>{
      return this.http.get<any[]>(api+"all?page="+numPage+"&size="+size);
  }

  updateUser(user: User){
    return this.http.put(api+"update", user, httpOptions);
  }
}
