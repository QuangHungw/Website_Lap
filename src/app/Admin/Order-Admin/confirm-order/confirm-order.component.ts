import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Order, User } from './confirm-order.module';
import { ConfirmOrderService } from './confirm-order.service';

@Component({
  selector: 'app-confirm-order',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './confirm-order.component.html',
  styleUrl: './confirm-order.component.scss'
})
export class ConfirmOrderComponent {
  orders: Order[] = [];
  users: User[] = [];
  constructor(private confirmorderService: ConfirmOrderService){}
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
    this.confirmorderService.getOrder().subscribe((data: Order) => {
      this.orders = this.orders?.concat(data);
      this.getNameforOrders();
    //  console.log(data)
    });
  }
}
  getNameforOrders(): void {
    this.orders.forEach(order => {
      this.confirmorderService.getUserById(order.user_id).subscribe((user: User) => {
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
