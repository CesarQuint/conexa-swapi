import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserFactory } from 'src/infraestructure/factories/user.factory';
import { UsersRepository } from 'src/infraestructure/repositories/users.repository';
import { UserRoles } from 'src/infraestructure/schemas/user.schema';
import { LogInAccountDto } from 'src/interfaces/dto/log-in.request.dto';
import { SignUpAccountDto } from 'src/interfaces/dto/sign-up.request.dto';
import { JwtService } from '@nestjs/jwt';
import { LogInResponseDto } from 'src/interfaces/dto/log-in.response.dto';

@Injectable()
export class AccountService {
  constructor(
    private readonly userFactory: UserFactory,
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  private async collitionAccountFilter(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (user)
      throw new UnprocessableEntityException(
        "There's already an account with this email",
      );
  }

  async logIn(logInDto: LogInAccountDto): Promise<LogInResponseDto> {
    const { email, password } = logInDto;
    const user = await this.usersRepository.findByEmail(email);
    if (!user)
      throw new NotFoundException(`User not found withe email: ${email}`);

    user.password.compareHashedPassword(password);

    const payload = {
      sub: user.id.toString(),
      email: user.email,
      role: user.role,
    };

    const token = this.jwtService.sign(payload);

    return {
      token: token,
    };
  }

  async signUp(signUpDto: SignUpAccountDto) {
    const { email, password, confirmPassword } = signUpDto;

    await this.collitionAccountFilter(email);

    const newUser = await this.userFactory.build({
      email,
      password,
      confirmPassword,
    });

    await this.usersRepository.save(newUser);
  }

  async signUpAdmin(signUpDto: SignUpAccountDto) {
    const { email, password, confirmPassword } = signUpDto;

    await this.collitionAccountFilter(email);

    const newAdminUser = await this.userFactory.build({
      email,
      password,
      confirmPassword,
      role: UserRoles.ADMIN,
    });

    await this.usersRepository.save(newAdminUser);
  }
}
