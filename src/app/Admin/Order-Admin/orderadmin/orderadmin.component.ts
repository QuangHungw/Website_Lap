import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Order, User } from './orderadmin.module';
import { OrderadminService } from './orderadmin.service';


@Component({
  selector: 'app-order',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './orderadmin.component.html',
  styleUrl: './orderadmin.component.scss'
})
export class OrderadminComponent implements OnInit {
  orders: Order[] = [];
  users: User[] = [];
  constructor(private orderadminService: OrderadminService) {}
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
    this.orderadminService.getOrder().subscribe((data: Order) => {
      this.orders = this.orders?.concat(data);
      this.getNameforOrders();
    //  console.log(data)
    });
  }
}
  getNameforOrders(): void {
    this.orders.forEach(order => {
      this.orderadminService.getUserById(order.user_id).subscribe((user: User) => {
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
