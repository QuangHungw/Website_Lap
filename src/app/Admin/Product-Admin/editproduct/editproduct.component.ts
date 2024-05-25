import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product,Category } from './editproduct.module';
import { EditproductService } from './editproduct.service';

@Component({
  selector: 'app-editproduct',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule,HttpClientModule],
  templateUrl: './editproduct.component.html',
  styleUrl: './editproduct.component.scss'
})
export class EditproductComponent implements OnInit{
  products?: Product[] = [];
  categories: Category[] = [];
  errorMessage: string = ''; 
  editObj: Edit;
  constructor(private productService: EditproductService, private router: Router,private route: ActivatedRoute) {this. editObj = new Edit();}

ngOnInit(): void {
  this.productService.getCategory().subscribe((data: Category) => {
    this.categories = this.categories?.concat(data);
  //  console.log(data)
  });
  this.route.paramMap.subscribe(params => {
    const productId = params.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe((data: Product) => {
        this.products?.push(data);
        this.editObj.product_name = data.product_name;
        this.editObj.description = data.description;
        this.editObj.unit = data.unit;
        this.editObj.price = data.price;
        this.editObj.photo = data.photo;
        this.editObj.quantity = data.quantity;
        this.editObj.category_id = data.category_id;   
      
      
      });
    }
  });
}
onUpdateProduct(): void {
  debugger
  this.route.paramMap.subscribe(params => {
    const productId = params.get('id');
    if (productId) {
      const updatedProduct: Product = { // Tạo một đối tượng Category từ Edit
        id: parseInt(productId), // Chuyển đổi categoryId thành số nguyên nếu cần
        product_name: this.editObj.product_name,
        description: this.editObj.description,
        unit: this.editObj.unit,
        price: this.editObj.price,
        quantity: this.editObj.quantity,
        photo:this.editObj.photo,
        category_id:this.editObj.category_id

        
    
      };
      this.productService.updateProduct(productId, updatedProduct).subscribe(
      {next:  () => {
        alert('Product updated successfully');
        this.router.navigateByUrl('/productadmin');
      },
      error : (error) => {
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
    const fileName: string = file.name;
    this.editObj.photo = fileName;
  }
}
}
export class Edit {

  product_name: string;
  description: string;
  price: number;
  quantity:number;
  photo: string;
  unit: string;
  category_id: number;
  constructor() {
    this.product_name="";
    this.description="";
    this.price=0;
    this.quantity=0;
    this.photo="";
    this.unit="";
    this.category_id = 0;
  }
 }
