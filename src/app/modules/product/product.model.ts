import { model, Schema } from 'mongoose';
import { ProductModel, TProduct } from './product.interface';

const detailSchema = new Schema({
  photo: {
    type: String,
    required: [true, 'Photo is required'],
  },
  variant: {
    type: String,
    required: [true, 'Variant is required'],
  },
  price: {
    type: String,
    required: [true, 'Price is required'],
  },
});

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

    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    metaKey: {
      type: String,
      required: [true, 'Meta keywords are required'],
    },

    discount: {
      type: Number,
      required: [true, 'Discount is required'],
    },
    stockStatus: {
      type: Boolean,
      required: [true, 'Stock status is required'],
    },
    ProductDetail: {
      type: [detailSchema],
      required: [true, 'Detail is required'],
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
