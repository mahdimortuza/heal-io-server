import QueryBuilder from '../../builder/QueryBuilder';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { searchableFields } from './user.constants';
import { TUser } from './user.interface';
import { User } from './user.model';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createUserIntoDB = async (file: any, payload: TUser) => {
  if (await User.isUserExistsByEmail(payload.email)) {
    throw new Error('User already exists');
  }

  const imageName = `${payload?.name} ${payload?.email}`;
  const path = file?.path;

  const { secure_url } = await sendImageToCloudinary(imageName, path);

  // console.log('photo', secure_url);
  payload.photo = secure_url as string;

  const result = await User.create(payload);

  return result;
};

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(User.find(), query)
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  const meta = await studentQuery.countTotal();

  return { meta, result };
};

const getSingleUserFromDB = async (id: string) => {
  const result = await User.findById(id);
  return result;
};

const updateSingleUserIntoDB = async (id: string, payload: Partial<TUser>) => {
  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteSingleUserFromDB = async (id: string) => {
  const result = await User.findOneAndUpdate(
    { _id: id },
    { isDeleted: true },
    { new: true },
  );
  return result;
};

const getMe = async (email: string, role: string) => {
  let result = null;
  if (role) {
    result = await User.findOne({ email });
  }

  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateSingleUserIntoDB,
  deleteSingleUserFromDB,
  getMe,
};
