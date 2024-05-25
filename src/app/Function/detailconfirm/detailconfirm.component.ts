import { Component, OnInit } from '@angular/core';
import { Order ,OrderDetail,Product} from './detailconfirm.module';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PostComponent } from '../post/post.component';
import { DetailconfirmService } from './detailconfirm.service';

@Component({
  selector: 'app-detailconfirm',
  standalone: true,
  imports: [RouterLink,CommonModule,PostComponent],
  templateUrl: './detailconfirm.component.html',
  styleUrl: './detailconfirm.component.scss'
})
export class DetailconfirmComponent implements OnInit{
  orders: Order[] = [];
  orderdetails: OrderDetail[] = [];
  products?: Product[] = [];
  totalSum: number = 0;
  unit?: string | null;
  constructor(private orderService: DetailconfirmService,private route: ActivatedRoute,private router: Router) {}
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.route.paramMap.subscribe(params => {
        const orderid = params.get('id');
        if (orderid) {
    this.orderService.getOrderById(orderid).subscribe((data: Order) => {
      this.orders = this.orders?.concat(data);
     this.orderService.getOrderDetailById(orderid).subscribe((orderdetail: OrderDetail) => {
      this.orderdetails = this.orderdetails?.concat(orderdetail)
   //   console.log(orderdetail)
      this.fetchProductsForOrders();
     })
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
      (product: Product) => {
        const total = product.price* orderdetail.quantity
        orderdetail.total = total
        this.products?.push(product);
       // console.log(product)
        this.totalSum += total
        this.unit = product.unit.toString();
      },
   
    );
  });
}
  formatPrice(price: number): string {
    return price.toLocaleString('vi-VN'); // Format with Vietnamese locale
  }
}
