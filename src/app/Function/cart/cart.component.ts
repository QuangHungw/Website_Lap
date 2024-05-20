import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Product,OrderDetail,Category } from './cart.module';
import { CartService } from './cart.service';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink,CommonModule,HttpClientModule,FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  products?: Product[] = [];
  orders: OrderDetail[] = [];
  categories1?: Category[] = [];
  token?: string | null ;
  totalSum: number = 0;
  unit?: string | null;
  orders1: OrderDetail[] = [];



  constructor(private router: Router,private cartService : CartService) {}
ngOnInit(): void {
  if (typeof window !== 'undefined') {
    this.cartService.getCategory().subscribe((category1: Category) => {
      this.categories1= this.categories1?.concat(category1);
     // console.log(category123);
    });
  this.token = localStorage.getItem('accessToken');
  if (this.token) {
this.cartService.getOrderDetail(this.token).subscribe(
  (data : OrderDetail) => {
    this.orders = this.orders.concat(data);

    
   // console.log(this.orders)
   
    this.fetchProductsForOrders();
   },
  (error) => {
    console.log(error);
  }
);
}
  }

}
fetchProductsForOrders(): void {
  this.totalSum = 0; // Reset total sum before recalculating
    this.products = []; // Reset products before fetching
  this.orders.forEach((order) => {
    this.cartService.getProductById(order.product_id.toString()).subscribe(
      (product: Product) => {
        const total = product.price* order.quantity
        order.total = total
        this.products?.push(product);
        this.totalSum += total
        this.unit = product.unit.toString();
       
        
       //console.log(product)
       // console.log(this.totalSum)
      },
      (error) => {
        console.error('Error fetching product for order:', error);
      }
    );
  });
}
onEditClick() {
  if (this.token) {
    const updateObservables = this.orders.map(order =>
      this.cartService.updateOrderDetail(this.token!, order.id, order.quantity)
    );

    forkJoin(updateObservables).subscribe(
      () => {
        // Re-fetch products and recalculate totals after updating orders
        this.fetchProductsForOrders();
      },
      (error) => {
        console.error('Error updating order details:', error);
      }
    );
  }
}
deleteOrderDetail(orderId: number) {
  if (this.token) {
    this.cartService.deleteOrderDetail(this.token, orderId.toString()).subscribe(
      () => {
         // Xóa thành công, cần xóa đơn hàng khỏi mảng orders
         this.orders = this.orders.filter(order => order.id !== orderId);
         // Cập nhật lại danh sách sản phẩm và tính toán tổng số
         this.fetchProductsForOrders();
      },
      (error) => {
        console.error('Lỗi khi xóa chi tiết đơn hàng:', error);
      }
    );
  }
}

formatPrice(price: number): string {
  return price.toLocaleString('vi-VN'); // Format with Vietnamese locale
}


}







