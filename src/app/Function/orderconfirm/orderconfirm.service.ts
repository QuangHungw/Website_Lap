import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order,Product } from './orderconfirm.module';
@Injectable({
  providedIn: 'root'
})
export class OrderconfirmService {

  private apiUrl1 = 'http://localhost:3000/product';
  private apiUrl2 = 'http://localhost:3000/order/user/orderComplete'; 
 
  constructor(private http: HttpClient) { }
  getOrder(token?: string | null): Observable<Order> {
    return this.http.get<Order>(this.apiUrl2, { headers: { Authorization: `Bearer ${token}` } });
  }
  getProductById(Id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl1}/${Id}`);
  }
}
