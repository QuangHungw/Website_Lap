import { Router, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Product ,OrderDetail} from './web-lap.module';
import { WebLapService } from './web-lap.service';
import { CommonModule } from '@angular/common';
import { PostComponent } from '../../Function/post/post.component';


@Component({
  selector: 'app-web-lap',
  standalone: true,
  imports: [RouterLink, CommonModule,PostComponent],
  templateUrl: './web-lap.component.html',
  styleUrl: './web-lap.component.scss',

})
export class WebLapComponent implements OnInit{
  products?: Product[] = [];

  token?: string | null;
  orders: OrderDetail[] = [];
  
  currentImage: string = '';
  currentIndex: number = 0;
  intervalId: any;
  
 
  constructor(private productService: WebLapService, private router: Router) {}
  onButtonClick(productId: number, price: number): void {
    this.token = localStorage.getItem('accessToken');
    if (this.token) {
      const quantity = 1;
      this.productService.postOrderdetail(this.token, price, productId, quantity).subscribe(
        (data1: OrderDetail) => {
          this.orders.push(data1);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  ngOnInit(): void {
    this.productService.getProduct().subscribe((data: Product) => {
      //console.log(data);
      this.products = this.products?.concat(data);
     // console.log(data)
    
    });
    
   
  }

  

 


  formatPrice(price: number): string {
    return price.toLocaleString('vi-VN'); // Format with Vietnamese locale
  }
}
