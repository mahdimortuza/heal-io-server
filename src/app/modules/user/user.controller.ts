import { Request, Response } from 'express';
import { UserServices } from './user.service';
import { UserValidations } from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body.user;

    const userParsedData =
      UserValidations.createUserValidationSchema.parse(user);
    const result = await UserServices.createUserIntoDB(userParsedData);
    res.status(200).json({
      success: true,
      message: 'User is created successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Internal server error',
      err,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: 'Users retrieved successfully.',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await UserServices.getSingleUserFromDB(id);
    res.status(200).json({
      success: true,
      message: 'User retrieved successfully.',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await UserServices.updateSingleUserIntoDB(id, req.body);

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Internal server error',
      err,
    });
  }
};

const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await UserServices.deleteSingleUserFromDB(id);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully.',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
};
