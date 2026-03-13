import { Router } from 'express';
import { upload } from '../middlewares/multer.middleware';
import { uploadFields } from '../controllers/upload.controller';

const router = Router();

router.post(
  '/files',
  upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'documents', maxCount: 3 },
  ]),
  uploadFields
);

export default router;
