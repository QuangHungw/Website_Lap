import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrderdetailService } from './orderdetail.service';
import { Order, User } from './orderdetail.module';

@Component({
  selector: 'app-orderdetail',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './orderdetail.component.html',
  styleUrl: './orderdetail.component.scss'
})
export class OrderdetailComponent {
  orders: Order[] = [];
  users: User[] = [];

  constructor(private orderService: OrderdetailService,private route: ActivatedRoute) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.route.paramMap.subscribe(params => {
        const orderid = params.get('id');
        if (orderid) {
    this.orderService.getOrderById(orderid).subscribe((data: Order) => {
      this.orders = this.orders?.concat(data);
    
      console.log(data)
      this.orderService.getUserById(data.user_id).subscribe((user: User) => {
        if (user) { // Kiểm tra xem role có tồn tại hay không
          this.users = this.users.concat(user)
          console.log(user);
        }
        
      });
    
    });
  }
  });
  }
}

  formatPrice(price: number): string {
    return price.toLocaleString('vi-VN'); // Format with Vietnamese locale
  }
}
