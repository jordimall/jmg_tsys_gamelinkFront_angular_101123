import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GameRole } from '../models/game-role.model';

const baseUrl =
  'https://ajo-tsys-gamelink-spring-1011-production.up.railway.app/game_role';
@Injectable({
  providedIn: 'root',
})
export class GameRoleService {
  constructor(private http: HttpClient) {}

  allGameRolePaginate = (
    numPage: number,
    size: number
  ): Observable<GameRole[]> => {
    return this.http.get<any[]>(`${baseUrl}/all?page=${numPage}&sixe=${size}`);
  };

  getGameRole = (id: number): Observable<GameRole> => {
    return this.http.get<GameRole>(`${baseUrl}/id/${id}`);
  };

  addGameRole = (data: GameRole): Observable<any> => {
    return this.http.post(`${baseUrl}/add`, data);
  };

  editGameRole = (id: number, data: GameRole): Observable<any> => {
    return this.http.put(`${baseUrl}/${id}`, data);
  };

  deleteGameRole = (id: number): Observable<any> => {
    return this.http.delete(`${baseUrl}/${id}`);
  };

  getAllGameRoleByGame = (id: number | undefined): Observable<any> => {
    return this.http.get<any>(`${baseURL}/all?idGame=${id}`);
  }
}
