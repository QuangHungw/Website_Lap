export interface Order {
  id: number;
  payment_id: number;
  order_time: Date;
  create_at: Date;
  modified_at: Date;
  status: String;
  total: number;
  user_id: string;

}
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
   
   
  }
  export interface OrderDetail {
    id: number;
    price: number;
    quantity: number;
    product_id: number;
    order_id: number;
    total: number;
  }
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
export class OrderconfirmdetailModule { }
