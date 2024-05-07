import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, Category } from './products.module';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:3000/product';
  private apiUrl2 = 'http://localhost:3000/category';
  private apiUrl3 = 'http://localhost:3000/product/search';

  constructor(private http: HttpClient) {}

  getProduct(): Observable<Product> {
    return this.http.get<Product>(this.apiUrl);
  }
 
  getCategoryById(categoryId: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl2}/${categoryId}`);

}
searchProductsByCategoryId(categoryId1: number): Observable<Product[]> {
  return this.http.post<Product[]>(this.apiUrl3, { categoryId: categoryId1 });
}
searchProductsByName(name: string): Observable<Product[]> {
  return this.http.post<Product[]>(this.apiUrl3, {  name: name });
}
}
