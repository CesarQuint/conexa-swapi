import { User } from 'src/domain/entities/user.entity';
import { UserDocument } from '../schemas/user.schema';
import { Password } from 'src/domain/value-objects/password.vo';

export class UserMapper {
  static toPersistence(user: User): Partial<UserDocument> {
    return {
      _id: user.id,
      email: user.email,
      password: user.password.toString(),
      role: user.role,
    };
  }

  static fromPersistence(doc: UserDocument): User {
    return new User(
      {
        email: doc.email,

        password: new Password({ password: doc.password }),
        role: doc.role,
      },
      doc._id,
    );
  }
}
