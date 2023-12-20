import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../models/message.model';

const baseURL = 'https://ajo-tsys-gamelink-spring-1011-production.up.railway.app/message';
const baseURLLocalBack = 'http://localhost:8082/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  getAllMessagesByPartyId = (id: number | undefined): Observable<any> => {
    return this.http.get<any>(baseURL+"/party/"+id);
  }

  addMessageByPartyId = (id: number | undefined, data: Message): Observable<any> => {
    return this.http.post<any>(baseURL+"/party/write/"+id, data);
  }
}
