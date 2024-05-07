import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { User } from './header-admin.module';
import { HeaderAdminService } from './header-admin.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header-admin',
  standalone: true,
  imports: [CommonModule, RouterLink,FormsModule],
  templateUrl: './header-admin.component.html',
  styleUrl: './header-admin.component.scss'
})
export class HeaderAdminComponent implements OnInit {
  token?: string | null;
  users?: User[] = [];
  constructor(private userService: HeaderAdminService, private router: Router) { this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      if (event.url === '/useradmin') {
        this.loadUserInfo(); // Gọi hàm để cập nhật thông tin người dùng
      }
    }
  });}
  dropdownVisible = false;
  toggleDropdown(event: any): void {
    event.preventDefault();
    this.dropdownVisible = !this.dropdownVisible;
  }
  ngOnInit(): void {
   
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('accessToken');
      console.log('token', this.token);
      if (localStorage.getItem('accessToken')) {
        this.userService.getUser(this.token).subscribe(
        (data: User) => {
         console.log(data)
         this.users = this.users?.concat(data);

          },
          (error) => {
            if (error.status === 401 ) { // Xử lý lỗi token hết hạn
              console.log('Token expired or invalid');
              localStorage.removeItem('accessToken');
              window.location.href = '/login'; // Xóa token hết hạn từ localStorage
              // Redirect user to login page or display error message
            }
            
          }
      );
      }
    }
  }

  loadUserInfo() {
    if (typeof window !== 'undefined') {
    this.token = localStorage.getItem('accessToken');
    this.userService.getUser(this.token).subscribe((data: User) => {
      this.users = [data]; // Cập nhật thông tin người dùng
    });
    }
  }
  logout(): void {
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
  }
}


