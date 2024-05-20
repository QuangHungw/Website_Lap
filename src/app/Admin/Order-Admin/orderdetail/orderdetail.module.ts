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
export class OrderdetailModule { }
