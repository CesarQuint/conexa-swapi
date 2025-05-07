import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class LogInAccountDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
