import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PostadminService } from './postadmin.service';
import { Post } from './postadmin.module';

@Component({
  selector: 'app-postadmin',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './postadmin.component.html',
  styleUrl: './postadmin.component.scss'
})
export class PostadminComponent {
 
  posts: Post[] = [] ;
  constructor(private postadminService: PostadminService){}
  ngOnInit(): void {
    this.postadminService.getPosts().subscribe((data) => {
      this.posts = this.posts.concat(data);
    });
  }
}
