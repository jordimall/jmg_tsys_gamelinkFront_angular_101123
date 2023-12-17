import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Party } from '../models/party.model';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/user.model';

const baseURL = 'http://localhost:3000/party/';

@Injectable({
  providedIn: 'root'
})
export class PartyService {

  constructor(private http: HttpClient) {}

  allPartiesByGame = (id: number): Observable<Party[]> => {
    return this.http.get<Party[]>(baseURL+'all?idGame='+(id as unknown as string));
  };

  getOnePartyById = (id: number): Observable<Party> => {
    return this.http.get<Party>(baseURL+'id/'+id);
  }

  getMembers = (id: number): Observable<Object[]> => {
    return this.http.get<Object[]>(baseURL+"members/roles/"+id);
  }
}
