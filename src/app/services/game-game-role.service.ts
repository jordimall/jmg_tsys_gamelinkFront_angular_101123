import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GameGameRole } from './../models/game-game-role.model';

const baseURL =
  'https://ajo-tsys-gamelink-spring-1011-production.up.railway.app/game_game_role';

@Injectable({
  providedIn: 'root',
})
export class GameGameRoleService {
  constructor(private http: HttpClient) {}

  gameByGameRole = (id: number): Observable<GameGameRole[]> => {
    return this.http.get<GameGameRole[]>(
      `${baseURL}/allByIdGameRole/${id}`
    );
  };
}
