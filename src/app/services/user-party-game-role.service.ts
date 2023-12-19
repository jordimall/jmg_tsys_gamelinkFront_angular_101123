import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserPartyGameRole } from '../models/user-party-game-role.model';
import { Observable } from 'rxjs';

const baseURLLocalBack = 'http://localhost:8082/user_party_game_role';

@Injectable({
  providedIn: 'root'
})
export class UserPartyGameRoleService {

  constructor(private http: HttpClient) { }

  addGameRole = (data: UserPartyGameRole): Observable<any> => {
    return this.http.post(baseURLLocalBack + "/add", data);
  };

}
