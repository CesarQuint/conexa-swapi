import { ApiProperty } from '@nestjs/swagger';
export class LogInResponseDto {
  @ApiProperty({
    description: 'JWT access token to be used in Authorization header',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  token: string;
}
