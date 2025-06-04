import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersResolver } from './resolvers/users.resolver';
import { CreateUserUseCase } from './domain/use-cases/create-user.usecase';
import { FindUserByEmailUseCase } from './domain/use-cases/find-user-by-email.usecase';
import { GetProfileUseCase } from './domain/use-cases/get-profile.usecase';
import { UpdateProfileUseCase } from './domain/use-cases/update-profile.usecase';
import {
  User,
  UserSchema,
} from './infrastructure/database/schemas/user.schema';
import { UserRepositoryImpl } from './infrastructure/database/user.repository.impl';
import { USER_REPOSITORY } from './domain/repositories/user.repository';
import { GamesModule } from '../games/games.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    GamesModule,
    AuthModule,
  ],
  providers: [
    UsersResolver,
    CreateUserUseCase,
    FindUserByEmailUseCase,
    GetProfileUseCase,
    UpdateProfileUseCase,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryImpl,
    },
  ],
  exports: [USER_REPOSITORY, FindUserByEmailUseCase, GetProfileUseCase, UpdateProfileUseCase],
})
export class UsersModule {}
