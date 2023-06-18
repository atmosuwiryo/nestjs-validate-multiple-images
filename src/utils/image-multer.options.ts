import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

// Image Multer Options
const imageFilter = (
  req: any,
  file: Express.Multer.File,
  callback: (error: Error, acceptFile: boolean) => void,
) => {
  if (!Boolean(file.mimetype.match(/(jpg|jpeg|png)/))) {
    // Add FileValidationError field to the request object
    req.FileValidationError = 'Only image files are allowed!';
    callback(null, false);
  }
  callback(null, true);
};

export const imageMulterOptions: MulterOptions = {
  limits: { fileSize: 5242880 },
  fileFilter: imageFilter,
};
