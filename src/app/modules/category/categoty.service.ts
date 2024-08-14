import QueryBuilder from '../../builder/QueryBuilder';
import { categorySearchableFields } from './categoty.constants';
import { TCategory } from './categoty.interface';
import { Category } from './categoty.model';

const createCategoryIntoDB = async (payload: TCategory) => {
  if (await Category.isCategoryExistsByName(payload.name)) {
    throw new Error('This category already exists');
  }
  const result = await Category.create(payload);

  return result;
};

const getAllCategoriesFromDB = async (query: Record<string, unknown>) => {
  const categoryQuery = new QueryBuilder(Category.find(), query)
    .search(categorySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await categoryQuery.modelQuery;
  const meta = await categoryQuery.countTotal();

  return { meta, result };
};

const getSingleCategoryFromDB = async (id: string) => {
  const result = await Category.findById(id);
  return result;
};

const updateSingleCategoryIntoDB = async (
  id: string,
  payload: Partial<TCategory>,
) => {
  const result = await Category.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteSingleCategoryFromDB = async (id: string) => {
  const result = await Category.findOneAndUpdate(
    { _id: id },
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
  getSingleCategoryFromDB,
  updateSingleCategoryIntoDB,
  deleteSingleCategoryFromDB,
};
