import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product, Category,OrderDetail } from './products.module';
import { ProductsService } from './products.service';
import { CommonModule } from '@angular/common';
import { PostComponent } from '../../Function/post/post.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, CommonModule,PostComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  categories1?: Category[] = [];
  productsByCategory: Product[] = [];
  categoryName: string | null = null;
  token?: string | null;
  orders: OrderDetail[] = [];
  currentPage: number = 1;
pageSize: number = 9;
totalPages: number = 0;
get routeSnapshot() {
  return this.route.snapshot;
}
  constructor(private productService: ProductsService, private router: Router,private route: ActivatedRoute) {}
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
    if (typeof window !== 'undefined') {
      this.productService.getCategory().subscribe((category1: Category) => {
        this.categories1= this.categories1?.concat(category1);
       // console.log(category1);
      });
    this.productService.getProduct().subscribe((data: Product) => {
      //console.log(data);
      this.products = this.products?.concat(data);
      this.totalPages = Math.ceil(this.products.length / this.pageSize);
    });
    this.route.paramMap.subscribe(params => {
    const categoryId = this.route.snapshot.paramMap.get('id');
    const product_name = this.route.snapshot.paramMap.get('name');
    const priceParam = this.route.snapshot.paramMap.get('price');
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
        if(data2.length == 0) 
          { alert("Không tìm thấy sản phẩm");
         this.router.navigateByUrl('/products'); 
          }
      });
  }
  if (priceParam) {
    const price = parseFloat(priceParam); // Chuyển đổi từ chuỗi sang số
    let minPrice: number;
    let maxPrice: number;
    
    if (price <= 10000000) {
      minPrice = 0;
      maxPrice = 10000000;
    } else if (price >= 10000001 && price <= 20000000 ) {
      minPrice = 10000001;
      maxPrice = 20000000;
    } else if (price >= 20000001 && price <= 30000000 ) {
      minPrice = 20000001;
      maxPrice = 30000000;
    } else {
      // Xử lý trường hợp khác
      minPrice = 30000001;
      maxPrice = 999999999; // Hoặc một giá trị lớn khác
    }

    this.productService.searchProductsByPrice(minPrice, maxPrice).subscribe((data5: Product[]) => {
      // Xử lý dữ liệu sau khi nhận được từ API
      this.products = data5;
      this.totalPages = Math.ceil(this.products.length / this.pageSize);
      // console.log(data5);
      // console.log(minPrice)
      // console.log(maxPrice)
      // console.log(priceParam)
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



 

