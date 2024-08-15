import { Model, Types } from 'mongoose';

type TDetail = {
  photo: string;
  variant: string;
  price: string;
}[];
export interface TProduct {
  name: string;
  slug: string;
  description: string;
  metaKey: string;
  discount: number;
  stockStatus: boolean;
  ProductDetail: TDetail;
  category: Types.ObjectId;
  isDeleted: boolean;
}

export interface ProductModel extends Model<TProduct> {
  isProductExistsByName(name: string): Promise<TProduct>;
}
