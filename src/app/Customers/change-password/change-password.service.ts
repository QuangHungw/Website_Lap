import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Password } from './change-password.module';

@Injectable({
  providedIn: 'root',
})
export class ChangePasswordService {
  private apiUrl = 'http://localhost:3000/users/change-password';

  constructor(private http: HttpClient) {}

  changePassword(
    passwordData: Password,
    token?: string | null
  ): Observable<string> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.apiUrl, passwordData, {
      headers,
      responseType: 'text',
    });
  }
}
