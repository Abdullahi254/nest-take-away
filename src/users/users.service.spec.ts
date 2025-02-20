import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { mockCollection, mockWhere, mockGet, mockAdd, mockLimit, mockSet } from 'firestore-jest-mock/mocks/firestore';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should create user if email is unique', async () => {
    // Mock Firestore behavior
    mockCollection.mockReturnThis();
    mockWhere.mockReturnThis();
    mockLimit.mockReturnThis();
  
    mockGet.mockResolvedValue({
      empty: true, // No existing user
      docs: [],
    });
  
    mockAdd.mockResolvedValue({ id: 'newUserId' });
  
    const user: CreateUserDto = {
      name: 'John Doe',
      email: 'unique@example.com',
      phone: '+254788987654',
    };
  
    expect(user).toEqual({
      name: 'John Doe',
      email: 'unique@example.com',
      phone: '+254788987654',
    });
  
  });
  


  it('should throw ConflictException if email already exists', async () => {
    mockWhere.mockReturnThis();
    mockLimit.mockReturnThis();
    mockGet.mockResolvedValue({ empty: false }); // Email exists

    const dto: CreateUserDto = {
      name: 'Jane Doe',
      email: 'existing@example.com',
      phone: '+254788987654',
    };

    await expect(service.createUser(dto)).rejects.toThrow(ConflictException);
  });



});
