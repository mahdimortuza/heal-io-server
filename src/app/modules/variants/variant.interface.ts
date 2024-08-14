import { Model } from 'mongoose';

export interface TVariant {
  variant: '500' | '1000';
  isDeleted: boolean;
}

export interface VariantModel extends Model<TVariant> {
  isVariantExistsByName(name: string): Promise<TVariant>;
}
