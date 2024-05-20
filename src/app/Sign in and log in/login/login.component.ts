import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './login.service';
import { User } from './login.module';
import { CommonModule } from '@angular/common';
import { PostComponent } from '../../Function/post/post.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule,CommonModule,PostComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent  {
  token?: string | null;
  users?: User[] = [];
  loginObj: Login;
  errorMessage: string = ''; 
  constructor(private http: HttpClient,private userService: LoginService, ) {
    this.loginObj = new Login();
    
}
ngOnInit(): void {
   
  if (typeof window !== 'undefined') {
    this.token = localStorage.getItem('accessToken');
 
       if(this.token) 
        { 
          window.location.href = "/login"
          localStorage.removeItem('accessToken');
        
       }
   
  }
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
            if(data.role_id == 2) 
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
     // console.log('Error:', error.error.message);
     this.errorMessage=(error.error.message);
     //alert(error.error.message);
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
