import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { User } from './editcustomer.module';
import { EditCustomerService } from './editcustomer.service';
@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor],
  templateUrl: './editcustomer.component.html',
  styleUrl: './editcustomer.component.scss',
})
export class EditCustomerComponent implements OnInit {
  token?: string | null;
  users?: User[] = [];
  constructor(
    private userService: EditCustomerService,
    private router: Router
  ) {}
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('accessToken');
      console.log('token', this.token);

      if (localStorage.getItem('accessToken')) {
        this.userService.getUser(this.token).subscribe((data: User) => {
          //console.log(data);
          this.users = this.users?.concat(data);
        });
      }
    }
  }
}
