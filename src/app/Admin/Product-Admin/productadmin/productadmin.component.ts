import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Category, Product } from './productadmin.module';
import { ProductadminService } from './productadmin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productadmin',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './productadmin.component.html',
  styleUrl: './productadmin.component.scss',
})
export class ProductadminComponent implements OnInit{
  products: Product[] = [];
  categorys: Category[] = [];
  searchContent: string = '';
  currentPage: number = 1;
  pageSize: number = 9;
  totalPages: number = 0;
  constructor(private productadminService: ProductadminService, private router: Router,private route: ActivatedRoute) {}
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
    this.productadminService.getProduct().subscribe((data: Product) => {
      this.products = this.products?.concat(data);
      this.getCategoryNamesForProducts();
      this.totalPages = Math.ceil(this.products.length / this.pageSize);
      //console.log(data)
    });
    
  }
  this.route.paramMap.subscribe(params => {
    const product_name = this.route.snapshot.paramMap.get('name');
    if (product_name ) {
      const name = product_name
     this.productadminService.searchProductsByName(name).subscribe((data2: Product[]) => {
       this.products = data2;
       //console.log(data2)
       this.totalPages = Math.ceil(this.products.length / this.pageSize); 
       if(data2.length == 0) 
        { alert("Không tìm thấy sản phẩm");
       this.router.navigateByUrl('/productadmin');
          
        }
     });
 }
  });
}
onSearchClick(): void {
  if (this.searchContent.trim() !== '') {
    // Chuyển hướng đến trang sản phẩm với nội dung tìm kiếm được thêm vào URL
    this.router.navigateByUrl(`/productadmin/search/${this.searchContent}`);
  } else {
    // Nếu không có nội dung tìm kiếm, chỉ chuyển hướng đến trang sản phẩm
    this.router.navigateByUrl('/productadmin');
  
  }
  console.log(this.searchContent);
}
getCategoryNamesForProducts(): void {
  this.products.forEach(product => {
    this.productadminService.getCategoryById(product.category_id).subscribe((category: Category) => {
      if (category) { // Kiểm tra xem role có tồn tại hay không
        product.category_name = category.category_name;
      }
     // console.log(category.id);
    });
  });
}
  formatPrice(price: number): string {
    return price.toLocaleString('vi-VN'); // Format with Vietnamese locale
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



}
