import { model, Schema } from 'mongoose';
import { ProductModel, TProduct } from './product.interface';

const productSchema = new Schema<TProduct, ProductModel>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
    },
    photos: {
      type: [String],
      required: [true, 'Photos are required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    metaKey: {
      type: String,
      required: [true, 'Meta keywords are required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    discount: {
      type: Number,
      required: [true, 'Discount is required'],
    },
    stockStatus: {
      type: Boolean,
      required: [true, 'Stock status is required'],
    },
    variant: {
      type: Schema.Types.ObjectId,
      required: [true, 'Variant is required'],
      ref: 'Variant',
    },
    category: {
      type: Schema.Types.ObjectId,
      required: [true, 'Category is required'],
      ref: 'Category',
    },
  },
  {
    timestamps: true,
  },
);

productSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

productSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

productSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// creating static to check if the user exists
productSchema.statics.isProductExistsByName = async function (name: string) {
  const existingProduct = await Product.findOne({ name });
  return existingProduct;
};

export const Product = model<TProduct, ProductModel>('Product', productSchema);
