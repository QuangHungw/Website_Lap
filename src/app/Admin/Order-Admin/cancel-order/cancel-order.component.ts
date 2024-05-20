import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Order, User } from './cancel-order.module';
import { CancelOrderService } from './cancel-order.service';

@Component({
  selector: 'app-cancel-order',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './cancel-order.component.html',
  styleUrl: './cancel-order.component.scss'
})
export class CancelOrderComponent {
  orders: Order[] = [];
  users: User[] = [];
  constructor(private cancelorderService: CancelOrderService) {}
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
    this.cancelorderService.getOrder().subscribe((data: Order) => {
      this.orders = this.orders?.concat(data);
      this.getNameforOrders();
    //  console.log(data)
    });
  }
}
  getNameforOrders(): void {
    this.orders.forEach(order => {
      this.cancelorderService.getUserById(order.user_id).subscribe((user: User) => {
        if (user) { // Kiểm tra xem role có tồn tại hay không
          order.name = user.name;
        }
       // console.log(role.role_name);
      });
    });
  }

  
  formatPrice(price: number): string {
    return price.toLocaleString('vi-VN'); // Format with Vietnamese locale
  }
}
