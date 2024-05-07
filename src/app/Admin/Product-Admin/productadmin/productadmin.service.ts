import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, Product } from './productadmin.module';

@Injectable({
  providedIn: 'root'
})
export class ProductadminService {
  private apiUrl = 'http://localhost:3000/product';
  private apiUrl1 = "http://localhost:3000/category"
  constructor(private http: HttpClient) { }
  getProduct(): Observable<Product> {
    return this.http.get<Product>(this.apiUrl);
  }
  getCategoryById(Id: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl1}/${Id}`);
  }
}
