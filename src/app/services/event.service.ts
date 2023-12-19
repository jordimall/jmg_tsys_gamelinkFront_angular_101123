import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/event.model';

const baseURL = 'https://ajo-tsys-gamelink-spring-1011-production.up.railway.app/event';
@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient) {}

  allEventPaginate = (numPage: number): Observable<Event[]> => {
    return this.http.get<any[]>(`${baseURL}/all?page=${numPage}`);
  };

  allEventPaginateByGame = (numPage: number, idGame:string): Observable<Event[]> => {
    return this.http.get<any[]>(`${baseURL}/all?page=${numPage}&idGame=${idGame}`);
  };

  getEvent = (id: number): Observable<Event> => {
    return this.http.get<Event>(`${baseURL}/id/${id}`);
  };

  addEvent = (data: Event): Observable<any> => {
    console.log(data)
    return this.http.post(`${baseURL}/add`, data);
  };

  editEvent = (id: number, data: Event): Observable<any> => {
    return this.http.put(`${baseURL}/${id}`, data);
  };
}
