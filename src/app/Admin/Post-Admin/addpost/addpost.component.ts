import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-addpost',
  standalone: true,
  imports: [RouterLink, FormsModule, HttpClientModule, CommonModule],
  templateUrl: './addpost.component.html',
  styleUrl: './addpost.component.scss',
})
export class AddpostComponent {
  postObj: Post;
  errorMessage: string = '';
  imagePreviewUrl: string | ArrayBuffer | null = null;
  fileName: string = '';
  selectedFile: File | null = null;

  constructor(private http: HttpClient, private router: Router) {
    this.postObj = new Post();
  }

  onPost() {
   // debugger;
    const published = this.postObj.published;
    // Assuming this.signupObj contains the registration data
    this.http.post<any>('http://localhost:3000/post', this.postObj).subscribe({
      next: (res) => {
        if (res) {
          console.log(res);
          this.router.navigateByUrl('/postadmin');
          alert('Add post successful');
          // Optionally, you can redirect the user to the login page after successful signup
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
        } else {
          alert('Add post failed');
        }
      },
      error: (error) => {
        this.errorMessage = error.error.message;
      },
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      // Extract only the file name
      this.postObj.image = file.name; // Lưu tên file
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
export class Post {
  title: string;
  content: string;
  image: string;
  published: boolean;
  constructor() {
    this.title = '';
    this.content = '';
    this.image = '';
    this.published = true;
  }
}
