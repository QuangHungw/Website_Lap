
export interface Product {
  id: number;
  product_name: string;
  description: string;
  price: number;
  photo: string;
  unit: string;
  sold : number;
  quantity:number;
  create_at: Date;
  category_id: string;
  category_name: string;
}
export interface Category {
  id: number;
  category_name: string;
  description: string;
  
  }
export class ProductadminModule { }
