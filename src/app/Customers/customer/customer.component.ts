import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIf ,NgFor} from '@angular/common';
import { User } from './customer.module';
import { CustomerService } from './customer.service';
@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [RouterLink, NgIf,NgFor],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent implements OnInit{
  token?: string | null;
  users?: User[] = [];
  constructor(private userService: CustomerService,private router: Router) {}
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      
      this.token = localStorage.getItem('accessToken');
     // console.log('token', this.token);
      
      if(localStorage.getItem('accessToken')) {
      
      this.userService.getUser(this.token).subscribe((data: User) => {
        //console.log(data);
        this.users = this.users?.concat(data);
        // if(data.role_id == 0) 
        //   { 
        //     this.router.navigateByUrl('/admin');
        //   }

      });
    }
      
  }
  }






}


