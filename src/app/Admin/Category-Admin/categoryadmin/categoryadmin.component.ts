import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Category } from './categoryadmin.module';
import { CategoryadminService } from './categoryadmin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categoryadmin',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './categoryadmin.component.html',
  styleUrl: './categoryadmin.component.scss',
})
export class CategoryadminComponent  implements OnInit{
  categories: Category[] = [];
  searchContent: string = '';
  currentPage: number = 1;
  pageSize: number = 9;
  totalPages: number = 0;
  constructor(private categoryadminService: CategoryadminService, private router: Router,private route: ActivatedRoute) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
    this.categoryadminService.getCategory().subscribe((data: Category) => {
      this.categories = this.categories?.concat(data);
      this.totalPages = Math.ceil(this.categories.length / this.pageSize);
    //  console.log(data)
    });
  }
  this.route.paramMap.subscribe(params => {
    const category_name = this.route.snapshot.paramMap.get('name');
    if (category_name ) {
      const name = category_name
      this.categoryadminService.searchCategoryByName(name).subscribe((data2: Category[]) => {
        this.categories = data2;
        //console.log(data2)
        this.totalPages = Math.ceil(this.categories.length / this.pageSize); 
        if(data2.length == 0) 
          { alert("Không tìm thấy loại sản phẩm");
         this.router.navigateByUrl('/categoryadmin');
            
          }
        
      })
    }
  });
}
onSearchClick(): void {
  if (this.searchContent.trim() !== '') {
    // Chuyển hướng đến trang sản phẩm với nội dung tìm kiếm được thêm vào URL
    this.router.navigateByUrl(`/categoryadmin/search/${this.searchContent}`);
  } else {
    // Nếu không có nội dung tìm kiếm, chỉ chuyển hướng đến trang sản phẩm
    this.router.navigateByUrl('/categoryadmin');
  
  }
  console.log(this.searchContent);
}
get pageNumbers(): number[] {
  return Array.from({ length: this.totalPages }, (_, index) => index + 1);
}
getPaginatedCategories(): Category[] {
  const startIndex = (this.currentPage - 1) * this.pageSize;
  const endIndex = Math.min(startIndex + this.pageSize, this.categories.length);
  return this.categories.slice(startIndex, endIndex);
}
setCurrentPage(page: number) {
this.currentPage = page;
}
}
