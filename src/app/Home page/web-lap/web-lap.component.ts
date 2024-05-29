import {  RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Product, OrderDetail } from './web-lap.module';
import { WebLapService } from './web-lap.service';
import { CommonModule } from '@angular/common';
import { PostComponent } from '../../Function/post/post.component';
import { NotificationService } from '../notification/notification.service';
import { NotificationComponent } from '../notification/notification.component';
import { CartService } from '../../Function/cart/cart.service';
import { HeaderService } from '../../Layout/header/header.service';

@Component({
  selector: 'app-web-lap',
  standalone: true,
  imports: [RouterLink, CommonModule, PostComponent, NotificationComponent],
  templateUrl: './web-lap.component.html',
  styleUrl: './web-lap.component.scss',
})
export class WebLapComponent implements OnInit {
  products: Product[] = [];

  token?: string | null;
  orders: OrderDetail[] = [];

  currentImage: string = '';
  currentIndex: number = 0;
  intervalId: any;
  selectedProducts: Product[] = [];

  constructor(
    private productService: WebLapService, 
    private notificationService: NotificationService,
    private cartService: CartService,
    private userService: HeaderService
  ) {}
  onButtonClick(productId: number, price: number): void {
    this.token = localStorage.getItem('accessToken');
    if (this.token) {
      const quantity = 1;
      this.productService
        .postOrderdetail(this.token, price, productId, quantity)
        .subscribe({
          next: (data1: OrderDetail) => {
              this.orders.push(data1);
              //console.log(data1)
              this.userService.getOrderDetail(this.token).subscribe(
                (ordertail: OrderDetail[]) => {
               // console.log(ordertail);
                this.cartService.updateOrderDetails(ordertail);
                })
              this.cartService.updateOrderDetails(this.orders);
              this.notificationService.show('Đã thêm sản phẩm vào giỏ hàng');
            },
            error:(error) => {
                console.log(error);
              }
        }
        
        );
    }
  }

  ngOnInit(): void {
    this.cartService.orderDetails$.subscribe((orders: OrderDetail[]) => {
      this.orders = orders;
    });
    this.productService.getProduct().subscribe((data: Product) => {
      //console.log(data);
      this.products = this.products?.concat(data);
      this.selectRandomProducts();
      // console.log(data)
    });
  }
  selectRandomProducts(): void {
    const numberOfProducts = this.products.length;
    const randomIndexes: number[] = [];
    const selectedProducts: Product[] = [];

    while (randomIndexes.length < 4) {
      const randomIndex = Math.floor(Math.random() * numberOfProducts);
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
      }
    }

    randomIndexes.forEach(index => {
      selectedProducts.push(this.products[index]);
    });

    this.selectedProducts = selectedProducts;
  }

  formatPrice(price: number): string {
    return price.toLocaleString('vi-VN'); // Format with Vietnamese locale
  }
}
