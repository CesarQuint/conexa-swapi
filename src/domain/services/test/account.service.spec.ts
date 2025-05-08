import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from '../account.service';
import { UsersRepository } from 'src/infraestructure/repositories/users.repository';
import { UserFactory } from 'src/infraestructure/factories/user.factory';
import { JwtService } from '@nestjs/jwt';
import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { LogInAccountDto } from 'src/interfaces/dto/log-in.request.dto';
import { SignUpAccountDto } from 'src/interfaces/dto/sign-up.request.dto';
import { UserRoles } from 'src/infraestructure/schemas/user.schema';

describe('AccountService', () => {
  let service: AccountService;
  let usersRepository: jest.Mocked<UsersRepository>;
  let userFactory: jest.Mocked<UserFactory>;
  let jwtService: jest.Mocked<JwtService>;

  const mockUser = {
    id: '123',
    email: 'test@example.com',
    role: UserRoles.REGULAR,
    password: {
      compareHashedPassword: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        {
          provide: UsersRepository,
          useValue: {
            findByEmail: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: UserFactory,
          useValue: {
            build: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(AccountService);
    usersRepository = module.get(UsersRepository);
    userFactory = module.get(UserFactory);
    jwtService = module.get(JwtService);
  });

  describe('logIn', () => {
    it('should log in a user and return a token', async () => {
      const dto: LogInAccountDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      usersRepository.findByEmail.mockResolvedValue(mockUser as any);
      jwtService.sign.mockReturnValue('mockToken');

      const result = await service.logIn(dto);

      expect(usersRepository.findByEmail).toHaveBeenCalledWith(dto.email);
      expect(mockUser.password.compareHashedPassword).toHaveBeenCalledWith(
        dto.password,
      );
      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: mockUser.id,
        email: mockUser.email,
        role: mockUser.role,
      });
      expect(result).toEqual({ token: 'mockToken' });
    });

    it('should throw NotFoundException if user is not found', async () => {
      usersRepository.findByEmail.mockResolvedValue(null);

      await expect(
        service.logIn({ email: 'notfound@example.com', password: '123' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('signUp', () => {
    it('should create a new user and save it', async () => {
      const dto: SignUpAccountDto = {
        email: 'new@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      };

      usersRepository.findByEmail.mockResolvedValue(null);
      const mockNewUser = { email: dto.email };
      userFactory.build.mockResolvedValue(mockNewUser as any);

      await service.signUp(dto);

      expect(usersRepository.findByEmail).toHaveBeenCalledWith(dto.email);
      expect(userFactory.build).toHaveBeenCalledWith(dto);
      expect(usersRepository.save).toHaveBeenCalledWith(mockNewUser);
    });

    it('should throw UnprocessableEntityException if email already exists', async () => {
      usersRepository.findByEmail.mockResolvedValue(mockUser as any);

      const dto: SignUpAccountDto = {
        email: 'test@example.com',
        password: 'pass',
        confirmPassword: 'pass',
      };

      await expect(service.signUp(dto)).rejects.toThrow(
        UnprocessableEntityException,
      );
    });
  });

  describe('signUpAdmin', () => {
    it('should create a new admin user and save it', async () => {
      const dto: SignUpAccountDto = {
        email: 'admin@example.com',
        password: 'adminpass',
        confirmPassword: 'adminpass',
      };

      usersRepository.findByEmail.mockResolvedValue(null);
      const mockAdmin = { email: dto.email, role: UserRoles.ADMIN };
      userFactory.build.mockResolvedValue(mockAdmin as any);

      await service.signUpAdmin(dto);

      expect(usersRepository.findByEmail).toHaveBeenCalledWith(dto.email);
      expect(userFactory.build).toHaveBeenCalledWith({
        ...dto,
        role: UserRoles.ADMIN,
      });
      expect(usersRepository.save).toHaveBeenCalledWith(mockAdmin);
    });
  });
});
