// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';



// @NgModule({
//   declarations: [],
//   imports: [
//     CommonModule
//   ]
// })

export interface Product {
  id: number;
  product_name: string;
  description: string;
  price: number;
  photo: string;
  unit: string;
  create_at: Date;
  category_id: number;

}
export interface Category {
  id : number;
  description: string;
  category_name: string;
 }
 export interface OrderDetail {
  id        : number;     
  price      :number;
  quantity   :number;
  product_id : number;
  order_id   :number
}
export class ProductsModule { }
