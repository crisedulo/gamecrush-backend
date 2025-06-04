import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { CreateUserUseCase } from '../domain/use-cases/create-user.usecase';
import { FindUserByEmailUseCase } from '../domain/use-cases/find-user-by-email.usecase';
import { GetProfileUseCase } from '../domain/use-cases/get-profile.usecase';
import { UpdateProfileUseCase } from '../domain/use-cases/update-profile.usecase';
import { CreateUserInput } from '../application/dto/create-user.input';
import { FindUserByEmailInput } from '../application/dto/find-user-by-email.input';
import { UpdateProfileInput } from '../application/dto/update-profile.input';
import { UserOutput } from '../application/dto/user.output';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard';

@Resolver(() => UserOutput)
export class UsersResolver {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
    private readonly getProfileUseCase: GetProfileUseCase,
    private readonly updateProfileUseCase: UpdateProfileUseCase,
  ) {}

  // 🔧 Esta query es obligatoria para que GraphQL compile
  @Query(() => String)
  healthCheck(): string {
    return 'API OK';
  }

  @Mutation(() => UserOutput)
  async createUser(@Args('input') input: CreateUserInput): Promise<UserOutput> {
    return await this.createUserUseCase.execute(input);
  }

  @Query(() => UserOutput)
  async getUserByEmail(
    @Args('input') input: FindUserByEmailInput,
  ): Promise<UserOutput> {
    return this.findUserByEmailUseCase.execute(input.email);
  }

  @Query(() => UserOutput)
  @UseGuards(GqlAuthGuard)
  async getMyProfile(@Context('req') req: any): Promise<UserOutput> {
    const userId = req.user.sub;
    return this.getProfileUseCase.execute(userId);
  }

  @Mutation(() => UserOutput)
  @UseGuards(GqlAuthGuard)
  async updateMyProfile(
    @Context('req') req: any,
    @Args('input') input: UpdateProfileInput,
  ): Promise<UserOutput> {
    const userId = req.user.sub;
    return this.updateProfileUseCase.execute(userId, input);
  }
}
