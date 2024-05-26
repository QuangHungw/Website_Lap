import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Category } from './addproduct.module';
import { AddproductService } from './addproduct.service';

@Component({
  selector: 'app-addproduct',
  standalone: true,
  
  imports: [RouterLink, FormsModule,HttpClientModule,CommonModule],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.scss'
})
export class AddproductComponent implements OnInit{
  productObj: Product;
  categories: Category[] = [];
  errorMessage: string = ''; 
  imagePreviewUrl: string | ArrayBuffer | null = null;
  constructor(private addproductService: AddproductService,private http: HttpClient,private router: Router){
    this.productObj = new Product();
  }
  ngOnInit(): void {
    this.addproductService.getCategory().subscribe((data: Category) => {
      this.categories = this.categories?.concat(data);
    //  console.log(data)
    });
  }
onProduct() {
 // debugger
    // Assuming this.signupObj contains the registration data
    this.http.post<any>('http://localhost:3000/product', this.productObj).subscribe(
     {next :    (res) => {
      if (res) {
          console.log(res);
       
          // Optionally, you can redirect the user to the login page after successful signup
          this.router.navigateByUrl('/productadmin');
          alert("Add product successful");
      } else {
          alert("Add product failed");
      }
  },
  error:   (error) => {
    this.errorMessage=(error.error.message);
  }}
    );
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      // Extract only the file name
      const fileName: string = file.name;
      this.productObj.photo = fileName;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviewUrl = reader.result; // Update the preview URL
      };
      reader.readAsDataURL(file);
    }
  }
}
export class Product {

  product_name: string;
  description: string;
  price: number;
  photo: string;
  quantity:number;
  unit: string;
  category_id: string;
  constructor() {
    this.product_name="";
    this.description="";
    this.price=0;
    this.quantity=0;
    this.photo="";
    this.unit="";
    this.category_id = "";
  }
 }

