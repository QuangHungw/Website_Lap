import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Post } from './deletepost.module';
import { DeletepostService } from './deletepost.service';

@Component({
  selector: 'app-deletepost',
  standalone: true,
  imports: [RouterLink,CommonModule,HttpClientModule],
  templateUrl: './deletepost.component.html',
  styleUrl: './deletepost.component.scss'
})
export class DeletepostComponent {
  posts?: Post[] = [];
  constructor(private postService: DeletepostService, private router: Router,private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const postId = params.get('id');
      if (postId) {
        this.postService.getPostById(postId).subscribe((data: Post) => {
          this.posts?.push(data);
        });
      }
    });
  }
  ondeletePost(event: Event): void {
    event.preventDefault();
    this.route.paramMap.subscribe(params => {
      const postId = params.get('id');
      if (postId) {
    this.postService.deletePost(postId).subscribe(
      () => {
        alert('Post deleted successfully');
         this.router.navigateByUrl('/postadmin');
     
      },
      (error) => {
        console.error('Error deleting product:', error);
      }
    );
  }
  });
  }

}
