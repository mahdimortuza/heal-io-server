import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';
import { UserValidations } from './user.validation';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body.user;

    const userParsedData =
      UserValidations.createUserValidationSchema.parse(user);
    const result = await UserServices.createUserIntoDB(userParsedData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student created successfully!',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserServices.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: 'Users retrieved successfully.',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await UserServices.getSingleUserFromDB(id);
    res.status(200).json({
      success: true,
      message: 'User retrieved successfully.',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await UserServices.updateSingleUserIntoDB(id, req.body);

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await UserServices.deleteSingleUserFromDB(id);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully.',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
};
