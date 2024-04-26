import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
 
  loginObj: Login;
  constructor(private http: HttpClient ) {
    this.loginObj = new Login();
}
onLogin() {
  
  this.http.post<any>('http://localhost:3000/auth/login', this.loginObj).subscribe(
    (res) => {
      if (res && res.accessToken) {
        console.log(res);
        localStorage.setItem('accessToken', res.accessToken); // Lưu token vào localStorage để sử dụng sau này
        window.location.href = "/customer"
        alert("login successful");
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
