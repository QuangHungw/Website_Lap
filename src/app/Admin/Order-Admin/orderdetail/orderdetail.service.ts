import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order ,User,OrderDetail,Product} from './orderdetail.module';

@Injectable({
  providedIn: 'root'
})
export class OrderdetailService {
  private apiUrl = 'http://localhost:3000/order/user/orderWait';
  private apiUrl1 = 'http://localhost:3000/users/infor';
  private apiUrl2 = 'http://localhost:3000/product';
  private apiUrl3 = 'http://localhost:3000/order/inOrder'; 
  private apiUrl4 = 'http://localhost:3000/order/confirm'
  private apiUrl5 = 'http://localhost:3000/order/cancel'
  
  constructor(private http: HttpClient) { }
  getOrderById(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${orderId}`);
  }
  getUserById(Id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl1}/${Id}`);
  }
  getOrderDetailById(orderId: string): Observable<OrderDetail> {
    return this.http.get<OrderDetail>(`${this.apiUrl3}/${orderId}`);
  }
  getProductById(Id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl2}/${Id}`);
  }
  postConfirm(Id: string): Observable<Order[]> {
    const url = `${this.apiUrl4}/${Id}`;
    return this.http.post<Order[]>(url, {});
  }
  postCancel(Id: string): Observable<Order[]> {
    const url = `${this.apiUrl5}/${Id}`;
    return this.http.post<Order[]>(url, {});
  }
}

