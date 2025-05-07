import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountService } from 'src/domain/services/account.service';
import { UserFactory } from 'src/infraestructure/factories/user.factory';
import { UsersRepository } from 'src/infraestructure/repositories/users.repository';

import { UserModel, UserSchema } from 'src/infraestructure/schemas/user.schema';
import { AccountController } from 'src/interfaces/controllers/account.controller';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
    AuthModule,
  ],
  controllers: [AccountController],
  providers: [UserFactory, UsersRepository, AccountService],
})
export class AccountModule {}
