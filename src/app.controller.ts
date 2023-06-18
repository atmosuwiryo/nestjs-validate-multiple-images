import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  ApiConsumes,
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { uploadImagesDto } from './app.entity';
import { FilesInterceptor } from '@nestjs/platform-express';
import { imageMulterOptions } from './utils/image-multer.options';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'Upload images',
    description: 'Upload images',
  })
  @ApiProperty({
    description: 'Upload images',
    type: uploadImagesDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The images has been successfully uploaded.',
  })
  @UseInterceptors(FilesInterceptor('productImages', 3, imageMulterOptions))
  @ApiConsumes('multipart/form-data')
  @Post()
  postImages(
    @Body() uploadImagesDto: uploadImagesDto,
    @UploadedFiles() productImages: Express.Multer.File[],
    @Req() req: any,
  ): any {
    if (req.FileValidationError) {
      throw new BadRequestException(req.FileValidationError);
    }
    return {
      productName: uploadImagesDto.productName,
      productImages: productImages.map((image) => [
        image.originalname,
        image.mimetype,
        image.size,
        image.fieldname,
        image.destination,
        image.path,
      ]),
    };
  }
}
