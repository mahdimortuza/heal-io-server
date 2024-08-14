import { model, Schema } from 'mongoose';
import { CategoryModel, TCategory } from './categoty.interface';

const categorySchema = new Schema<TCategory, CategoryModel>({
  name: {
    type: String,
    enum: ['primary', 'secondary', 'tertiary'],
  },
  slug: { type: String, required: true },
  thumbnail: { type: String },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

categorySchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

categorySchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

categorySchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// creating static to check if the user exists
categorySchema.statics.isCategoryExistsByName = async function (name: string) {
  const existingCategory = await Category.findOne({ name });
  return existingCategory;
};

export const Category = model<TCategory, CategoryModel>(
  'Category',
  categorySchema,
);
