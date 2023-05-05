import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { CompaniesModule } from './companies.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { CompaniesRepository } from './companies.repository';
import { AuthModule } from 'src/auth/auth.module';
import { companyData, mockCompanyRepo } from '../../test/mockCompaniesRepo';
import { UsersService } from 'src/users/users.service';
import { mockUsersService } from '../../test/mockUsersService';

describe('CompaniesModule (e2e)', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CompaniesModule, AuthModule],
    })
      .overrideProvider(PrismaService)
      .useValue({})
      .overrideProvider(CompaniesRepository)
      .useValue(mockCompanyRepo)
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

  describe('create company', () => {
    describe('unauthorized access', () => {
      it('should return 401', () => {
        return request(app.getHttpServer())
          .post('/companies')
          .send({
            name: 'Test company 3',
            street: 'Test street 3',
            city: 'Test city 3',
            state: 'Test state 3',
            zip: '10270',
            website: 'www.youtube.com',
            description: 'Loremsomethingcompany3',
            tel: '0987778889',
          })
          .expect(HttpStatus.UNAUTHORIZED);
      });
    });
    describe('all field presented but not admin', () => {
      it('should return 401', async () => {
        const res = await request(app.getHttpServer())
          .post('/auth/login')
          .send({
            email: 'test2@gmail.com',
            password: '1234567',
          });
        const { id, name, ...data } = companyData[1];
        const res2 = await request(app.getHttpServer())
          .post('/companies')
          .set('Authorization', `Bearer ${res.body.accessToken}`)
          .send({ name: 'Alibaba', ...data });
        expect(res2.statusCode).toBe(HttpStatus.UNAUTHORIZED);
      });
    });
    describe('missing field', () => {
      it('should return 400', async () => {
        const res = await request(app.getHttpServer())
          .post('/auth/login')
          .send({
            email: 'test1@gmail.com',
            password: '12345',
          });
        const { id, name, ...data } = companyData[1];
        const res2 = await request(app.getHttpServer())
          .post('/companies')
          .set('Authorization', `Bearer ${res.body.accessToken}`)
          .send(data);
        expect(res2.statusCode).toBe(HttpStatus.BAD_REQUEST);
      });
    });
    describe('invalid phone number', () => {
      it('should return 400', async () => {
        const res = await request(app.getHttpServer())
          .post('/auth/login')
          .send({
            email: 'test1@gmail.com',
            password: '12345',
          });
        const { id, tel, ...data } = companyData[1];
        const res2 = await request(app.getHttpServer())
          .post('/companies')
          .set('Authorization', `Bearer ${res.body.accessToken}`)
          .send({ ...data, tel: '02777777' });
        expect(res2.statusCode).toBe(HttpStatus.BAD_REQUEST);
      });
    });
    describe('all field presented', () => {
      it('should return 201', async () => {
        const res = await request(app.getHttpServer())
          .post('/auth/login')
          .send({
            email: 'test1@gmail.com',
            password: '12345',
          });
        const { id, name, ...data } = companyData[1];
        const res2 = await request(app.getHttpServer())
          .post('/companies')
          .set('Authorization', `Bearer ${res.body.accessToken}`)
          .send({ name: 'Alibaba', ...data });
        expect(res2.statusCode).toBe(HttpStatus.CREATED);
      });
    });
  });

  describe('findAll', () => {
    describe('normally access', () => {
      it('should return 200', async () => {
        const res = await request(app.getHttpServer())
          .get('/companies')
          .expect(HttpStatus.OK);
        expect(res.body).toStrictEqual([
          {
            id: 1,
            name: 'Test company 1',
            street: 'Test street 1',
            city: 'Test city 1',
            state: 'Test state 1',
            zip: '10270',
            website: 'www.google.com',
            description: 'Loremsomethingcompany1',
            tel: '0987778888',
          },
          {
            id: 2,
            name: 'Test company 2',
            street: 'Test street 2',
            city: 'Test city 2',
            state: 'Test state 2',
            zip: '10270',
            website: 'www.facebook.com',
            description: 'Loremsomethingcompany2',
            tel: '0987778888',
          },
        ]);
      });
    });
  });

  describe('findOne', () => {
    describe('invalid id', () => {
      it('should return 404', async () => {
        return await request(app.getHttpServer())
          .get('/companies/3')
          .expect(HttpStatus.NOT_FOUND);
      });
    });
    describe('valid id', () => {
      it('should return 200', async () => {
        const res = await request(app.getHttpServer())
          .get('/companies/2')
          .expect(HttpStatus.OK);
        expect(res.body).toStrictEqual({
          id: 2,
          name: 'Test company 2',
          street: 'Test street 2',
          city: 'Test city 2',
          state: 'Test state 2',
          zip: '10270',
          website: 'www.facebook.com',
          description: 'Loremsomethingcompany2',
          tel: '0987778888',
        });
      });
    });
  });

  describe('update company', () => {
    describe('unauthorized access', () => {
      it('should return 401', () => {
        return request(app.getHttpServer())
          .patch('/companies/1')
          .send({
            description: 'Hackerman',
          })
          .expect(HttpStatus.UNAUTHORIZED);
      });
    });
    describe('non-admin access', () => {
      it('should return 401', async () => {
        const res = await request(app.getHttpServer())
          .post('/auth/login')
          .send({
            email: 'test2@gmail.com',
            password: '1234567',
          });
        const res2 = await request(app.getHttpServer())
          .patch('/companies/1')
          .set('Authorization', `Bearer ${res.body.accessToken}`)
          .send({ name: 'NEW NAME FOR COMPANY' });
        expect(res2.statusCode).toBe(HttpStatus.UNAUTHORIZED);
      });
    });
    describe('valid access', () => {
      it('should return 200', async () => {
        const res = await request(app.getHttpServer())
          .post('/auth/login')
          .send({
            email: 'test1@gmail.com',
            password: '12345',
          });
        const res2 = await request(app.getHttpServer())
          .patch('/companies/1')
          .set('Authorization', `Bearer ${res.body.accessToken}`)
          .send({ name: 'Alibaba' });
        expect(res2.statusCode).toBe(HttpStatus.OK);
      });
    });
  });

  describe('remove company', () => {
    describe('unauthorized access', () => {
      it('should return 401', () => {
        return request(app.getHttpServer())
          .delete('/companies/1')
          .expect(HttpStatus.UNAUTHORIZED);
      });
    });
    describe('non-admin access', () => {
      it('should return 401', async () => {
        const res = await request(app.getHttpServer())
          .post('/auth/login')
          .send({
            email: 'test2@gmail.com',
            password: '1234567',
          });
        const res2 = await request(app.getHttpServer())
          .delete('/companies/1')
          .set('Authorization', `Bearer ${res.body.accessToken}`);
        expect(res2.statusCode).toBe(HttpStatus.UNAUTHORIZED);
      });
    });
    describe('valid access', () => {
      it('should return 200', async () => {
        const res = await request(app.getHttpServer())
          .post('/auth/login')
          .send({
            email: 'test1@gmail.com',
            password: '12345',
          });
        const res2 = await request(app.getHttpServer())
          .delete('/companies/1')
          .set('Authorization', `Bearer ${res.body.accessToken}`);
        expect(res2.statusCode).toBe(HttpStatus.OK);
      });
    });
  });
});
