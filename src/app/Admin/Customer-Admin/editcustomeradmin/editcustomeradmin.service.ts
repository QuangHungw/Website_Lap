import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './editcustomeradmin.module';
@Injectable({
  providedIn: 'root'
})
export class EditcustomeradminService {
  private apiUrl = 'http://localhost:3000/users/infor';
  private apiUrl1 = 'http://localhost:3000/users/update';
 
  constructor(private http: HttpClient) { }
  getUser(Id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${Id}`);
  }
  updateUser(id: string, role_id: number): Observable<User> {
    const url = `${this.apiUrl1}/${id}`;
    return this.http.put<User>(url, {role_id : role_id });
  }
  


}
