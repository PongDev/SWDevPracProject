import * as bcrypt from 'bcrypt';
import { Role, User } from 'database';
import { RecordAlreadyExists } from 'src/common/commonError';
import { CreateUserRequest } from 'types';

export const userData = {
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
export const mockUsersService = {
  register: (req: CreateUserRequest): User => {
    console.log(req);
    console.log('..............');
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
