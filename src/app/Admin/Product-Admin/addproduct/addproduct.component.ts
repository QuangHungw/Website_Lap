import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-addproduct',
  standalone: true,
  
  imports: [RouterLink, FormsModule,HttpClientModule,CommonModule],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.scss'
})
export class AddproductComponent {
  productObj: Product;
  errorMessage: string = ''; 
  constructor(private http: HttpClient,private router: Router){
    this.productObj = new Product();
  }

onProduct() {
 // debugger
    // Assuming this.signupObj contains the registration data
    this.http.post<any>('http://localhost:3000/product', this.productObj).subscribe(
        (res) => {
            if (res) {
                console.log(res);
             
                // Optionally, you can redirect the user to the login page after successful signup
                this.router.navigateByUrl('/productadmin');
                alert("Add product successful");
            } else {
                alert("Add product failed");
            }
        },
        (error) => {
          this.errorMessage=(error.error.message);
        }
    );
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      // Extract only the file name
      const fileName: string = file.name;
      this.productObj.photo = fileName;
    }
  }
}
export class Product {

  product_name: string;
  description: string;
  price: number;
  photo: string;
  unit: string;
  category_id: number;
  constructor() {
    this.product_name="";
    this.description="";
    this.price=0;
    this.photo="";
    this.unit="";
    this.category_id = 0;
  }
 }
