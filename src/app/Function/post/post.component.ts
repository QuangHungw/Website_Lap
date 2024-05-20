import { Component } from '@angular/core';
import { PostService } from './post.service';
import { Post } from './post.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  posts: Post[] = [] ;
  constructor(private postService: PostService){}
  ngOnInit(): void {
    this.postService.getPosts().subscribe((data) => {
      this.posts = this.posts?.concat(data);
    });
  }
}
