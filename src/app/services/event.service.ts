import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/event.model';

const baseURL = 'https://ajo-tsys-gamelink-spring-1011-production.up.railway.app/event';
const baseURLMock = 'http://localhost:3000/event';
@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient) {}

  allEventPaginate = (numPage: number): Observable<Event[]> => {
    return this.http.get<Event[]>(`${baseURLMock}?_page=${numPage}&_limit=20`); // Se ha de modificar url
  };

  getEvent = (id: number): Observable<Event> => {
    return this.http.get<Event>(`${baseURLMock}/${id}`);
  };

  addEvent = (data: Event): Observable<any> => {
    return this.http.post(baseURLMock, data);
  };

  editEvent = (id: number, data: Event): Observable<any> => {
    return this.http.put(`${baseURLMock}/${id}`, data);
  };
}
