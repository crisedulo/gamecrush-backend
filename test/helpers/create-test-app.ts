import { Module, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { GamesResolver } from '../../src/games/resolvers/games.resolver';
import { UsersResolver } from '../../src/users/resolvers/users.resolver';
import { CreateGameUseCase } from '../../src/games/domain/services/create-game.usecase';
import { FindAllGamesUseCase } from '../../src/games/domain/services/find-all-games.usecase';
import { GameEntity } from '../../src/games/domain/entities/game.entity';
import { GAME_REPOSITORY, IGameRepository } from '../../src/games/domain/repositories/game.repository';
import { CreateUserUseCase } from '../../src/users/domain/services/create-user.usecase';
import { FindUserByEmailUseCase } from '../../src/users/domain/services/find-user-by-email.usecase';
import { UserEntity } from '../../src/users/domain/entities/user.entity';
import { USER_REPOSITORY, IUserRepository } from '../../src/users/domain/repositories/user.repository';

class InMemoryGameRepo implements IGameRepository {
  private games: GameEntity[] = [];
  async create(game: Partial<GameEntity>): Promise<GameEntity> {
    const entity = new GameEntity(
      (this.games.length + 1).toString(),
      game.name ?? '',
      game.genre,
      game.platforms,
      game.coverUrl,
      game.developer,
      game.releaseYear,
    );
    this.games.push(entity);
    return entity;
  }
  async findAll(): Promise<GameEntity[]> {
    return [...this.games];
  }
}

class InMemoryUserRepo implements IUserRepository {
  private users: UserEntity[] = [];
  async create(user: Partial<UserEntity>): Promise<UserEntity> {
    const entity = new UserEntity(
      (this.users.length + 1).toString(),
      user.gamerTag ?? '',
      user.email ?? '',
      user.password,
      user.favoriteGames ?? [],
      user.platforms ?? [],
      user.genres ?? [],
      user.country ?? '',
      user.available ?? true,
      user.hasMic ?? false,
      user.showGamerTag ?? true,
      user.photos ?? [],
    );
    this.users.push(entity);
    return entity;
  }
  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.users.find((u) => u.email === email) ?? null;
  }
}

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
    }),
  ],
  providers: [
    GamesResolver,
    UsersResolver,
    CreateGameUseCase,
    FindAllGamesUseCase,
    CreateUserUseCase,
    FindUserByEmailUseCase,
    { provide: GAME_REPOSITORY, useClass: InMemoryGameRepo },
    { provide: USER_REPOSITORY, useClass: InMemoryUserRepo },
  ],
})
class TestAppModule {}

export async function createTestApp(): Promise<INestApplication> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [TestAppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  await app.init();
  return app;
}
