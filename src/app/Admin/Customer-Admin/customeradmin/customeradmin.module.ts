// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';



// @NgModule({
//   declarations: [],
//   imports: [
//     CommonModule
//   ]
// })
export interface User {
id:number;
  email: string;
  password:string ;
  name:string;
  address:string;
  phone:string;
  province:string;
  role_id:string;
  create_at:Date;
  role_name :string;
 
}

export interface Role {
  id : number;
  role_name: string;
 }
export class CustomeradminModule { }
