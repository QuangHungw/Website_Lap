import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product,OrderDetail,Category } from './product-detail.module';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {
  private apiUrl = 'http://localhost:3000/product';
  private apiUrl2 = 'http://localhost:3000/category';
  private apiUrl1 = 'http://localhost:3000/orderdetail';
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
  getProduct(): Observable<Product> {
  return this.http.get<Product>(this.apiUrl);
}
getCategory(): Observable<Category> {
  return this.http.get<Category>(this.apiUrl2);
}
postOrderdetail(token: string | null | undefined,price: number,productId : number,quantity : number): Observable<OrderDetail> {
  
  const headers = { Authorization: `Bearer ${token}` };
  return this.http.post<OrderDetail>(this.apiUrl1, {price:price,productId : productId,quantity:quantity}, { headers: headers  });
}
}

