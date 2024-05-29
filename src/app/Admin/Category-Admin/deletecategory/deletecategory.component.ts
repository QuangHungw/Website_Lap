import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Category } from './deletecategory.module';
import { DeletecategoryService } from './deletecategory.service';

@Component({
  selector: 'app-deletecategory',
  standalone: true,
  imports: [RouterLink,CommonModule,HttpClientModule],
  templateUrl: './deletecategory.component.html',
  styleUrl: './deletecategory.component.scss'
})
export class DeletecategoryComponent {
  categories: Category[] = [];
  constructor(private categoryService: DeletecategoryService, private router: Router,private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const categoryId = params.get('id');
      if (categoryId) {
        this.categoryService.getCategoryById(categoryId).subscribe((data: Category) => {
          this.categories?.push(data);
        });
      }
    });
  }
  ondeleteCategory(event: Event): void {
    event.preventDefault();
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      if (productId) {
    this.categoryService.deleteCategory(productId).subscribe(
      () => {
        alert('Category deleted successfully');
        this.router.navigate(['/categoryadmin']);
     // window.location.href = "/categoryadmin"
      },
     
    );
  }
  });
  }
}
