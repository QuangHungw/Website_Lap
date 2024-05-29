
export interface Product {
  id: number;
  product_name: string;
  description: string;
  price: number;
  quantity:number;
  sold : number;
  photo: string;
  unit: string;
  create_at: Date;
  category_id: number;

}
export interface Category {
  id : number;
  description: string;
  category_name: string;
  type:string;
 }
 export interface OrderDetail {
  id        : number;     
  price      :number;
  quantity   :number;
  product_id : number;
  order_id   :number;
  total: number;
 
}
export class ProductsModule { }
