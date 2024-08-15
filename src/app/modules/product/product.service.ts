import QueryBuilder from '../../builder/QueryBuilder';
import { productSearchableFields } from './product.constants';
import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (payload: TProduct) => {
  if (await Product.isProductExistsByName(payload.name)) {
    throw new Error('This product already exists');
  }
  const result = await Product.create(payload);

  return result;
};

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(
    Product.find().populate('category').populate({
      path: 'ProductDetail.variant',
      select: 'variant',
    }),
    query,
  )
    .search(productSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await productQuery.modelQuery;
  const meta = await productQuery.countTotal();

  return { meta, result };
};

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id).populate('category').populate({
    path: 'ProductDetail.variant',
    select: 'variant',
  });
  return result;
};

const updateSingleProductIntoDB = async (
  id: string,
  payload: Partial<TProduct>,
) => {
  const result = await Product.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteSingleProductFromDB = async (id: string) => {
  const result = await Product.findOneAndUpdate(
    { _id: id },
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateSingleProductIntoDB,
  deleteSingleProductFromDB,
};
