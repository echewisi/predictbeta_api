import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;
  let userId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Register and login to get the access token
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@example.com',
        password: 'password',
      })
      .then(({ body }) => {
        accessToken = body.access_token;
      });
  });

  it('/users (POST) should create a new user', () => {
    return request(app.getHttpServer())
      .post('/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        firstName: 'Alice',
        lastName: 'Smith',
        email: 'alice@example.com',
        password: 'password',
      })
      .expect(201)
      .expect(({ body }) => {
        userId = body.id;
        expect(body.firstName).toEqual('Alice');
        expect(body.email).toEqual('alice@example.com');
      });
  });

  it('/users (GET) should get all users', () => {
    return request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body.length).toBeGreaterThan(0);
      });
  });

  it('/users/:id (PATCH) should update a user', () => {
    return request(app.getHttpServer())
      .patch(`/users/${userId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        lastName: 'Johnson',
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body.lastName).toEqual('Johnson');
      });
  });

  it('/users/:id (DELETE) should delete a user', () => {
    return request(app.getHttpServer())
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
