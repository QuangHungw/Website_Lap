import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderDetail,Product,Category } from './cart.module';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:3000/product';
  private apiUrl1 = 'http://localhost:3000/orderdetail/cart';
  private apiUrl2 = 'http://localhost:3000/category';
  private apiUrl3 = 'http://localhost:3000/orderdetail/update';
  private apiUrl4 = 'http://localhost:3000/orderdetail/delete';
  constructor(private http: HttpClient) { }
  getOrderDetail(token?: string | null): Observable<OrderDetail> {
    return this.http.get<OrderDetail>(this.apiUrl1, { headers: { Authorization: `Bearer ${token}` } });
  }
  getProductById(Id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${Id}`);
  }
  getCategory(): Observable<Category> {
    return this.http.get<Category>(this.apiUrl2);
  }
  updateOrderDetail(token: string | null | undefined, id: number, quantity: number): Observable<OrderDetail> {
    const headers = ({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const body = {
      id: id,
      quantity: quantity,
    };

    return this.http.put<OrderDetail>(this.apiUrl3, body, { headers: headers });
  }
  deleteOrderDetail(token: string | null | undefined, id: string): Observable<OrderDetail> {
    const url = `${this.apiUrl4}/${id}`;
    const headers = ({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };

    return this.http.delete<OrderDetail>(url, options);
  }
}