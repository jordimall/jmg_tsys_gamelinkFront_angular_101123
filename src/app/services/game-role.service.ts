import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GameRole } from '../models/game-role.model';

const baseURL = 'https://ajo-tsys-gamelink-spring-1011-production.up.railway.app/game_role';
const baseURLMock = 'http://localhost:3000/gameRole';
const baseURLLocalBack = 'http://localhost:8082/game_role';
@Injectable({
  providedIn: 'root'
})
export class GameRoleService {

  constructor(private http: HttpClient) {}

  allGameRolePaginate = (numPage: number): Observable<GameRole[]> => {
    return this.http.get<GameRole[]>(`${baseURLMock}?_page=${numPage}&_limit=20`);
  };

  getGameRole = (id: number): Observable<GameRole> => {
    return this.http.get<GameRole>(`${baseURLMock}/${id}`);
  };

  addGameRole = (data: GameRole): Observable<any> => {
    return this.http.post(baseURLMock, data);
  };

  editGameRole = (id: number, data: GameRole): Observable<any> => {
    return this.http.put(`${baseURLMock}/${id}`, data);
  };

  deleteGameRole = (id: number): Observable<any> => {
    return this.http.delete(`${baseURLMock}/${id}`);
  };

  getAllGameRoleByGame = (id: number): Observable<any> => {
    return this.http.get<any>(`${baseURL}/all?idGame=${id}`);
  }
}
