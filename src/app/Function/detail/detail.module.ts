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


export class DetailModule { }
