import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product,OrderDetail } from './web-lap.module';
@Injectable({
  providedIn: 'root',
})
export class WebLapService {
  private apiUrl = 'http://localhost:3000/product';
  private apiUrl1 = 'http://localhost:3000/orderdetail';
  
  constructor(private http: HttpClient) {}

  getProduct(): Observable<Product> {
    return this.http.get<Product>(this.apiUrl);
  } 
  postOrderdetail(token: string | null | undefined,price: number,productId : number,quantity : number): Observable<OrderDetail> {
  
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post<OrderDetail>(this.apiUrl1, {price:price,productId : productId,quantity:quantity}, { headers: headers  });
  }


}
