import { Types } from 'mongoose';
import { Entity } from 'src/infraestructure/primitives/entity';
import { UserRoles } from 'src/infraestructure/schemas/user.schema';
import { Password } from '../value-objects/password.vo';

interface UserProps {
  email: string;
  password: Password;
  role: UserRoles;
}

export class User extends Entity<UserProps> {
  constructor(props: UserProps, id?: Types.ObjectId) {
    super(props, id);
  }

  get email(): UserProps['email'] {
    return this.props.email;
  }

  //????? Think About it
  get password(): UserProps['password'] {
    return this.props.password;
  }
  get role(): UserProps['role'] {
    return this.props.role;
  }
}
