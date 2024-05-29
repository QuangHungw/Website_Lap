import { Component, OnInit } from '@angular/core';
import { Order,Product } from './orderconfirm.module';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PostComponent } from '../post/post.component';
import { OrderconfirmService } from './orderconfirm.service';

@Component({
  selector: 'app-orderconfirm',
  standalone: true,
  imports: [RouterLink,CommonModule,HttpClientModule,FormsModule,PostComponent],
  templateUrl: './orderconfirm.component.html',
  styleUrl: './orderconfirm.component.scss'
})
export class OrderconfirmComponent implements OnInit {
  products?: Product[] = [];
  orders: Order[] = [];
  token?: string | null ;
  totalSum: number = 0;
  unit?: string | null;
  constructor(private router: Router,private orderconfirmService : OrderconfirmService) {}
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
    
    this.token = localStorage.getItem('accessToken');
    if(this.token == null) { this.router.navigateByUrl("/login")}
    if (this.token) {
  this.orderconfirmService.getOrder(this.token).subscribe(
    (data : Order) => {
      this.orders = this.orders.concat(data);
  
      
     // console.log(this.orders)
     
      
     }
   
  );
  }
    }
  
  }




  formatPrice(price: number): string {
    return price.toLocaleString('vi-VN'); // Format with Vietnamese locale
  }


}

