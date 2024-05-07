import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from './editcategory.module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditcategoryService {

  private apiUrl = 'http://localhost:3000/category';

  constructor(private http: HttpClient) {}
  updateCategory(id: string, category: Category): Observable<Category> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Category>(url, category);
  }
  getCategoryById(categoryId: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${categoryId}`);

}

}
  

  




