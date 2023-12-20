import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Party } from '../models/party.model';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/user.model';
import { UserPartyGameRole } from '../models/user-party-game-role.model';

const baseURL = 'https://ajo-tsys-gamelink-spring-1011-production.up.railway.app/party';
const baseURLLocalBack = 'http://localhost:8082/party';

@Injectable({
  providedIn: 'root'
})
export class PartyService {

  constructor(private http: HttpClient) {}

  allPartiesByGame = (id: number): Observable<any> => {
    return this.http.get<any>(baseURL+'/all?idGame='+(id as unknown as string));
  };

  getOwnParties = (): Observable<any> => {
    return this.http.get<any>(baseURL+'/own');
  };

  getOwnPartyById = (id: number): Observable<Party> => {
    return this.http.get<Party>(baseURL+'/own/id/'+id);
  };

  updateOwnParty = (data: Party): Observable<Party> => {
    return this.http.put<Party>(baseURL+"/own/update/"+data.id, data);
  }

  deleteOwnParty = (id: number): Observable<any> => {
    return this.http.delete<Party>(baseURL+"/own/delete/"+id);
  }

  getOnePartyById = (id: number): Observable<Party> => {
    return this.http.get<Party>(baseURL+'/id/'+id);
  }

  getMembers = (id: number | undefined): Observable<UserPartyGameRole[]> => {
    return this.http.get<UserPartyGameRole[]>(baseURL+"/members/"+id);
  }

  getJoinedParties = (): Observable<Party[]> => {
    return this.http.get<Party[]>(baseURL+"/joined");
  }

  createParty = (data: Party): Observable<Party> => {
    return this.http.post<Party>(baseURL+"/add", data);
  }

  joinParty = (id: number | undefined, data: number | undefined): Observable<UserPartyGameRole[]> => {
    return this.http.post<UserPartyGameRole[]>(`${baseURL}/join/${id}`, data);
  }

  leaveParty = (id: number | undefined, data: number | undefined): Observable<UserPartyGameRole[]> => {
    return this.http.post<UserPartyGameRole[]>(`${baseURL}/leave/${id}`, data);
  }
}
