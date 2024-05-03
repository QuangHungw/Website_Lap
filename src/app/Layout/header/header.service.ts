import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User,Category} from './header.module';
@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private apiUrl = 'http://localhost:3000/users/me';
  private apiUrl1 = 'http://localhost:3000/category';
  
  constructor(private http: HttpClient) { }

  getUser(token?: string | null): Observable<User> {
    return this.http.get<User>(this.apiUrl, { headers: { Authorization: `Bearer ${token}` } });
  }
  getCategory(): Observable<Category> {
    return this.http.get<Category>(this.apiUrl1);
  }
}