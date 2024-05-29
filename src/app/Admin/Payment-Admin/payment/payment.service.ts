import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment } from './payment.module';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:3000/payment';
  constructor(private http: HttpClient) { }
  getPayment(): Observable<Payment> {
    return this.http.get<Payment>(this.apiUrl);
  }
}
