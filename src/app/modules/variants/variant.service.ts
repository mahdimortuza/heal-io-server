import QueryBuilder from '../../builder/QueryBuilder';
import { variantSearchableFields } from './variant.constants';
import { TVariant } from './variant.interface';
import { Variant } from './variant.model';

const createVariantIntoDB = async (payload: TVariant) => {
  if (await Variant.isVariantExistsByName(payload.variant)) {
    throw new Error('This variant already exists');
  }
  const result = await Variant.create(payload);

  return result;
};

const getAllVariantsFromDB = async (query: Record<string, unknown>) => {
  const variantQuery = new QueryBuilder(Variant.find(), query)
    .search(variantSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await variantQuery.modelQuery;
  const meta = await variantQuery.countTotal();

  return { meta, result };
};

const getSingleVariantFromDB = async (id: string) => {
  const result = await Variant.findById(id);
  return result;
};

const updateSingleVariantIntoDB = async (
  id: string,
  payload: Partial<TVariant>,
) => {
  const result = await Variant.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteSingleVariantFromDB = async (id: string) => {
  const result = await Variant.findOneAndUpdate(
    { _id: id },
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const VariantServices = {
  createVariantIntoDB,
  getAllVariantsFromDB,
  getSingleVariantFromDB,
  updateSingleVariantIntoDB,
  deleteSingleVariantFromDB,
};
