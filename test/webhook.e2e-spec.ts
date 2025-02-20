import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('WebhookController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should reject unauthorized webhook requests', async () => {
    await request(app.getHttpServer())
      .post('/webhook')
      .send({ message: 'Hello', phone: '+254788181818' })
      .expect(401);
  });

  it('should process a valid webhook request', async () => {
    await request(app.getHttpServer())
      .post('/webhook')
      .set('Authorization', 'Bearer my_secret_token')
      .send({ message: 'Hello', phone: '+254788181812' })
      .expect(201);
  });

  it('should send automated reply for "help" message', async () => {
    const response = await request(app.getHttpServer())
      .post('/webhook')
      .set('Authorization', 'Bearer my_secret_token')
      .send({ message: 'help', phone: '+254788181812' })
      .expect(201);

    expect(response.body).toEqual({ reply: 'Support contact: support@company.com' });
  });

  afterAll(async () => {
    await app.close();
  });
});
