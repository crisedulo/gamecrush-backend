import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersResolver } from './resolvers/users.resolver';
import { CreateUserUseCase } from './domain/services/create-user.usecase';
import { FindUserByEmailUseCase } from './domain/services/find-user-by-email.usecase';
import {
  User,
  UserSchema,
} from './infrastructure/database/schemas/user.schema';
import { UserRepositoryImpl } from './infrastructure/database/user.repository.impl';
import { USER_REPOSITORY } from './domain/repositories/user.repository';
import { GamesModule } from '../games/games.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    GamesModule,
  ],
  providers: [
    UsersResolver,
    CreateUserUseCase,
    FindUserByEmailUseCase,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryImpl,
    },
  ],
})
export class UsersModule {}
