import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './editcustomeradmin.module';
@Injectable({
  providedIn: 'root'
})
export class EditcustomeradminService {
  private apiUrl = 'http://localhost:3000/users/infor';
  private apiUrl1 = 'http://localhost:3000/users/me';
 
  constructor(private http: HttpClient) { }
  getUser(Id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${Id}`);
  }


}
