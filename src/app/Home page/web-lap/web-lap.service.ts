import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './web-lap.module';
@Injectable({
  providedIn: 'root',
})
export class WebLapService {
  private apiUrl = 'http://localhost:3000/product';

  constructor(private http: HttpClient) {}

  getProduct(): Observable<Product> {
    return this.http.get<Product>(this.apiUrl);
  }
}
