import { Injectable } from '@angular/core';
import { Post } from './editpost.module';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EditpostService {

  private apiUrl = 'http://localhost:3000/post';
  private apiUrl1 = 'http://localhost:3000/post/get';
  constructor(private http: HttpClient) {}
  updatePost(id: string, post: Post): Observable<Post> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Post>(url, post);
  }
  getPostById(postId: string): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl1}/${postId}`);

}
}
