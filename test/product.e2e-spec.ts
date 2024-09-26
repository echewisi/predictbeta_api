import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('ProductController (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;
  let productId: string;

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
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password',
      })
      .then(({ body }) => {
        accessToken = body.access_token;
      });
  });

  it('/products (POST) should create a new product', () => {
    return request(app.getHttpServer())
      .post('/products')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Laptop',
        description: 'High-performance laptop',
        price: 1200.5,
      })
      .expect(201)
      .expect(({ body }) => {
        productId = body.id;
        expect(body.name).toEqual('Laptop');
        expect(body.price).toEqual(1200.5);
      });
  });

  it('/products (GET) should get all products', () => {
    return request(app.getHttpServer())
      .get('/products')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body.length).toBeGreaterThan(0);
      });
  });

  it('/products/:id (PATCH) should update a product', () => {
    return request(app.getHttpServer())
      .patch(`/products/${productId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        price: 1300.75,
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body.price).toEqual(1300.75);
      });
  });

  it('/products/:id (DELETE) should delete a product', () => {
    return request(app.getHttpServer())
      .delete(`/products/${productId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
