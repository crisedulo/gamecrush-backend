jest.setTimeout(30000);
import { INestApplication, Module } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import * as request from 'supertest';
import { GamesResolver } from '../src/games/resolvers/games.resolver';
import { UsersResolver } from '../src/users/resolvers/users.resolver';
import { CreateGameUseCase } from '../src/games/domain/services/create-game.usecase';
import { FindAllGamesUseCase } from '../src/games/domain/services/find-all-games.usecase';
import { GameEntity } from '../src/games/domain/entities/game.entity';
import { GAME_REPOSITORY, IGameRepository } from '../src/games/domain/repositories/game.repository';
import { CreateUserUseCase } from '../src/users/domain/services/create-user.usecase';
import { FindUserByEmailUseCase } from '../src/users/domain/services/find-user-by-email.usecase';
import { UserEntity } from '../src/users/domain/entities/user.entity';
import { USER_REPOSITORY, IUserRepository } from '../src/users/domain/repositories/user.repository';

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

describe('GraphQL e2e', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestAppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('healthCheck query', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: '{ healthCheck }' })
      .expect(200);

    expect(res.body.data.healthCheck).toBeDefined();
  });

  it('create and fetch user', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: 'mutation($input: CreateUserInput!) { createUser(input: $input) { id email } }',
        variables: { input: { gamerTag: "tester", email: "test@example.com", password: "123456" } },
      })
      .expect(200);
    expect(createRes.body.data.createUser.email).toBe('test@example.com');

    const fetchRes = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: 'query($input: FindUserByEmailInput!) { getUserByEmail(input: $input) { id email } }',
        variables: { input: { email: 'test@example.com' } },
      })
      .expect(200);
    expect(fetchRes.body.data.getUserByEmail.email).toBe('test@example.com');
  });

  it('create and list games', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: 'mutation($input: CreateGameInput!) { createGame(input: $input) { id name } }',
        variables: { input: { name: 'Zelda' } },
      })
      .expect(200);
    expect(createRes.body.data.createGame.name).toBe('Zelda');

    const listRes = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: '{ getAllGames { id name } }' })
      .expect(200);
    expect(listRes.body.data.getAllGames).toHaveLength(1);
    expect(listRes.body.data.getAllGames[0].name).toBe('Zelda');
  });
});
