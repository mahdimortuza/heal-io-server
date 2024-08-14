import { Model } from 'mongoose';

export interface TCategory {
  name: 'primary' | 'secondary' | 'tertiary';
  slug: string;
  thumbnail: string;
  isDeleted: boolean;
}

export interface CategoryModel extends Model<TCategory> {
  isCategoryExistsByName(name: string): Promise<TCategory>;
}
