import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from '../account.controller';
import { AccountService } from 'src/domain/services/account.service';
import { SignUpAccountDto } from 'src/interfaces/dto/sign-up.request.dto';
import { LogInAccountDto } from 'src/interfaces/dto/log-in.request.dto';
import { LogInResponseDto } from 'src/interfaces/dto/log-in.response.dto';

describe('AccountController', () => {
  let controller: AccountController;
  let accountService: jest.Mocked<AccountService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [
        {
          provide: AccountService,
          useValue: {
            signUp: jest.fn(),
            signUpAdmin: jest.fn(),
            logIn: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AccountController>(AccountController);
    accountService = module.get(AccountService);
  });

  describe('signUpAdmin', () => {
    it('should call accountService.signUpAdmin with correct DTO', async () => {
      const dto: SignUpAccountDto = {
        email: 'admin@example.com',
        password: 'Secure123!',
        confirmPassword: 'Secure123!',
      };

      await controller.signUpAdmin(dto);
      expect(accountService.signUpAdmin).toHaveBeenCalledWith(dto);
    });
  });

  describe('signUp', () => {
    it('should call accountService.signUp with correct DTO', async () => {
      const dto: SignUpAccountDto = {
        email: 'user@example.com',
        password: 'Secure123!',
        confirmPassword: 'Secure123!',
      };

      await controller.signUp(dto);
      expect(accountService.signUp).toHaveBeenCalledWith(dto);
    });
  });

  describe('logIn', () => {
    it('should return token from accountService.logIn', async () => {
      const dto: LogInAccountDto = {
        email: 'user@example.com',
        password: 'Secure123!',
      };

      const expectedResponse: LogInResponseDto = {
        token: 'mocked-jwt-token',
      };

      accountService.logIn.mockResolvedValue(expectedResponse);

      const result = await controller.logIn(dto);
      expect(accountService.logIn).toHaveBeenCalledWith(dto);
      expect(result).toEqual(expectedResponse);
    });
  });
});
