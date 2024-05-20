import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderDetail,Product,Payment } from './checkout.module';
@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private apiUrl1 = 'http://localhost:3000/product';
  private apiUrl2 = 'http://localhost:3000/orderdetail/cart'; 
  private apiUrl3 = 'http://localhost:3000/payment';

 
  constructor(private http: HttpClient) { }
  getOrderDetail(token?: string | null): Observable<OrderDetail> {
    return this.http.get<OrderDetail>(this.apiUrl2, { headers: { Authorization: `Bearer ${token}` } });
  }
  getProductById(Id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl1}/${Id}`);
  }
  postPayment(token: string | null| undefined, paymentMethod: string): Observable<Payment> {
    return this.http.post<Payment>(
        this.apiUrl3,
        { paymentMethod: paymentMethod },
        { headers: { Authorization: `Bearer ${token}` } }
    );
}



}
