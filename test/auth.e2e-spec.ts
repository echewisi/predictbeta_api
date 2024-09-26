import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/register (POST) should register a new user', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password',
      })
      .expect(201)
      .expect(({ body }) => {
        expect(body.access_token).toBeDefined();
      });
  });

  it('/auth/login (POST) should login a user', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'john@example.com',
        password: 'password',
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body.access_token).toBeDefined();
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
