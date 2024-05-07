import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Category, Product } from './productadmin.module';
import { ProductadminService } from './productadmin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productadmin',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './productadmin.component.html',
  styleUrl: './productadmin.component.scss',
})
export class ProductadminComponent implements OnInit{
  products: Product[] = [];
  categorys: Category[] = [];
  currentPage: number = 1;
  pageSize: number = 9;
  totalPages: number = 0;
  constructor(private productadminService: ProductadminService) {}
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
    this.productadminService.getProduct().subscribe((data: Product) => {
      this.products = this.products?.concat(data);
      this.getCategoryNamesForProducts();
      this.totalPages = Math.ceil(this.products.length / this.pageSize);
      //console.log(data)
    });
    
  }
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
