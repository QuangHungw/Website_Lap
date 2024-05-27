import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Post } from './editpost.module';
import { EditpostService } from './editpost.service';

@Component({
  selector: 'app-editpost',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule,HttpClientModule],
  templateUrl: './editpost.component.html',
  styleUrl: './editpost.component.scss'
})
export class EditpostComponent implements OnInit {
  posts?: Post[] = [];
  errorMessage: string = ''; 
  editObj: Edit;
  imagePreviewUrl: string | ArrayBuffer | null = null;
    fileName: string = '';
  selectedFile: File | null = null;
  constructor(private postService: EditpostService, private router: Router,private route: ActivatedRoute,private http: HttpClient) {this. editObj = new Edit();}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const postId = params.get('id');
      if (postId) {
        this.postService.getPostById(postId).subscribe((data: Post) => {
          this.posts?.push(data);
          this.editObj.title = data.title;
          this.editObj.content = data.content;
          this.editObj.published = data.published;
          this.editObj.image = data.image;
        
        
        });
      }
    });
  }
  onUpdatePost(): void {
    //debugger
    this.route.paramMap.subscribe(params => {
      const postId = params.get('id');
      if (postId) {
        const updatedPost: Post = { // Tạo một đối tượng Category từ Edit
          id: parseInt(postId), // Chuyển đổi categoryId thành số nguyên nếu cần
          title: this.editObj.title,
          content: this.editObj.content,
          published: this.editObj.published,
          image:this.editObj.image
         
        };
        this.postService.updatePost(postId, updatedPost).subscribe(
          {next : () => {
            alert('Product updated successfully');
            this.router.navigateByUrl('/postadmin');
            const formData: FormData = new FormData();       
            if (this.selectedFile) {
              formData.append('image', this.selectedFile);
            }
            this.http
              .post<any>('http://localhost:3000/post/local', formData)
              .subscribe({
                next: () => {
                 
                },
              });
          },
          error:  (error) => {
            this.errorMessage=(error.error.message);
            //console.error('Error:', error.error.message);
          }}
        );
      }
    });
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      // Extract only the file name
    this.editObj.image = file.name; // Lưu tên file
      this.selectedFile = file; // Lưu file đầy đủ
      this.fileName = file.name; // Lưu tên file để hiển thị
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviewUrl = reader.result; // Update the preview URL
      };
      reader.readAsDataURL(file);
    }
  }




}


export class Edit {

  title   :  string;
  content  : string;
  image    : string;
  published : boolean;
  constructor() {
    this.title="";
    this.content="";
    this.image ="";
    this.published = true;
  }
 }