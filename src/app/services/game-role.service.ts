import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GameRole } from '../models/game-role.model';

const baseURL = 'https://ajo-tsys-gamelink-spring-1011-production.up.railway.app/game_role';
const baseURLLocalBack = 'http://localhost:8082/game_role';
@Injectable({
  providedIn: 'root'
})
export class GameRoleService {

  constructor(private http: HttpClient) {}

  allGameRolePaginate = (numPage: number,size:number): Observable<GameRole[]> => {
    return this.http.get<any[]>(`${baseURL}/all?page=${numPage}&sixe=${size}`);
  };

  getGameRole = (id: number): Observable<GameRole> => {
    return this.http.get<GameRole>(`${baseURL}/id/${id}`);
  };

  addGameRole = (data: GameRole): Observable<any> => {
    return this.http.post(`${baseURL}/add`, data);
  };

  editGameRole = (id: number, data: GameRole): Observable<any> => {
    return this.http.put(`${baseURL}/${id}`, data);
  };

  deleteGameRole = (id: number): Observable<any> => {
    return this.http.delete(`${baseURL}/${id}`);
  };

  getAllGameRoleByGame = (id: number | undefined): Observable<any> => {
    return this.http.get<any>(`${baseURL}/all?idGame=${id}`);
  }
}
