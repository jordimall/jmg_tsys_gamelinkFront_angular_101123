import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/event.model';

const baseURL = 'http://localhost:3000/event';
@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient) {}

  allEventPaginate = (numPage: number): Observable<Event[]> => {
    return this.http.get<Event[]>(`${baseURL}?_page=${numPage}&_limit=20`);
  };

  getEvent = (id: number): Observable<Event> => {
    return this.http.get(`${baseURL}/${id}`);
  };
}
