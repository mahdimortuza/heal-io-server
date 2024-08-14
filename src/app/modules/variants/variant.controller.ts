import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { VariantServices } from './variant.service';

const createVariant = catchAsync(async (req, res) => {
  const variant = req.body;

  const result = await VariantServices.createVariantIntoDB(variant);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Variant is created successfully!',
    data: result,
  });
});

const getAllVariants = catchAsync(async (req, res) => {
  const result = await VariantServices.getAllVariantsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Variants are retrieved successfully.',
    data: result,
  });
});

const getSingleVariant = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await VariantServices.getSingleVariantFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Variant is retrieved successfully.',
    data: result,
  });
});

const updateSingleVariant = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await VariantServices.updateSingleVariantIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Variant updated successfully!',
    data: result,
  });
});

const deleteSingleVariant = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await VariantServices.deleteSingleVariantFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Variant deleted successfully.',
    data: result,
  });
});

export const VariantControllers = {
  createVariant,
  getAllVariants,
  getSingleVariant,
  updateSingleVariant,
  deleteSingleVariant,
};
