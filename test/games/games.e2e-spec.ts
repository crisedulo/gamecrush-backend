import * as request from 'supertest';
jest.setTimeout(30000);
import { INestApplication } from '@nestjs/common';
import { createTestApp } from '../helpers/create-test-app';

describe('Games GraphQL', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await createTestApp();
  });

  afterEach(async () => {
    await app.close();
  });

  it('create and list games', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: 'mutation($input: CreateGameInput!) { createGame(input: $input) { id name } }',
        variables: { input: { name: "Zelda" } },
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
