import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product, Category } from './products.module';
import { ProductsService } from './products.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  productsByCategory: Product[] = [];
  currentPage: number = 1;
pageSize: number = 9;
totalPages: number = 0;

  constructor(private productService: ProductsService, private router: Router,private route: ActivatedRoute) {}
  onButtonClick() {
    // Xử lý khi nhấn vào nút, ví dụ: chuyển hướng đến trang thanh toán
    this.router.navigateByUrl('/cart');
     // Thay '/checkout' bằng URL của trang thanh toán

  }
  ngOnInit(): void {
    
    this.productService.getProduct().subscribe((data: Product) => {
      //console.log(data);
      this.products = this.products?.concat(data);
      this.totalPages = Math.ceil(this.products.length / this.pageSize);
    });
    const categoryId = this.route.snapshot.paramMap.get('id');
    if (categoryId) {
      this.productService.getCategoryById(categoryId).subscribe((category: Category) => {
        this.categories.push(category);
        if (this.categories.length > 0) {
          const category_id = this.categories[0].id.toString();
          this.productService.getProductByCategoryId(category_id).subscribe((product: Product) => {
            this.productsByCategory.push(product);
            //console.log(category);
           // console.log(product);
          });
        }
      });
    }


  }
  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }
  getPaginatedProducts(): Product[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.products.length);
    return this.products.slice(startIndex, endIndex);
  }
  setCurrentPage(page: number) {
  this.currentPage = page;
}
  formatPrice(price: number): string {
    return price.toLocaleString('vi-VN'); // Format with Vietnamese locale
  }
}
