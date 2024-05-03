import { Component, OnInit } from '@angular/core';
import { Router,RouterLink } from '@angular/router';
import { NgIf ,NgFor} from '@angular/common';
import { User,Category } from './header.module';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf,NgFor],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  
  token?: string | null;
  users?: User[] = [];
  categories?: Category[] = []
  
  constructor(private userService: HeaderService, private router: Router) {}
  onSearchClick(): void {
    this.router.navigateByUrl('/products');
  }
  ngOnInit(): void {
    this.userService.getCategory().subscribe((category: Category) => {
      //console.log(category);

      this.categories = this.categories?.concat(category);
    });
    if (typeof window !== 'undefined') {
      
      this.token = localStorage.getItem('accessToken');
      console.log('token', this.token);
      
      if (localStorage.getItem('accessToken')) {
        this.userService.getUser(this.token).subscribe(
        (data: User) => {
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


  logout(): void {
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
  }
}
