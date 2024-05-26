import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostadminService } from './postadmin.service';
import { Post } from './postadmin.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-postadmin',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './postadmin.component.html',
  styleUrl: './postadmin.component.scss'
})
export class PostadminComponent {
  searchContent: string = '';
  currentPage: number = 1;
  pageSize: number = 9;
  totalPages: number = 0;
  posts: Post[] = [] ;
  constructor(private postadminService: PostadminService, private router: Router,private route: ActivatedRoute){}
  ngOnInit(): void {
    this.postadminService.getPosts().subscribe((data) => {
      this.posts = this.posts.concat(data);
      this.totalPages = Math.ceil(this.posts.length / this.pageSize);
    });

    this.route.paramMap.subscribe(params => {
      const titles = this.route.snapshot.paramMap.get('title');
      if (titles ) {
        const title = titles
        this.postadminService.searchPostByTitle(title).subscribe((data2: Post[]) => {
          this.posts = data2;
          //console.log(data2)
          this.totalPages = Math.ceil(this.posts.length / this.pageSize); 
          if(data2.length == 0) 
            { alert("Không tìm thấy loại sản phẩm");
           this.router.navigateByUrl('/postadmin');
              
            }
          
        })
      }
    });
  }
  onSearchClick(): void {
    
    if (this.searchContent.trim() !== '') {
      // Chuyển hướng đến trang sản phẩm với nội dung tìm kiếm được thêm vào URL
      this.router.navigateByUrl(`/postadmin/search/${this.searchContent}`);
    } else {
      // Nếu không có nội dung tìm kiếm, chỉ chuyển hướng đến trang sản phẩm
      this.router.navigateByUrl('/postadmin');
    
    }
    console.log(this.searchContent);
  }
  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }
  getPaginatedPost(): Post[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.posts.length);
    return this.posts.slice(startIndex, endIndex);
  }
  setCurrentPage(page: number) {
  this.currentPage = page;
  }
  }

