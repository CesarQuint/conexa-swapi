import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, UserModel } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { User } from 'src/domain/entities/user.entity';
import { UserMapper } from '../mappers/users.mapper';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(UserModel.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const data = await this.userModel.findOne({ email }).exec();
    return data ? UserMapper.fromPersistence(data) : null;
  }

  async save(user: User) {
    const data = UserMapper.toPersistence(user);
    let record = await this.userModel.findById(user.id).exec();

    if (record) Object.assign(record, data);
    else record = new this.userModel(data);

    await record.save();
  }
}
