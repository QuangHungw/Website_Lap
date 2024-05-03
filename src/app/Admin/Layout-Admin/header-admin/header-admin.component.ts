import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from './header-admin.module';
import { HeaderAdminService } from './header-admin.service';

@Component({
  selector: 'app-header-admin',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './header-admin.component.html',
  styleUrl: './header-admin.component.scss'
})
export class HeaderAdminComponent {
  token?: string | null;
  users: User| undefined;
  constructor(private userService: HeaderAdminService, private router: Router) {}
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
            this.users = data;
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


  logout(): void {
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
  }
}


