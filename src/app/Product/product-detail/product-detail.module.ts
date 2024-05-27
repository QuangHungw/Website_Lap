
export interface Product {
  id: number;
  product_name: string;
  description: string;
  price: number;
  photo: string;
  sold : number;
  unit: string;
  quantity:number;
  create_at: Date;
  category_id: number;
  category_name: string;
 
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
  total: number;
 
}


export class ProductDetailModule { }
