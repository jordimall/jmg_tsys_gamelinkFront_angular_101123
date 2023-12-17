import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tag } from '../models/tag.model';

const baseURL =
  'https://ajo-tsys-gamelink-spring-1011-production.up.railway.app/tag';
const baseURLMock = 'http://localhost:3000/tag';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  constructor(private http: HttpClient) {}

  allTagPaginate = (numPage: number): Observable<Tag[]> => {
    return this.http.get<Tag[]>(`${baseURLMock}?_page=${numPage}&_limit=20`);
  };

  getTag = (id: number): Observable<Tag> => {
    return this.http.get<Tag>(`${baseURLMock}/${id}`);
  };

  addTag = (data: Tag): Observable<any> => {
    return this.http.post(baseURLMock, data);
  };

  editTag = (id: number, data: Tag): Observable<any> => {
    return this.http.put(`${baseURLMock}/${id}`, data);
  };

  deleteTag = (id: number): Observable<any> => {
    return this.http.delete(baseURLMock);
  };
}
