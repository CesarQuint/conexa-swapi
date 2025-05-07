import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum UserRoles {
  'ADMIN' = 'ADMIN',
  'USER' = 'USER',
}

export type UserDocument = HydratedDocument<UserModel>;

@Schema({ collection: 'users', timestamps: true })
export class UserModel {
  @Prop({ required: true, immutable: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: UserRoles, default: UserRoles.USER })
  role: UserRoles;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
