// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';



// @NgModule({
//   declarations: [],
//   imports: [
//     CommonModule
//   ]
// })

export interface User {

  email: string;
  password:string ;
  name:string;
  address:string;
  phone:string;
  province:string;
 
}
export interface Category {
  id : number;
  description: string;
  category_name: string;
 }
export class HeaderModule { }
