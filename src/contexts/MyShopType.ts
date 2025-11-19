export interface Product {
  id: number;
  name: string;
  price: number;
  img: string;
}

//Actions
export type ProductAction =
  | { type: "ADD"; payload: Product }
  | { type: "REMOVE"; payload: { id: string } };
