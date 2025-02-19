import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { ConflictException } from '@nestjs/common';
import { mockCollection, mockWhere, mockGet, mockAdd} from 'firestore-jest-mock/mocks/firestore';


describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should throw error if email already exists', async () => {
    mockWhere.mockReturnThis();
    mockGet.mockResolvedValue({
      empty: false, // Simulating an existing user
    });

    await expect(
      service.createUser({ name: 'John', email: 'test@example.com', phone: '+254788987654' }),
    ).rejects.toThrow(ConflictException);
  });

  it('should create user if email is unique', async () => {
    mockWhere.mockReturnThis();
    mockGet.mockResolvedValue({ empty: true }); // No existing user
    mockAdd.mockResolvedValue({ id: 'newUserId' });

    const result = await service.createUser({
      name: 'John',
      email: 'unique@example.com',
      phone: '+254788987654',
    });

    expect(result).toEqual({ id: 'newUserId', name: 'John', email: 'unique@example.com', phone: '+254788987654' });
  });
});
