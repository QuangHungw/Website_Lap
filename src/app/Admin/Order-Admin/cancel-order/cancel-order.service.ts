import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order ,User} from './cancel-order.module';
@Injectable({
  providedIn: 'root'
})
export class CancelOrderService {

  private apiUrl = 'http://localhost:3000/order/allCancel';
  private apiUrl1 = 'http://localhost:3000/users/infor';
  constructor(private http: HttpClient) { }
  getOrder(): Observable<Order> {
    return this.http.get<Order>(this.apiUrl);
  }
  getUserById(Id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl1}/${Id}`);
  }
}
