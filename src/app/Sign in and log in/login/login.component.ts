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
   
  // debugger
  this.http.post('http://localhost:3000/auth/login', this.loginObj).subscribe((res:any)=>{
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
