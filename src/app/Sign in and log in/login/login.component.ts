import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './login.service';
import { User } from './login.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent  {
  token?: string | null;
  users?: User[] = [];
  loginObj: Login;
  constructor(private http: HttpClient,private userService: LoginService, ) {
    this.loginObj = new Login();
}
onLogin() {
  
  this.http.post<any>('http://localhost:3000/auth/login', this.loginObj).subscribe(
    (res) => {
      if (res && res.accessToken) {
        console.log(res);
        localStorage.setItem('accessToken', res.accessToken); // Lưu token vào localStorage để sử dụng sau này
        alert("login successful");
        this.token = localStorage.getItem('accessToken');
        if(localStorage.getItem('accessToken')) {
          this.userService.getUser(this.token).subscribe((data: User) => {
            this.users = this.users?.concat(data);
            console.log(data);
            if(data.role_id == 0) 
                 { 
                  window.location.href = "/admin"
                }
          });
        }
           window.location.href = "/customer"

      } else {
        alert("Login failed");
      }
    },
    (error) => {
      console.error('Error:', error);
      alert("Login failed");
    }
  );
}

}

export class Login {
  email: string;
  password:string ;
  constructor() {
    this.email = '';
    this.password = '';
  }
}
