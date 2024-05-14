import { Injectable } from '@angular/core';
import { Category } from './deletecategory.module';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DeletecategoryService {

  private apiUrl = 'http://localhost:3000/category';
  constructor(private http: HttpClient) {}
  deleteCategory(id: string): Observable<Category> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Category>(url);
  }
  getCategoryById(productId: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${productId}`);

}
}
