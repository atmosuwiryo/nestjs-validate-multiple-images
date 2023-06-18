import { ApiProperty } from '@nestjs/swagger';

export class uploadImagesDto {
  @ApiProperty({
    description: 'Name of the product',
    type: 'string',
  })
  productName: string;
  @ApiProperty({
    description: 'Images of the variant',
    type: 'array',
    items: {
      type: 'file',
      format: 'binary',
    },
  })
  productImages: any[];
}
