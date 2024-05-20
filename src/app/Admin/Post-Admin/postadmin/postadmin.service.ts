import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from './postadmin.module';
@Injectable({
  providedIn: 'root'
})
export class PostadminService {
  private apiUrl = 'http://localhost:3000/post';
  constructor(private http: HttpClient) { }
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }
}
