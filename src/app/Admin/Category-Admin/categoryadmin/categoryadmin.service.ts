import { Injectable } from '@angular/core';
import { Category } from './categoryadmin.module';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryadminService {
  private apiUrl = 'http://localhost:3000/category';
  constructor(private http: HttpClient) { }
  getCategory(): Observable<Category> {
    return this.http.get<Category>(this.apiUrl);
  }
}
