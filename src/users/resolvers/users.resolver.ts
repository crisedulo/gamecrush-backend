import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateUserUseCase } from '../domain/services/create-user.usecase';
import { FindUserByEmailUseCase } from '../domain/services/find-user-by-email.usecase';
import { CreateUserInput } from '../application/dto/create-user.input';
import { FindUserByEmailInput } from '../application/dto/find-user-by-email.input';
import { UserOutput } from '../application/dto/user.output';

@Resolver(() => UserOutput)
export class UsersResolver {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
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
}
