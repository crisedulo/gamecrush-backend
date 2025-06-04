import * as request from 'supertest';
jest.setTimeout(30000);
import { INestApplication } from '@nestjs/common';
import { createTestApp } from '../helpers/create-test-app';

describe('Users GraphQL', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await createTestApp();
  });

  afterEach(async () => {
    await app.close();
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
});
