import { Injectable } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { UserRoles } from '../schemas/user.schema';
import { Password } from 'src/domain/value-objects/password.vo';

export class BuildUserProps {
  email: string;
  password: string;
  confirmPassword: string;
  role?: UserRoles;
}

@Injectable()
export class UserFactory {
  constructor() {}

  async build({
    email,
    password,
    confirmPassword,
    role = UserRoles.REGULAR,
  }: BuildUserProps): Promise<User> {
    Password.comparePasswords(password, confirmPassword);
    Password.validate(password);

    const hashedPassword = new Password({
      password: await Password.hash(password),
    });

    return new User({
      email,
      password: hashedPassword,
      role,
    });
  }
}
