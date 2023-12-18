import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../models/game.model';

const baseURL = 'https://ajo-tsys-gamelink-spring-1011-production.up.railway.app/game';


@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private http: HttpClient) {}

  allGame = (): Observable<Game[]> => {
    return this.http.get<Game[]>(`${baseURL}/all`);
  };

  gameById = (id: number): Observable<Game> => {
    return this.http.get<Game>(baseURL+"/"+id)
  };
}
