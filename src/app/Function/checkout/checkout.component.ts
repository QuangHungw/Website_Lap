import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink , Router } from '@angular/router';
import { OrderDetail, Product } from './checkout.module';
import { CheckoutService } from './checkout.service';
import { FormsModule } from '@angular/forms';
import { PostComponent } from '../post/post.component';


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterLink,CommonModule,HttpClientModule,FormsModule,PostComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  products?: Product[] = [];
  orders: OrderDetail[] = [];
  token?: string | null ;
  totalSum: number = 0;
  unit?: string | null;
  editObj: Edit;
  constructor(private router: Router,private checkoutService : CheckoutService) {this. editObj = new Edit();}
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
    
    this.token = localStorage.getItem('accessToken');
    if(this.token == null) { this.router.navigateByUrl("/login")}
    if (this.token) {
  this.checkoutService.getOrderDetail(this.token).subscribe(
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
      this.checkoutService.getProductById(order.product_id.toString()).subscribe(
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


onPayment(){
  debugger
  if(this.editObj.paymentMethod == "") { alert('Bạn chưa chọn phương thức thanh toán')} 
  if(this.editObj.paymentMethod != "") {  
  this.checkoutService.postPayment(this.token,this.editObj.paymentMethod).subscribe(
    () => {
     
      alert('Payment successfulley');
      this.router.navigateByUrl("/")
    },
    (error) => {
      console.log(error)
    }
  ) ;  
}
}
  formatPrice(price: number): string {
    return price.toLocaleString('vi-VN'); // Format with Vietnamese locale
  }


}
export class Edit {
  paymentMethod : string;
  constructor() {
    this. paymentMethod = "";
  }
}

