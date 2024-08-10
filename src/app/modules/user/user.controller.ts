import { Request, Response } from 'express';
import { UserServices } from './user.service';
import { UserValidations } from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body.user;

    const userParsedData =
      UserValidations.createUserValidationSchema.parse(user);
    const result = await UserServices.createUserIntoDB(userParsedData);

    // if (Error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'something wrong',
    //     error: Error,
    //   });
    // }

    res.status(200).json({
      success: true,
      message: 'User is created successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'server error',
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

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
};
