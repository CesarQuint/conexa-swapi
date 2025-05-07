import { ValueObject } from 'src/infraestructure/primitives/value-object';
import PasswordValidator from 'password-validator';
import bcrypt from 'bcrypt';
import { NotAcceptableException } from '@nestjs/common';

interface PasswordProps {
  password: string;
}

interface ErrorInterface {
  message: string;
}

export class Password extends ValueObject<PasswordProps> {
  constructor(passwordProps: PasswordProps) {
    super(passwordProps);
  }

  static async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  static validate(password: string): void {
    const createPasswordErrorMessage = (errors: Partial<ErrorInterface>[]) =>
      `The password must have ${errors.reduce(
        (acc, error, i) => `${acc}${i > 0 ? ',' : ''} ${error.message}`,
        '',
      )}.`;

    const result = new PasswordValidator()
      .is()
      .min(8, 'a minimum length of 8 characters')
      .is()
      .max(100, 'a maximum length of 100 characters')
      .has()
      .uppercase(1, 'at least one uppercase letter')
      .has()
      .lowercase(1, 'at least one lowercase letter')
      .has()
      .digits(1, 'at least one digit')
      .has()
      .not()
      .spaces(0, 'no spaces');

    const passwordValidationResult = result.validate(password, {
      details: true,
      list: true,
    });

    if (
      Array.isArray(passwordValidationResult) &&
      passwordValidationResult.length > 0
    ) {
      const errorMessage = createPasswordErrorMessage(passwordValidationResult);
      throw new NotAcceptableException(errorMessage);
    }
  }

  static comparePasswords(password: string, passwordToCompare: string): void {
    if (password !== passwordToCompare) {
      throw new NotAcceptableException('The passwords provided are different');
    }
  }

  compareHashedPassword(hashedPassword: string): void {
    bcrypt.compare(this.props.password, hashedPassword, (err, res) => {
      if (err) {
        throw new NotAcceptableException('Invalid Password');
      }
    });
  }

  getValue(): PasswordProps['password'] {
    return this.props.password;
  }

  toString(): PasswordProps['password'] {
    return this.props.password;
  }
}
