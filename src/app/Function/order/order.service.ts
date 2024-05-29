import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order,Product } from './order.module';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl1 = 'http://localhost:3000/product';
  private apiUrl2 = 'http://localhost:3000/order/user/order'; 
 
  constructor(private http: HttpClient) { }
  getOrder(token?: string | null): Observable<Order> {
    return this.http.get<Order>(this.apiUrl2, { headers: { Authorization: `Bearer ${token}` } });
  }
  getProductById(Id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl1}/${Id}`);
  }
}
