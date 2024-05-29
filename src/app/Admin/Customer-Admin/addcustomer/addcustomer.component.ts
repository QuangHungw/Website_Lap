import { CommonModule } from '@angular/common';
import { HttpClientModule ,HttpClient} from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink ,Router} from '@angular/router';

@Component({
  selector: 'app-addcustomer',
  standalone: true,
  imports: [RouterLink,FormsModule,HttpClientModule,CommonModule],
  templateUrl: './addcustomer.component.html',
  styleUrl: './addcustomer.component.scss'
})
export class AddcustomerComponent {
  addadminObj: Addadmin;
  errorMessage: string = ''; 
  constructor(private http: HttpClient,private router:Router) {
    this.addadminObj = new Addadmin();
}
onAddadmin() {

  // Assuming this.signupObj contains the registration data
  this.http.post<any>('http://localhost:3000/auth/admin-register', this.addadminObj).subscribe(
      {next: (res) => {
        if (res) {
            console.log(res);
            // Optionally, you can redirect the user to the login page after successful signup
            //window.location.href = "/customeradmin"
            this.router.navigateByUrl('/customeradmin');
            alert("Add admin successful");
        } else {
            alert("Add admin failed");
        }
    },
    error:(error) => {
      this.errorMessage=(error.error.message);
        //console.error('Error:', error.error.message);
       
        
    }}
  );
}
}
  export class Addadmin {
    email: string;
    password:string ;
    name:string;
    address:string;
    phone:string;
    province:string;
  
    create_at: Date;
    constructor() {
      this.name =  "";
      this.email= "";
      this.password= "";
      this.address="";
      this.phone="";
      this.province="";
    
      this.create_at= new Date();
  
    }
  }

