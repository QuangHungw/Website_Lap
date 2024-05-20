import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Category, Product,OrderDetail } from './product-detail.module';
import { ProductDetailService } from './product-detail.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink, CommonModule,FormsModule,HttpClientModule ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit{
  products1?: Product[] = [];
  categories: Category[] = [];
  categories1?: Category[] = [];
  order: OrderDetail[] = [];
  products: Product | undefined;
  token?: string | null;
  editObj: Edit;
  constructor(private router: Router,private route: ActivatedRoute,
    private productService: ProductDetailService,
  ) {this. editObj = new Edit();}
  onButtonClick(productId: number, price: number): void {
    this.token = localStorage.getItem('accessToken');
    if (this.token) {
      const quantity = 1;
      this.productService.postOrderdetail(this.token, price, productId, quantity).subscribe(
        (data1: OrderDetail) => {
          this.order.push(data1);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  oncheckoutClick(productId1: number , price1: number){
   
    this.token = localStorage.getItem('accessToken');
    if (this.token) {
    
      this.productService.postOrderdetail(this.token, price1, productId1,this.editObj.quantity).subscribe(
        (data1: OrderDetail) => {
          this.order.push(data1);
          this.router.navigateByUrl('/checkout'); 
        },
        (error) => {
          console.log(error);
        }
      );
    }
 
  
  }
  onButton1Click(productId1: number , price1: number){
    this.token = localStorage.getItem('accessToken');
    if (this.token) {
    
      this.productService.postOrderdetail(this.token, price1, productId1,this.editObj.quantity).subscribe(
        (data1: OrderDetail) => {
          this.order.push(data1);
        },
        (error) => {
          console.log(error);
        }
      );
    }
 
  }
  ngOnInit(): void {
    this.productService.getProduct().subscribe((product: Product) => {    
        this.products1 = this.products1?.concat(product);
       // console.log(product)
    });
    this.productService.getCategory().subscribe((category1: Category) => {
        this.categories1= this.categories1?.concat(category1);
       // console.log(category123);
      });
    this.route.params.subscribe(params => {
      const productId = params['id'];
      this.getProductDetail(productId);
    });
  }
  getProductDetail(productId: string): void {
    // Xóa dữ liệu của sản phẩm hiện tại
    this.products = undefined;
    this.categories = [];

    this.productService.getProductById(productId).subscribe(
      (data: Product) => {
        this.products = data;
        
        const categoryId = data.category_id.toString();
        this.productService.getCategoryById(categoryId).subscribe(
          (category: Category) => {
            this.categories.push(category);
           // console.log(category123);
          },
          error => {
            console.error('Error:', error);
          }
        );
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  formatPrice(price: number): string {
    return price.toLocaleString('vi-VN'); // Format with Vietnamese locale
  }

}
export class Edit {
  quantity : number;
  constructor() {
    this.quantity = 1;
  }
}

