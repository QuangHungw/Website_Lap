import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Category, Product, OrderDetail } from './product-detail.module';
import { ProductDetailService } from './product-detail.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PostComponent } from '../../Function/post/post.component';
import { NotificationComponent } from '../../Home page/notification/notification.component';
import { NotificationService } from '../../Home page/notification/notification.service';
import { CartService } from '../../Function/cart/cart.service';
import { HeaderService } from '../../Layout/header/header.service';
@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    PostComponent,
    HttpClientModule,
    NotificationComponent,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {
  products1: Product[] = [];
  categories: Category[] = [];
  categories1?: Category[] = [];
  orders: OrderDetail[] = [];
  products: Product | undefined;
  token?: string | null;
  editObj: Edit;
  randomProducts: Product[] = [];
  constructor(
    private cartService: CartService,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private productService: ProductDetailService,
    private userService: HeaderService
  ) {
    this.editObj = new Edit();
  }
  onButtonClick(productId: number, price: number): void {
    this.token = localStorage.getItem('accessToken');
    if (this.token) {
      const quantity = 1;
      this.productService
        .postOrderdetail(this.token, price, productId, quantity)
        .subscribe({
          next: (data1: OrderDetail) => {
            this.orders.push(data1);
            console.log(data1);
            this.userService
              .getOrderDetail(this.token)
              .subscribe((ordertail: OrderDetail[]) => {
                // console.log(ordertail);
                this.cartService.updateOrderDetails(ordertail);
              });
            this.cartService.updateOrderDetails(this.orders);
            this.notificationService.show('Đã thêm sản phẩm vào giỏ hàng');
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }

  onButton1Click(productId1: number, price1: number) {
    this.token = localStorage.getItem('accessToken');
    if (this.token) {
      this.productService
        .postOrderdetail(this.token, price1, productId1, this.editObj.quantity)
        .subscribe({
          next: (data1: OrderDetail) => {
            this.orders.push(data1);
            console.log(data1);
            this.userService
              .getOrderDetail(this.token)
              .subscribe((ordertail: OrderDetail[]) => {
                // console.log(ordertail);
                this.cartService.updateOrderDetails(ordertail);
              });
            this.cartService.updateOrderDetails(this.orders);
            this.notificationService.show('Đã thêm sản phẩm vào giỏ hàng');
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }
  ngOnInit(): void {
    this.productService.getProduct().subscribe((product: Product[]) => {
      this.products1 = product;
      this.refreshRandomProducts();
      // console.log(product)
    });
    this.productService.getCategory().subscribe((category1: Category) => {
      this.categories1 = this.categories1?.concat(category1);
      // console.log(category123);
    });
    this.route.params.subscribe((params) => {
      const productId = params['id'];
      this.getProductDetail(productId);
    });
  }
   refreshRandomProducts() {
    this.randomProducts = this.shuffleArray(this.products1).slice(0, 4);
  }
  shuffleArray(products: Product[]): Product[] {
    for (let i = products.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [products[i], products[j]] = [products[j], products[i]];
    }
    return products;
  }
  getProductDetail(productId: string): void {
    // Xóa dữ liệu của sản phẩm hiện tại
    this.products = undefined;
    this.categories = [];

    this.productService.getProductById(productId).subscribe({
      next: (data: Product) => {
          this.products = data;
  
          const categoryId = data.category_id.toString();
          this.productService.getCategoryById(categoryId).subscribe({
            next:  (category: Category) => {
              this.categories.push(category);
              // console.log(category123);
            },
           error: (error) => {
              console.error('Error:', error);
            }
          }
          );
        },
        error :  (error) => {
            console.error('Error:', error);
          }
      }
      
      
    );
  }

  formatPrice(price: number): string {
    return price.toLocaleString('vi-VN'); // Format with Vietnamese locale
  }
}
export class Edit {
  quantity: number;
  constructor() {
    this.quantity = 1;
  }
}
