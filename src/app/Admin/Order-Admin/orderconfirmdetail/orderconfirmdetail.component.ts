import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { OrderconfirmdetailService } from './orderconfirmdetail.service';
import { Order, OrderDetail, Product, User } from './orderconfirmdetail.module';
@Component({
  selector: 'app-orderconfirmdetail',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './orderconfirmdetail.component.html',
  styleUrl: './orderconfirmdetail.component.scss'
})
export class OrderconfirmdetailComponent implements OnInit{
  orders: Order[] = [];
  orderdetails: OrderDetail[] = [];
  products?: Product[] = [];
  users: User[] = [];
  totalSum: number = 0;
  unit?: string | null;
  constructor(private orderService: OrderconfirmdetailService,private route: ActivatedRoute,private router: Router) {}
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.route.paramMap.subscribe(params => {
        const orderid = params.get('id');
        if (orderid) {
    this.orderService.getOrderById(orderid).subscribe((data: Order) => {
      this.orders = this.orders?.concat(data);
     this.orderService.getOrderDetailById(orderid).subscribe((orderdetail: OrderDetail) => {
      this.orderdetails = this.orderdetails?.concat(orderdetail)
     // console.log(orderdetail)
      this.fetchProductsForOrders();
     })

      console.log(data)
      this.orderService.getUserById(data.user_id).subscribe((user: User) => {
        if (user) { 
          this.users = this.users.concat(user)
        //  console.log(user);
        }
        
      });
    
    });
  }
  });
  }
  
}
fetchProductsForOrders(): void {
  this.totalSum = 0;
  this.products = [];
  this.orderdetails.forEach((orderdetail) => {
    this.orderService.getProductById(orderdetail.product_id.toString()).subscribe(
    {next :   (product: Product) => {
      const total = product.price* orderdetail.quantity
      orderdetail.total = total
      this.products?.push(product);
     // console.log(product)
      this.totalSum += total
      this.unit = product.unit.toString();
    },
    error:(error) => {
      console.error('Error fetching product for order:', error);
    }}
    );
  });
}







  formatPrice(price: number): string {
    return price.toLocaleString('vi-VN'); // Format with Vietnamese locale
  }
}

