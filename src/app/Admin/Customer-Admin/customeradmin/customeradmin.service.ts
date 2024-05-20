import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role, User } from './customeradmin.module';

@Injectable({
  providedIn: 'root'
})
export class CustomeradminService {

  private apiUrl = 'http://localhost:3000/users';
  private apiUrl1 = 'http://localhost:3000/role';
  
  constructor(private http: HttpClient) { }
  getUser(): Observable<User> {
    return this.http.get<User>(this.apiUrl);
  }

getRoleById(roleId: string): Observable<Role> {
  return this.http.get<Role>(`${this.apiUrl1}/${roleId}`);
}
}
