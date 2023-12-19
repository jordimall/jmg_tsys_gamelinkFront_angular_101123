import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tag } from '../models/tag.model';

const baseURL = 'https://ajo-tsys-gamelink-spring-1011-production.up.railway.app/tag';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  constructor(private http: HttpClient) {}

  allTagPaginate = (numPage: number, size:number): Observable<Tag[]> => {
    return this.http.get<any[]>(`${baseURL}/all?page=${numPage}&size=${size}`);
  };

  getTag = (id: number): Observable<Tag> => {
    return this.http.get<Tag>(`${baseURL}/id/${id}`);
  };

  addTag = (data: Tag): Observable<any> => {
    return this.http.post(`${baseURL}/add`, data);
  };

  editTag = (id: number, data: Tag): Observable<any> => {
    return this.http.put(`${baseURL}/${id}`, data);
  };

  deleteTag = (id: number): Observable<any> => {
    return this.http.delete(`${baseURL}/${id}`);
  };
}
