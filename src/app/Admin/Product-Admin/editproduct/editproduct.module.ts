export interface Category {
  id: number;
  category_name: string;
  description: string;
}
export interface Product {
  id: number;
  product_name: string;
  description: string;
  price: number;
  photo: string;
  quantity:number;

  unit: string;
  category_id: number;
}
export class EditproductModule {}
