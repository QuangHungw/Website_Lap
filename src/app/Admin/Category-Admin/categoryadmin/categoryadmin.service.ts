import { Injectable } from '@angular/core';
import { Category } from './categoryadmin.module';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryadminService {
  private apiUrl = 'http://localhost:3000/category';
  private apiUrl1 = 'http://localhost:3000/category/search';
  constructor(private http: HttpClient) { }
  getCategory(): Observable<Category> {
    return this.http.get<Category>(this.apiUrl);
  }
  searchCategoryByName(name: string): Observable<Category[]> {
    return this.http.post<Category[]>(this.apiUrl1,{  category_name : name });
  }
}
