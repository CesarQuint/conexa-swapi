import { Body, Controller, HttpCode, Patch, Post, Req } from '@nestjs/common';
import { AccountService } from 'src/domain/services/account.service';
import { SignUpAccountDto } from '../dto/sign-up.request.dto';
import { LogInAccountDto } from '../dto/log-in.request.dto';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { LogInResponseDto } from '../dto/log-in.response.dto';

@Controller('/account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @ApiOperation({ summary: 'Sign up a new admin user' })
  @ApiResponse({
    status: 201,
  })
  @ApiResponse({
    status: 422,
    description: "There's already an account with this email",
  })
  @ApiResponse({
    status: 406,
    description: 'Password validation failed',
    schema: {
      example: {
        statusCode: 406,
        message: [
          'Passwords do not match',
          'Password must contain at least one digit and one lowercase letter',
        ],
        error: 'Not Acceptable',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiBody({ type: SignUpAccountDto })
  @HttpCode(201)
  @Post('admin/sign_up')
  async signUpAdmin(@Body() signUpDto: SignUpAccountDto): Promise<void> {
    await this.accountService.signUpAdmin(signUpDto);
  }

  @ApiOperation({ summary: 'Sign up a new regular user' })
  @ApiResponse({ status: 201 })
  @ApiResponse({
    status: 422,
    description: "There's already an account with this email",
  })
  @ApiResponse({
    status: 406,
    description: 'Password validation failed',
    schema: {
      example: {
        statusCode: 406,
        message: [
          'Passwords do not match',
          'Password must contain at least one digit and one lowercase letter',
        ],
        error: 'Not Acceptable',
      },
    },
  })
  @ApiBody({ type: SignUpAccountDto })
  @HttpCode(201)
  @Post('sign_up')
  async signUp(@Body() signUpDto: SignUpAccountDto): Promise<void> {
    await this.accountService.signUp(signUpDto);
  }

  @ApiOperation({ summary: 'Log in with an existing account' })
  @ApiResponse({
    status: 200,
    type: LogInResponseDto,
  })
  @ApiResponse({
    status: 406,
    description: 'Invalid Password',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found withe email: ${email}',
  })
  @ApiBody({ type: LogInAccountDto })
  @HttpCode(200)
  @Post('log_in')
  async logIn(@Body() logInDto: LogInAccountDto): Promise<LogInResponseDto> {
    return await this.accountService.logIn(logInDto);
  }
}
