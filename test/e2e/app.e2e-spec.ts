import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { INestApplication } from '@nestjs/common';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to the Gitception API!');
  });

  it('should throw BadRequest error', () => {
    const response = request(app.getHttpServer())
      .post('/github/auth')
      .set('code', 'wrong code');

    response.expect(400);
    response.expect('message', /bad_verification_code/);

  });

  afterAll(async () => {
    await app.close();
  });

});
