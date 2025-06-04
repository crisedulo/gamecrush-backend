import * as request from 'supertest';
jest.setTimeout(30000);
import { INestApplication } from '@nestjs/common';
import { createTestApp } from '../helpers/create-test-app';

describe('HealthCheck', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await createTestApp();
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
});
