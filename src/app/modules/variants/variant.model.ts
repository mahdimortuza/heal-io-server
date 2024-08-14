import { model, Schema } from 'mongoose';
import { TVariant, VariantModel } from './variant.interface';

const variantSchema = new Schema<TVariant, VariantModel>({
  variant: {
    type: String,
    enum: ['500', '1000'],
  },
});

variantSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

variantSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

variantSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// creating static to check if the user exists
variantSchema.statics.isVariantExistsByName = async function (name: string) {
  const existingVariant = await Variant.findOne({ name });
  return existingVariant;
};

export const Variant = model<TVariant, VariantModel>('Variant', variantSchema);
