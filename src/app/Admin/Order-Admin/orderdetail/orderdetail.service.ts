import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order ,User} from './orderdetail.module';

@Injectable({
  providedIn: 'root'
})
export class OrderdetailService {
  private apiUrl = 'http://localhost:3000/order/user/orderWait';
  private apiUrl1 = 'http://localhost:3000/users/infor';
  constructor(private http: HttpClient) { }
  getOrderById(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${orderId}`);
  }
  getUserById(Id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl1}/${Id}`);
  }
}

