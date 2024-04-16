import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  onSearchClick(): void {
    window.location.href = "/products";
  }
  signupObj: Signup;
  constructor(private http: HttpClient,private router: Router) {
    this.signupObj = new Signup();
}
  

  // Gửi yêu cầu đăng ký đến NestJS
 
  onSigup() {
   // debugger
    this.http.post('http://localhost:3000/user/signup', this.signupObj).subscribe((res:any)=>{
      if(res) {
        console.log(res);
        if(res.status == 200) {
        this.router.navigateByUrl("/newcustomer");
        alert(res.message)
        }
        else alert(res.message)
      } else {
        alert(res)
      }
      })
    }
  }


export class Signup {
  email: string;
  password:string ;
  name:string;
  address:string;
  phone:string;
  province:string;
  constructor() {
    this.name =  "";
    this.email= "";
    this.password= "";
    this.address="";
    this.phone="";
    this.province="";
  }
}