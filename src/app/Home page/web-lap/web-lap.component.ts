import { Router, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Product } from './web-lap.module';
import { WebLapService } from './web-lap.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-web-lap',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './web-lap.component.html',
  styleUrl: './web-lap.component.scss',
})
export class WebLapComponent implements OnInit {
  products?: Product[] = [];

  constructor(private productService: WebLapService, private router: Router) {}
  onButtonClick() {
    // Xử lý khi nhấn vào nút, ví dụ: chuyển hướng đến trang thanh toán
    this.router.navigateByUrl('/cart');
     // Thay '/checkout' bằng URL của trang thanh toán
  }

  ngOnInit(): void {
    this.productService.getProduct().subscribe((data: Product) => {
      //console.log(data);

      this.products = this.products?.concat(data);
    });
  }
  formatPrice(price: number): string {
    return price.toLocaleString('vi-VN'); // Format with Vietnamese locale
  }
}
