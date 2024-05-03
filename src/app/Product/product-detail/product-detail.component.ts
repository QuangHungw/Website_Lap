import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Category, Product } from './product-detail.module';
import { ProductDetailService } from './product-detail.service';
import { NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit{
  products1?: Product[] = [];
  categories: Category[] = [];
  products: Product | undefined;
  constructor(private router: Router,private route: ActivatedRoute,
    private productService: ProductDetailService,
  ) {}
  onButtonClick() {
    this.router.navigateByUrl('/cart');   
  }
  oncheckoutClick(){
    this.router.navigateByUrl('/checkout'); 
  }
  ngOnInit(): void {
    this.productService.getProduct().subscribe((product: Product) => {    
        this.products1 = this.products1?.concat(product);
       // console.log(product)
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

