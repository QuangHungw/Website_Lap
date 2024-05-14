import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DeleteproductService } from './deleteproduct.service';
import { Product } from './deleteproduct.module';

@Component({
  selector: 'app-deleteproduct',
  standalone: true,
  imports: [RouterLink,CommonModule,HttpClientModule],
  templateUrl: './deleteproduct.component.html',
  styleUrl: './deleteproduct.component.scss'
})
export class DeleteproductComponent {
  products?: Product[] = [];
  constructor(private productService: DeleteproductService, private router: Router,private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      if (productId) {
        this.productService.getProductById(productId).subscribe((data: Product) => {
          this.products?.push(data);
        });
      }
    });
  }
  ondeleteProduct(event: Event): void {
    event.preventDefault();
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      if (productId) {
    this.productService.deleteProduct(productId).subscribe(
      () => {
        alert('Product deleted successfully');
         this.router.navigateByUrl('/productadmin');
     
      },
      (error) => {
        console.error('Error deleting product:', error);
      }
    );
  }
  });
  }

}
