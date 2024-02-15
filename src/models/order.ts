import { Product } from "./product";


export interface CartProduct{
    product: Product,
    quantity: number
  }

export interface Order{
    id?: string;
    date: Date;
    total: number;
    products: CartProduct[];   
}