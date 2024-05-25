import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PostComponent } from '../../Function/post/post.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule, PostComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  errorMessage: string = '';
  signupObj: Signup;
  constructor(private http: HttpClient) {
    this.signupObj = new Signup();
  }

  // Gửi yêu cầu đăng ký đến NestJS

  onSigup() {
    // Assuming this.signupObj contains the registration data
    this.http
      .post<any>('http://localhost:3000/auth/register', this.signupObj)
      .subscribe({
        next:(res) => {
            if (res) {
              console.log(res);
              localStorage.setItem('accessToken', res.accessToken);
              // Optionally, you can redirect the user to the login page after successful signup
              window.location.href = '/customer';
              alert('Sign up successful');
            } else {
              alert('Sign up failed');
            }
          },
          error: (error) => {
              this.errorMessage = error.error.message;
            }
      }
   
      );
  }
}

export class Signup {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  address: string;
  phone: string;
  province: string;
  role_id: number;
  create_at: Date;
  constructor() {
    this.name = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.address = '';
    this.phone = '';
    this.province = '';
    this.role_id = 2;
    this.create_at = new Date();
  }
}
