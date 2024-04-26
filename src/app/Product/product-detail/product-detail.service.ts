import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product-detail.module';
import {  Category } from './product-detail.module';
@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {
  private apiUrl = 'http://localhost:3000/product';
  private apiUrl2 = 'http://localhost:3000/category';
  constructor(private http: HttpClient) {}
  // getProductList(): Observable<Product[]> {
  //   return this.http.get<Product[]>(this.apiUrl);
  // }

  getProductById(Id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${Id}`);
  }
  getCategoryById(categoryId: string | null): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl2}/${categoryId}`);

}
}

