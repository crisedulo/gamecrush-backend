import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { LoginInput } from './application/dto/login.input';
import { AuthOutput } from './application/dto/auth.output';
import { LoginUseCase } from './domain/use-cases/login.usecase';

@Resolver()
export class AuthResolver {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Mutation(() => AuthOutput)
  async login(@Args('input') input: LoginInput): Promise<AuthOutput> {
    const token = await this.loginUseCase.execute(input.email, input.password);
    return { accessToken: token };
  }
}
