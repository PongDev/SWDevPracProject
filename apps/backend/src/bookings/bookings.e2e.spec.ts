import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { mockCompanyRepo } from '../../test/mockCompaniesRepo';
import { UsersService } from 'src/users/users.service';
import { mockUsersService } from '../../test/mockUsersService';
import { BookingsModule } from './bookings.module';
import { CompaniesModule } from 'src/companies/companies.module';
import { CompaniesRepository } from 'src/companies/companies.repository';
import { bookingData, mockBookingRepo } from '../../test/mockBookingRepo';
import { BookingsRepository } from './bookings.repository';

describe('BookingModule (e2e)', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BookingsModule, CompaniesModule, AuthModule],
    })
      .overrideProvider(PrismaService)
      .useValue({})
      .overrideProvider(CompaniesRepository)
      .useValue(mockCompanyRepo)
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .overrideProvider(BookingsRepository)
      .useValue(mockBookingRepo)
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

  describe('create booking', () => {
    describe('unauthorized access', () => {
      it('should return 401', () => {
        return request(app.getHttpServer())
          .post('/bookings')
          .send({
            startDate: new Date('May 12, 2022 04:00:00'),
            endDate: new Date('May 13, 2022 05:00:00'),
            userId: 1,
            companyId: 1,
          })
          .expect(HttpStatus.UNAUTHORIZED);
      });
    });
    describe('missing field', () => {
      it('should return 400', async () => {
        const res = await request(app.getHttpServer())
          .post('/auth/login')
          .send({
            email: 'test2@gmail.com',
            password: '1234567',
          });
        const { id, startDate, ...data } = bookingData[1];
        const res2 = await request(app.getHttpServer())
          .post('/bookings')
          .set('Authorization', `Bearer ${res.body.accessToken}`)
          .send(data);
        expect(res2.statusCode).toBe(HttpStatus.BAD_REQUEST);
      });
    });
    describe('invalid date', () => {
      it('should return 400', async () => {
        const res = await request(app.getHttpServer())
          .post('/auth/login')
          .send({
            email: 'test2@gmail.com',
            password: '1234567',
          });
        const { id, startDate, ...data } = bookingData[1];
        const res2 = await request(app.getHttpServer())
          .post('/bookings')
          .set('Authorization', `Bearer ${res.body.accessToken}`)
          .send({ ...data, startDate: new Date('March 12, 2022 05:00:00') });
        expect(res2.statusCode).toBe(HttpStatus.BAD_REQUEST);
      });
    });
    describe('all field valid', () => {
      it('should return 201', async () => {
        const res = await request(app.getHttpServer())
          .post('/auth/login')
          .send({
            email: 'test2@gmail.com',
            password: '1234567',
          });
        const { id, ...data } = bookingData[2];
        const res2 = await request(app.getHttpServer())
          .post('/bookings')
          .set('Authorization', `Bearer ${res.body.accessToken}`)
          .send(data);
        expect(res2.statusCode).toBe(HttpStatus.CREATED);
      });
    });
  });

  describe('findAll', () => {
    describe('non-admin access', () => {
      it('should return 401', async () => {
        const res = await request(app.getHttpServer())
          .get('/bookings')
          .expect(HttpStatus.UNAUTHORIZED);
      });
    });
    describe('admin access', () => {
      it('should return 200', async () => {
        const res = await request(app.getHttpServer())
          .post('/auth/login')
          .send({
            email: 'test1@gmail.com',
            password: '12345',
          });
        return await request(app.getHttpServer())
          .get('/bookings')
          .set('Authorization', `Bearer ${res.body.accessToken}`)
          .expect(HttpStatus.OK);
      });
    });
  });

  describe('findOne', () => {
    describe("unauthorized access: view another user's booking", () => {
      it('should return 401', async () => {
        // normal user (id2) with booking(id2)
        const res = await request(app.getHttpServer())
          .post('/auth/login')
          .send({
            email: 'test2@gmail.com',
            password: '1234567',
          });
        return await request(app.getHttpServer())
          .get('/bookings/1')
          .set('Authorization', `Bearer ${res.body.accessToken}`)
          .expect(HttpStatus.UNAUTHORIZED);
      });
    });
    describe('authorized access', () => {
      it('should return 200', async () => {
        const res = await request(app.getHttpServer())
          .post('/auth/login')
          .send({
            email: 'test2@gmail.com',
            password: '1234567',
          });
        return await request(app.getHttpServer())
          .get('/bookings/2')
          .set('Authorization', `Bearer ${res.body.accessToken}`)
          .expect(HttpStatus.OK);
      });
    });
    describe("admin access other people's bookings", () => {
      it('should return 200', async () => {
        const res = await request(app.getHttpServer())
          .post('/auth/login')
          .send({
            email: 'test1@gmail.com',
            password: '12345',
          });
        return await request(app.getHttpServer())
          .get('/bookings/2')
          .set('Authorization', `Bearer ${res.body.accessToken}`)
          .expect(HttpStatus.OK);
      });
    });
  });

  describe('remove booking', () => {
    describe('unauthorized access', () => {
      it('should return 401', async () => {
        // normal user (id2) with booking(id2)
        const res = await request(app.getHttpServer())
          .post('/auth/login')
          .send({
            email: 'test2@gmail.com',
            password: '1234567',
          });
        return await request(app.getHttpServer())
          .delete('/bookings/1')
          .set('Authorization', `Bearer ${res.body.accessToken}`)
          .expect(HttpStatus.UNAUTHORIZED);
      });
    });
    describe('authorized access', () => {
      it('should return 200', async () => {
        const res = await request(app.getHttpServer())
          .post('/auth/login')
          .send({
            email: 'test2@gmail.com',
            password: '1234567',
          });
        return await request(app.getHttpServer())
          .delete('/bookings/2')
          .set('Authorization', `Bearer ${res.body.accessToken}`)
          .expect(HttpStatus.OK);
      });
    });
    describe("admin delete other user's booking", () => {
      it('should return 200', async () => {
        const res = await request(app.getHttpServer())
          .post('/auth/login')
          .send({
            email: 'test1@gmail.com',
            password: '12345',
          });
        return await request(app.getHttpServer())
          .delete('/bookings/1')
          .set('Authorization', `Bearer ${res.body.accessToken}`)
          .expect(HttpStatus.OK);
      });
    });
  });

  describe('update booking', () => {
    describe('unauthorized access', () => {
      it('should return 401', async () => {
        // normal user (id2) with booking(id2)
        const res = await request(app.getHttpServer())
          .post('/auth/login')
          .send({
            email: 'test2@gmail.com',
            password: '1234567',
          });
        return await request(app.getHttpServer())
          .patch('/bookings/1')
          .set('Authorization', `Bearer ${res.body.accessToken}`)
          .send({
            startDate: new Date('May 11, 2022 04:00:00'),
          })
          .expect(HttpStatus.UNAUTHORIZED);
      });
    });
    describe('authorized access, date < minDate', () => {
      it('should return 404', async () => {
        const res = await request(app.getHttpServer())
          .post('/auth/login')
          .send({
            email: 'test2@gmail.com',
            password: '1234567',
          });
        return await request(app.getHttpServer())
          .patch('/bookings/2')
          .set('Authorization', `Bearer ${res.body.accessToken}`)
          .send({
            startDate: new Date('May 9, 2022 20:00:00'),
          })
          .expect(HttpStatus.BAD_REQUEST);
      });
    });
    // describe('authorized access, startDate > endDate', () => {
    //     it('should return 404', async () => {
    //         const res = await request(app.getHttpServer())
    //             .post('/auth/login')
    //             .send({
    //                 email: 'test2@gmail.com',
    //                 password: '1234567',
    //             });
    //         return await request(app.getHttpServer())
    //             .patch('/bookings/2')
    //             .set('Authorization', `Bearer ${res.body.accessToken}`)
    //             .send({
    //                 startDate: new Date('May 11, 2022 20:00:00')
    //             })
    //             .expect(HttpStatus.BAD_REQUEST);
    //     });
    // });
  });
});
