import { Model, Types } from 'mongoose';

export interface TProduct {
  name: string;
  slug: string;
  photos: string[];
  description: string;
  metaKey: string;
  price: number;
  discount: number;
  stockStatus: boolean;
  variant: Types.ObjectId;
  category: Types.ObjectId;
}

export interface ProductModel extends Model<TProduct> {
  isProductExistsByName(name: string): Promise<TProduct>;
}
