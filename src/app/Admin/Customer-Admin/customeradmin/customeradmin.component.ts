import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomeradminService } from './customeradmin.service';
import { User,Role } from './customeradmin.module';


@Component({
  selector: 'app-customeradmin',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './customeradmin.component.html',
  styleUrl: './customeradmin.component.scss',
})
export class CustomeradminComponent implements OnInit {
  users: User[] = [];
  role: Role[] = [];
  currentPage: number = 1;
  pageSize: number = 9;
  totalPages: number = 0;
  constructor(private customeradminService: CustomeradminService) {}

  ngOnInit(): void {
    this.customeradminService.getUser().subscribe((data: User) => {
      this.users = this.users?.concat(data);
      this.totalPages = Math.ceil(this.users.length / this.pageSize);
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
  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }
  getPaginatedUsers(): User[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.users.length);
    return this.users.slice(startIndex, endIndex);
  }
  setCurrentPage(page: number) {
  this.currentPage = page;
  }
}
