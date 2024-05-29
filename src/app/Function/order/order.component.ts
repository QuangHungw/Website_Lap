import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PostComponent } from '../post/post.component';
import { Order, Product } from './order.module';

import { OrderService } from './order.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    HttpClientModule,
    FormsModule,
    PostComponent,
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent implements OnInit {
  products?: Product[] = [];
  orders: Order[] = [];
  token?: string | null;
  totalSum: number = 0;
  unit?: string | null;

  constructor(private router: Router, private orderService: OrderService) {}
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('accessToken');
      if (this.token == null) {
        this.router.navigateByUrl('/login');
      }
      if (this.token) {
        this.orderService.getOrder(this.token).subscribe((data: Order) => {
          this.orders = this.orders.concat(data);
        });
      }
    }
  }

  formatPrice(price: number): string {
    return price.toLocaleString('vi-VN'); // Format with Vietnamese locale
  }
}
