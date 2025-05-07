import { ApiProperty } from '@nestjs/swagger';

class FieldError {
  @ApiProperty({
    example: ['title should not be empty', 'title must be a string'],
  })
  title: string[];
}

export class ValidationErrorResponseDto {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: 'Bad Request' })
  error: string;

  @ApiProperty({ example: 'Validation failed' })
  message: string;

  @ApiProperty({ type: () => FieldError })
  errors: Record<string, string[]>;
}
