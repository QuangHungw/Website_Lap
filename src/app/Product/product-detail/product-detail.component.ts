import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
export class ProductDetailComponent {
  products: Product[] = [];
  categories: Category[] = [];
  constructor(private route: ActivatedRoute,
    private productService: ProductDetailService,
    
  ) {}

  ngOnInit(): void {
    const Id = this.route.snapshot.paramMap.get('id');
    if (Id) {
      this.productService.getProductById(Id).subscribe((data: Product) => {
        this.products.push(data);
        if (this.products.length > 0) {
          const categoryId = this.products[0].category_id.toString();
          this.productService.getCategoryById(categoryId).subscribe((category: Category) => {
            this.categories.push(category);
            //console.log(category);
            //console.log(data);
          });
        }
      });
    }
  }

  formatPrice(price: number): string {
    return price.toLocaleString('vi-VN'); // Format with Vietnamese locale
  }

}

