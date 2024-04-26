import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { User } from './editcustomer.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EditCustomerService } from './editcustomer.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor,FormsModule, HttpClientModule],
  templateUrl: './editcustomer.component.html',
  styleUrl: './editcustomer.component.scss',
})
export class EditCustomerComponent implements OnInit {
  token?: string | null;
  users: User []= [];
  editObj: Edit;
  constructor(
    private userService: EditCustomerService,private http: HttpClient,
    private router: Router
  ) { this. editObj = new Edit();}
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('accessToken');
      console.log('token', this.token);

      if (localStorage.getItem('accessToken')) {
        this.userService.getUser(this.token).subscribe((data: User) => {
          console.log(data);
          this.users.push(data);
          this.editObj.name = this.users[0].name;
        this.editObj.phone = this.users[0].phone;
        this.editObj.address = this.users[0].address;
        this.editObj.province = this.users[0].province;
        });
      }
    }
  }
  
  onEdit() {
      // Gửi yêu cầu PUT lên server
      this.http.put<any>('http://localhost:3000/users/me', this.editObj, { headers: { Authorization: `Bearer ${this.token}` } }).subscribe(
        (res) => {
          if (res) {
            console.log(res);
           window.location.href = "/customer";
           
            alert("Edit successful");
          } else {
            alert("Edit failed");
          }
        },
        (error) => {
          console.error('Error:', error);
          alert("Edit failed");
        }
      );
    }
  }


export class Edit {
  name: string;
 phone:string; 
 address:string;
 province:string;
 constructor() {
  this.name =  "";
  this.phone="";
  this.address="";
  this.province="";
}
}
