import { Body, Controller, HttpCode, Patch, Post, Req } from '@nestjs/common';
import { AccountService } from 'src/domain/services/account.service';
import { SignUpAccountDto } from '../dto/sign-up.request.dto';
import { LogInAccountDto } from '../dto/log-in.request.dto';

@Controller('/account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('admin/sign_up')
  async signUpAdmin(@Body() signUpDto: SignUpAccountDto): Promise<void> {
    await this.accountService.signUpAdmin(signUpDto);
  }

  @HttpCode(201)
  @Post('sign_up')
  async signUp(@Body() signUpDto: SignUpAccountDto): Promise<void> {
    await this.accountService.signUp(signUpDto);
  }

  @HttpCode(200)
  @Post('log_in')
  async logIn(@Body() logInDto: LogInAccountDto): Promise<LogInResponseDto> {
    return await this.accountService.logIn(logInDto);
  }
}
