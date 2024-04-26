import { Component,OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Product } from './products2.module';
import { ProductsService } from './products2.service';
import { NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'app-product2',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf],
  templateUrl: './product2.component.html',
  styleUrl: './product2.component.scss'
})
export class Product2Component implements OnInit {
  products?: Product[] = [];

  constructor(private productService: ProductsService, private router: Router) {}
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
