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
    // Kiểm tra nếu email và password là "123"
    if (this.loginObj.email === '123@gmail.com' && this.loginObj.password === '123') {
      this.router.navigateByUrl("/admin");
      return; // Ngắt phương thức sau khi chuyển hướng
    }
  // debugger
  this.http.post('http://localhost:3000/user/login', this.loginObj).subscribe((res:any)=>{
    if(res) {
      console.log(res);
      if(res.status == 200) {
      this.router.navigateByUrl("/customer");
      alert(res.message)
      }
      else alert(res.message)
    } else {
      alert(res)
    }
    })
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
