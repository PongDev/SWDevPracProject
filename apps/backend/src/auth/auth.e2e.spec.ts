import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { Role, User } from 'database';
import { RecordAlreadyExists } from 'src/common/commonError';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { CreateUserRequest } from 'types';
import * as request from 'supertest';
import { AuthModule } from './auth.module';

describe('UsersController', () => {
  let app: INestApplication;
  const userData = {
    1: {
      id: 1,
      email: 'test1@gmail.com',
      password: bcrypt.hashSync('12345', 10),
      name: 'test1',
      tel: '0958497456',
      role: Role.ADMIN,
    },
    2: {
      id: 2,
      email: 'test2@gmail.com',
      password: bcrypt.hashSync('1234567', 10),
      name: 'test2',
      tel: '0957777777',
      role: Role.USER,
    },
  };
  const mockUsersService = {
    register: (req: CreateUserRequest): User => {
      const { password, ...data } = req;
      const hashedPassword = bcrypt.hashSync(password, 10);
      if (Object.values(userData).some((user) => user.email === data.email)) {
        throw new RecordAlreadyExists(`Email already exists.`);
      }
      return {
        id: 3,
        email: data.email,
        name: data.name,
        password: hashedPassword,
        tel: data.tel,
        role: Role.USER,
      };
    },
    getUserByEmail: (email: string): User => {
      for (const user of Object.values(userData)) {
        if (user.email === email) {
          return user;
        }
      }
      return null;
    },
    getUserByUserId: (userId: number): User => {
      if (!userData[userId]) {
        return null;
      }
      return userData[userId];
    },
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      // imports: [PassportModule, UsersModule, JwtModule.register({})],
      imports: [AuthModule],
      // imports: [AppModule],
      // controllers: [AppController],
      // providers: [AppService],
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

    console.log('----------------------------');
    console.log(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  describe('register user', () => {
    describe('missing field', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'john@gmail.com', password: '33333', tel: '0888888888' })
        .expect(500);
    });
  });
});
