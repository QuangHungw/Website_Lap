import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {  EditcategoryService } from './editcategory.service';
import { Category } from './editcategory.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-editcategory',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule,HttpClientModule],
  templateUrl: './editcategory.component.html',
  styleUrl: './editcategory.component.scss'
})
export class EditcategoryComponent implements OnInit {
  categories?: Category[] = [];
  errorMessage: string = ''; 
  editObj: Edit;
  constructor(private categoryService: EditcategoryService, private router: Router,private route: ActivatedRoute) {this. editObj = new Edit();}

 ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const categoryId = params.get('id');
      if (categoryId) {
        this.categoryService.getCategoryById(categoryId).subscribe((data: Category) => {
          this.categories?.push(data);
          this.editObj.category_name = data.category_name;
          this.editObj.description = data.description;
       // console.log(this.categories)
        });
      }
    });
  }


  onUpdateCategory(): void {
    this.route.paramMap.subscribe(params => {
      const categoryId = params.get('id');
      if (categoryId) {
        const updatedCategory: Category = { // Tạo một đối tượng Category từ Edit
          id: parseInt(categoryId), // Chuyển đổi categoryId thành số nguyên nếu cần
          category_name: this.editObj.category_name,
          description: this.editObj.description
        };
        this.categoryService.updateCategory(categoryId, updatedCategory).subscribe(
          () => {
            alert('Category updated successfully');
            this.router.navigateByUrl('/categoryadmin');
          },
          (error) => {
            this.errorMessage=(error.error.message);
            //console.error('Error:', error.error.message);
          }
        );
      }
    });
  }
}
export class Edit {

  category_name:string ;
  description:string;
 
  constructor() {
    this.category_name= "";
    this.description="";

  }
}
