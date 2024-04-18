import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  onSearchClick(): void {
    window.location.href = "/products";
  }
  loginObj: Login;
  constructor(private http: HttpClient, private router: Router) {
    this.loginObj = new Login();
}
onLogin() {
      //debugger
  this.http.post<any>('http://localhost:3000/auth/login', this.loginObj).subscribe(
    (res) => {
      if (res && res.accessToken) {
        console.log(res);
        localStorage.setItem('accessToken', res.accessToken); // Lưu token vào localStorage để sử dụng sau này
        this.router.navigateByUrl("/customer");
        alert("Login successful");
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
