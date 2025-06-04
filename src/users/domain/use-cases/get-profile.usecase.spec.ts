import { NotFoundException } from '@nestjs/common';
import { GetProfileUseCase } from './get-profile.usecase';
import { IUserRepository } from '../repositories/user.repository';

describe('GetProfileUseCase', () => {
  it('returns user when found', async () => {
    const repo: jest.Mocked<IUserRepository> = {
      create: jest.fn(),
      findByEmail: jest.fn(),
      findByGamerTag: jest.fn(),
      findById: jest.fn().mockResolvedValue({ id: '1' } as any),
      update: jest.fn(),
    } as any;
    const useCase = new GetProfileUseCase(repo);
    const user = await useCase.execute('1');
    expect(user.id).toBe('1');
  });

  it('throws when not found', async () => {
    const repo: jest.Mocked<IUserRepository> = {
      create: jest.fn(),
      findByEmail: jest.fn(),
      findByGamerTag: jest.fn(),
      findById: jest.fn().mockResolvedValue(null),
      update: jest.fn(),
    } as any;
    const useCase = new GetProfileUseCase(repo);
    await expect(useCase.execute('1')).rejects.toBeInstanceOf(NotFoundException);
  });
});
