import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Party } from '../models/party.model';
import { Observable } from 'rxjs/internal/Observable';

const baseURL = 'http://localhost:3000/party/all?idGame=';

@Injectable({
  providedIn: 'root'
})
export class PartyService {

  constructor(private http: HttpClient) {}

  allPartiesByGame = (id: number): Observable<Party[]> => {
    return this.http.get<Party[]>(baseURL+(id as unknown as string));
  };
}
