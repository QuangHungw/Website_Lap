import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product, Category } from './products.module';
import { ProductsService } from './products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  productsByCategory: Product[] = [];
  categoryName: string | null = null;
  currentPage: number = 1;
pageSize: number = 9;
totalPages: number = 0;
get routeSnapshot() {
  return this.route.snapshot;
}
  constructor(private productService: ProductsService, private router: Router,private route: ActivatedRoute) {}
  onButtonClick() {
    // Xử lý khi nhấn vào nút, ví dụ: chuyển hướng đến trang thanh toán
    this.router.navigateByUrl('/cart');
     // Thay '/checkout' bằng URL của trang thanh toán

  }
  
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
    this.productService.getProduct().subscribe((data: Product) => {
      //console.log(data);
      this.products = this.products?.concat(data);
      this.totalPages = Math.ceil(this.products.length / this.pageSize);
    });
    this.route.paramMap.subscribe(params => {
    const categoryId = this.route.snapshot.paramMap.get('id');
    const product_name = this.route.snapshot.paramMap.get('name');
    if (categoryId) {
      this.productService.getCategoryById(categoryId).subscribe((category: Category) => {
        this.categories.push(category);
        const categoryId1  = category.id;
        this.categoryName = category.category_name;
        this.productService.searchProductsByCategoryId(categoryId1).subscribe((data1: Product[]) => {
          this.products = data1;
          this.totalPages = Math.ceil(this.products.length / this.pageSize); 
          
          //console.log(this.products)
        });
       // console.log(category)
      });
    }
    if (product_name ) {
       const name = product_name
      this.productService.searchProductsByName(name).subscribe((data2: Product[]) => {
        this.products = data2;
        this.totalPages = Math.ceil(this.products.length / this.pageSize); 
        
       // console.log(this.products)
      });
     // console.log(category)
 
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
