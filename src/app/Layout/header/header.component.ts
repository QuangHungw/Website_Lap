import { Component, OnInit } from '@angular/core';
import { Router,RouterLink , NavigationEnd } from '@angular/router';
import { CommonModule} from '@angular/common';
import { User,Category } from './header.module';
import { HeaderService } from './header.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule,FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  
  token?: string | null;
  users?: User[] = [];
  categories?: Category[] = []
  showProfile: boolean = false;
  searchContent: string = '';
  toggleProfile() {
    this.showProfile = !this.showProfile;
  }
  
  constructor(private userService: HeaderService, private router: Router) { this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      if (event.url === '/customer') {
        this.loadUserInfo(); // Gọi hàm để cập nhật thông tin người dùng
      }
    }
  });}
  onSearchClick(): void {
    if (this.searchContent.trim() !== '') {
      // Chuyển hướng đến trang sản phẩm với nội dung tìm kiếm được thêm vào URL
      this.router.navigateByUrl(`/products/search/${this.searchContent}`);
    } else {
      // Nếu không có nội dung tìm kiếm, chỉ chuyển hướng đến trang sản phẩm
      this.router.navigateByUrl('/products');
    }
    console.log(this.searchContent);
  }
  ngOnInit(): void {
  
    if (typeof window !== 'undefined') {
      this.userService.getCategory().subscribe((category: Category) => {
        //console.log(category);
  
        this.categories = this.categories?.concat(category);
      });
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
  loadUserInfo() {
    this.userService.getUser(this.token).subscribe((data: User) => {
      this.users = [data]; // Cập nhật thông tin người dùng
    });
  }


  logout(): void {
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
  }
}
