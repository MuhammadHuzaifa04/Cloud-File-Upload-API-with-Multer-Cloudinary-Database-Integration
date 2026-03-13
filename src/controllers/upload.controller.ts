import { Request, Response, NextFunction } from 'express';
import cloudinary from '../config/cloudinary';
import streamifier from 'streamifier';
import { File } from '../models/file.model';
import { HTTP_STATUS } from '../utils/httpStatus';

export const uploadFields = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const files = req.files as {
      profileImage?: Express.Multer.File[];
      documents?: Express.Multer.File[];
    };

    const uploadToCloudinary = (file: Express.Multer.File) => {
      return new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'uploads' },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );

        streamifier.createReadStream(file.buffer).pipe(stream);
      });
    };

    let uploadedFiles: any[] = [];

    if (files.profileImage) {
      const result = await uploadToCloudinary(files.profileImage[0]);

      const saved = await File.create({
        url: result.secure_url,
        filename: result.public_id,
        originalName: files.profileImage[0].originalname,
        type: files.profileImage[0].mimetype,
        size: files.profileImage[0].size,
      });

      uploadedFiles.push(saved);
    }

    if (files.documents) {
      for (const file of files.documents) {
        const result = await uploadToCloudinary(file);

        const saved = await File.create({
          url: result.secure_url,
          filename: result.public_id,
          originalName: file.originalname,
          type: file.mimetype,
          size: file.size,
        });

        uploadedFiles.push(saved);
      }
    }

    res.status(HTTP_STATUS.OK).json({
      statusCode: HTTP_STATUS.OK,
      message: 'Files uploaded successfully',
      data: uploadedFiles,
    });
  } catch (error) {
    next(error);
  }
};
