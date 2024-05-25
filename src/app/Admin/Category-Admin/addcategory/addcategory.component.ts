import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-addcategory',
  standalone: true,
  imports: [RouterLink, FormsModule,HttpClientModule,CommonModule],
  templateUrl: './addcategory.component.html',
  styleUrl: './addcategory.component.scss'
})
export class AddcategoryComponent {
  categoryObj: Category;
  errorMessage: string = ''; 
  constructor(private http: HttpClient, private router:Router) {
    this.categoryObj= new Category();
}

onCategory() {
debugger
  // Assuming this.signupObj contains the registration data
  this.http.post<any>('http://localhost:3000/category', this.categoryObj).subscribe(
     {next: (res) => {
      if (res) {
          console.log(res);
       
          // Optionally, you can redirect the user to the login page after successful signup
          this.router.navigateByUrl('/categoryadmin');
          alert("Add category successful");
      } else {
          alert("Add category failed");
      }
  },
  error: (error) => {
    this.errorMessage=(error.error.message);
    //console.error('Error:', error.error.message);
  }}
  );
}
}
export class Category {

  category_name:string ;
  description:string;
  type: string;
 
  constructor() {
    this.category_name= "";
    this.description="";
    this.type="";

  }
}

