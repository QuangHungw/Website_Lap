import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User,Category,Order,OrderDetail,Product} from './header.module';
@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private apiUrl = 'http://localhost:3000/users/me';
  private apiUrl1 = 'http://localhost:3000/category/search/type';
  private apiUrl2 = 'http://localhost:3000/order';
  private apiUrl3 = 'http://localhost:3000/product';
  private apiUrl4 = 'http://localhost:3000/orderdetail/cart';
  constructor(private http: HttpClient) { }

  getUser(token?: string | null): Observable<User> {
    return this.http.get<User>(this.apiUrl, { headers: { Authorization: `Bearer ${token}` } });
  }
  postOrder(token: string | null): Observable<Order> {
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post<Order>(this.apiUrl2, null, { headers: headers });
  }
  postType(type: string | null): Observable<Category[]> {
    return this.http.post<Category[]>(this.apiUrl1,{ type : type});
  }
  getOrderDetail(token?: string | null): Observable<OrderDetail[]> {
    return this.http.get<OrderDetail[]>(this.apiUrl4, { headers: { Authorization: `Bearer ${token}` } });
  }
  getProductById(Id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl3}/${Id}`);
  }
}

