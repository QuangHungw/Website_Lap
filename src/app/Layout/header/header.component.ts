import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User, Category, Order, OrderDetail, Product } from './header.module';
import { HeaderService } from './header.service';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../Function/cart/cart.service';
import { log } from 'node:console';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  products?: Product[] = [];
  orderdetails: OrderDetail[] = [];
  totalSum: number = 0;
  unit?: string | null;
  showCart: boolean = false;

  token?: string | null;
  users?: User[] = [];
  orders: Order[] = [];
  categories?: Category[] = [];
  filteredCategories: Category[] = [];
  filteredCategories1: Category[] = [];
  filteredCategories2: Category[] = [];
  filteredCategories3: Category[] = [];
  showProfile: boolean = false;
  searchContent: string = '';
  name?: string | null;
  photo?: string | null;

  constructor(
    private userService: HeaderService,
    private router: Router,
    private cartService: CartService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/customer') {
          this.loadUserInfo(); // Gọi hàm để cập nhật thông tin người dùng
        }
      }
    });
  }
  toggleProfile() {
    this.showProfile = !this.showProfile;
  }
  onSearchClick(): void {
    if (this.searchContent.trim() !== '') {
      this.router.navigateByUrl(`/products/search/${this.searchContent}`);
    } else {
      this.router.navigateByUrl('/products');
    }
  }
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.loadCategories('Laptop', this.filteredCategories);
      this.loadCategories('PC', this.filteredCategories1);
      this.loadCategories('Bàn phím', this.filteredCategories2);
      this.loadCategories('Chuột', this.filteredCategories3);
      this.token = localStorage.getItem('accessToken');
      console.log('token', this.token);

      if (this.token) {
        // this.fetchProductsForOrders();

        this.userService.getOrderDetail(this.token).subscribe({
          next: (ordertail: OrderDetail[]) => {
            this.orderdetails = this.orderdetails.concat(ordertail);

            // console.log(ordertail);
            this.cartService.updateOrderDetails(ordertail);
   
            this.cartService.orderDetails$.subscribe(
              (orderdetails: OrderDetail[]) => {
                
              //  console.log(orderdetails);
                    this.totalSum = 0;
                    this.products= [];
                   
                    this.orderdetails = orderdetails;
                    const getProductObservables = orderdetails.map(orderDetail =>
                      this.cartService.getProductById(orderDetail.product_id.toString())
                    );
                    
                    for (let i = 0; i < orderdetails.length; i++) {
                      this.totalSum +=
                        orderdetails[i].price * orderdetails[i].quantity;
                    }
                    forkJoin(getProductObservables).subscribe(
                      (products: Product[]) => {
                      //console.log(products);
                        for (let j = 0; j < 1; j++) {
                          if(orderdetails[j].product_id === products[j].id){
                        this.products = products;
                      
                           console.log(this.products);
                          }
                        }
                      })
                    //  console.log(this.totalSum);
                  }
                );
            
          },
          error: (error) => {
            console.log(error);
          },
        });

        this.userService.getUser(this.token).subscribe(
          (data: User) => {
            this.users = this.users?.concat(data);
          },
          (error) => {
            if (error.status === 401) {
              console.log('Token expired or invalid');
              localStorage.removeItem('accessToken');
              window.location.href = '/login'; // Xóa token hết hạn từ localStorage
            }
          }
        );
        this.userService.postOrder(this.token).subscribe({
          next: (data1: Order) => {
            this.orders = this.orders?.concat(data1);
          },
          error: (error) => {
            //alert(error)
            console.log(error);
          },
        });
      }
    }
  }
  loadCategories(type: string, categoryArray: Category[]): void {
    this.userService.postType(type).subscribe((categories: Category[]) => {
      categoryArray.splice(0, categoryArray.length, ...categories);
    });
  }
  loadUserInfo() {
    this.userService.getUser(this.token).subscribe((data: User) => {
      this.users = [data]; // Cập nhật thông tin người dùng
    });
  }

  showCartDetails(show: boolean): void {
    this.showCart = show;
  }
  logout(): void {
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
  }
  deleteOrderDetail(orderId: number) {
    if (this.token) {
      this.cartService
        .deleteOrderDetail(this.token, orderId.toString())
        .subscribe({
          next: () => {
            this.orderdetails = this.orderdetails.filter(
              (order) => order.id !== orderId
            );
            this.cartService.updateOrderDetails(this.orderdetails); // Cập nhật lại giỏ hàng
          },
          error: (error) => {
            console.error('Lỗi khi xóa chi tiết đơn hàng:', error);
          },
        });
    }
  }
  updateOrderDetail(orderId: number, quantity: number) {
    if (this.token) {
      this.cartService
        .updateOrderDetail(this.token, orderId, quantity)
        .subscribe({
          next: (updatedOrder: OrderDetail) => {
            const index = this.orderdetails.findIndex(
              (order) => order.id === updatedOrder.id
            );
            if (index !== -1) {
              this.orderdetails[index] = updatedOrder;
              this.cartService.updateOrderDetails(this.orderdetails); // Cập nhật lại giỏ hàng
            }
          },
          error: (error) => {
            console.error('Lỗi khi cập nhật chi tiết đơn hàng:', error);
          },
        });
    }
  }
  formatPrice(price: number): string {
    return price.toLocaleString('vi-VN'); // Format with Vietnamese locale
  }
}
