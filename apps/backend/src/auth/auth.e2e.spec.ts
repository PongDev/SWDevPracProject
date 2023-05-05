import { INestApplication, ValidationPipe, HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import * as request from 'supertest';
import { AuthModule } from './auth.module';
import { mockUsersService } from '../../test/mockUsersService';

describe('AuthModule (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule],
    })
      .overrideProvider(PrismaService)
      .useValue({})
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  describe('register user', () => {
    describe('missing field', () => {
      it('should return 400', () => {
        return request(app.getHttpServer())
          .post('/auth/register')
          .send({
            name: 'Test Register',
            email: 'john@gmail.com',
            password: '33333',
          })
          .expect(HttpStatus.BAD_REQUEST);
      });
    });
    describe('invalid email', () => {
      it('should return 400', () => {
        return request(app.getHttpServer())
          .post('/auth/register')
          .send({
            name: 'Test Register',
            email: 'johngmail.com',
            password: '33333',
            tel: '0888888888',
          })
          .expect(HttpStatus.BAD_REQUEST);
      });
    });
    describe('invalid phone number', () => {
      it('should return 400', () => {
        return request(app.getHttpServer())
          .post('/auth/register')
          .send({
            name: 'Test Register',
            email: 'john@gmail.com',
            password: '33333',
            tel: '077',
          })
          .expect(HttpStatus.BAD_REQUEST);
      });
    });
    describe('all field presented', () => {
      it('should return 201', () => {
        return request(app.getHttpServer())
          .post('/auth/register')
          .send({
            name: 'Test Register',
            email: 'john2@gmail.com',
            password: '33333',
            tel: '0888888888',
          })
          .expect(HttpStatus.CREATED);
      });
    });
  });

  describe('login user', () => {
    describe('missing password', () => {
      it('should return 400', () => {
        return request(app.getHttpServer())
          .post('/auth/login')
          .send({
            email: 'test1@gmail.com',
          })
          .expect(HttpStatus.BAD_REQUEST);
      });
    });
    describe('missing email', () => {
      it('should return 400', () => {
        return request(app.getHttpServer())
          .post('/auth/login')
          .send({
            password: '12345',
          })
          .expect(HttpStatus.BAD_REQUEST);
      });
    });
    describe('invalid email', () => {
      it('should return 400', () => {
        return request(app.getHttpServer())
          .post('/auth/login')
          .send({
            email: 'test1@gmail',
            password: '12345',
          })
          .expect(HttpStatus.BAD_REQUEST);
      });
    });
    describe('incorrect password', () => {
      it('should return 401', () => {
        return request(app.getHttpServer())
          .post('/auth/login')
          .send({
            email: 'test1@gmail.com',
            password: '000000',
          })
          .expect(HttpStatus.UNAUTHORIZED);
      });
    });
    describe('all field presented', () => {
      it('should return 200', () => {
        return request(app.getHttpServer())
          .post('/auth/login')
          .send({
            email: 'test1@gmail.com',
            password: '12345',
          })
          .expect(HttpStatus.OK);
      });
    });
  });

  describe('refresh', () => {
    describe('invalid refresh token', () => {
      it('should return 401', async () => {
        // login to get refreshToken
        const res = await request(app.getHttpServer())
          .post('/auth/login')
          .send({
            email: 'test1@gmail.com',
            password: '12345',
          });
        // user refreshToken
        const res2 = await request(app.getHttpServer())
          .post('/auth/refresh')
          .set('Authorization', `Bearer ${res.body.refreshToken}0`);
        expect(res2.statusCode).toBe(HttpStatus.UNAUTHORIZED);
      });
    });
    describe('valid refresh token', () => {
      it('should return 200', async () => {
        // login to get refreshToken
        const res = await request(app.getHttpServer())
          .post('/auth/login')
          .send({
            email: 'test1@gmail.com',
            password: '12345',
          });
        // user refreshToken
        const res2 = await request(app.getHttpServer())
          .post('/auth/refresh')
          .set('Authorization', `Bearer ${res.body.refreshToken}`);
        expect(res2.statusCode).toBe(HttpStatus.OK);
      });
    });
  });
});
