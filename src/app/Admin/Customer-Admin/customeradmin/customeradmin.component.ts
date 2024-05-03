import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomeradminService } from './customeradmin.service';
import { User,Role } from './customeradmin.module';

@Component({
  selector: 'app-customeradmin',
  standalone: true,
  imports: [RouterLink, NgFor],
  templateUrl: './customeradmin.component.html',
  styleUrl: './customeradmin.component.scss',
})
export class CustomeradminComponent implements OnInit {
  users: User[] = [];
  role: Role[] = [];
  constructor(private customeradminService: CustomeradminService) {}

  ngOnInit(): void {
    this.customeradminService.getUser().subscribe((data: User) => {
      this.users = this.users?.concat(data);
      this.getRoleNamesForUsers();
     // console.log(this.users)
    });
  }
  getRoleNamesForUsers(): void {
    this.users.forEach(user => {
      this.customeradminService.getRoleById(user.role_id).subscribe((role: Role) => {
        if (role) { // Kiểm tra xem role có tồn tại hay không
          user.role_name = role.role_name;
        }
       // console.log(role.role_name);
      });
    });
  }
}
