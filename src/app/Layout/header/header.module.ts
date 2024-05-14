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
  role_id: number;
 
}
export interface Category {
  id : number;
  description: string;
  category_name: string;
 }

 export interface Order {
  id         :  number;         
  payment_id  : number;
  order_time  : Date;
  create_at    :Date;
  modified_at  :Date;
  status       :String
  total        :number
  user_id      :number
 }
export class HeaderModule { }
