import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '../utils/httpStatus';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;

  res.status(statusCode).json({
    statusCode,
    message: err.message || 'Something went wrong',
  });
};
