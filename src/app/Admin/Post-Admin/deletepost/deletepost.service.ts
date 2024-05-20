import { Injectable } from '@angular/core';
import { Post } from './deletepost.module';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DeletepostService {
  private apiUrl = 'http://localhost:3000/post';
  private apiUrl1 = 'http://localhost:3000/post/get';
  constructor(private http: HttpClient) {}
  deletePost(id: string): Observable<Post> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Post>(url);
  }
  getPostById(postId: string): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl1}/${postId}`);

}
}
