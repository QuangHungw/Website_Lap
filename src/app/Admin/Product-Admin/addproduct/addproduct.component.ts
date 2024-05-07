import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [RouterLink, FormsModule,HttpClientModule],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.scss'
})
export class AddproductComponent {
productObj: Product;
constructor(private http: HttpClient,private router: Router){
  this.productObj = new Product();
}
onProduct() {
debugger
const formData = new FormData();
    formData.append('product_name', this.productObj.product_name);
    formData.append('description', this.productObj.description);
    formData.append('price', this.productObj.price);
    formData.append('unit', this.productObj.unit);
    formData.append('category_id', this.productObj.category_id.toString());
    if (this.productObj.photo !== null) { // Check if photo is not null
      formData.append('photo', this.productObj.photo); // Append photo only if it's not null
    }
  // Assuming this.signupObj contains the registration data
  this.http.post<any>('http://localhost:3000/product', formData).subscribe(
      (res) => {
          if (res) {
              console.log(res);
           
              // Optionally, you can redirect the user to the login page after successful signup
              this.router.navigateByUrl('/productadmin');
              alert("Add category successful");
          } else {
              alert("Add category failed");
          }
      },
      (error) => {
          console.error('Error:', error);
          alert("Add category failed");
      }
  );
}
onFileSelected(event: any) {
  this.productObj.photo = event.target.files[0];
}
}


export class Product {

  product_name: string;
  description: string;
  price: string;
  photo: File | null; 
  unit: string;
  category_id: number;
  constructor() {
    this.product_name="";
    this.description="";
    this.price="";
    this.photo = null;
    this.unit="";
    this.category_id = 0;
  }
 }
