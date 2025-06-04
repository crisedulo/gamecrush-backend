import { NotFoundException } from '@nestjs/common';
import { UpdateProfileUseCase } from './update-profile.usecase';
import { UpdateProfileInput } from '../../application/dto/update-profile.input';
import { IUserRepository } from '../repositories/user.repository';
import { IGameRepository } from '../../../games/domain/repositories/game.repository';

describe('UpdateProfileUseCase', () => {
  let useCase: UpdateProfileUseCase;
  let userRepo: jest.Mocked<IUserRepository>;
  let gameRepo: jest.Mocked<IGameRepository>;

  beforeEach(() => {
    userRepo = {
      create: jest.fn(),
      findByEmail: jest.fn(),
      findByGamerTag: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
    } as any;
    gameRepo = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      searchByName: jest.fn(),
      findByNames: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as any;
    useCase = new UpdateProfileUseCase(userRepo, gameRepo);
  });

  it('updates user when games exist', async () => {
    const input: UpdateProfileInput = { favoriteGames: ['Valorant'] } as any;
    gameRepo.findByNames.mockResolvedValue([{ id: '1', name: 'Valorant' }] as any);
    userRepo.update.mockResolvedValue({ id: 'u1' } as any);

    const res = await useCase.execute('u1', input);
    expect(res.id).toBe('u1');
    expect(userRepo.update).toHaveBeenCalledWith('u1', {
      ...input,
      favoriteGames: ['1'],
    });
  });

  it('throws when game not found', async () => {
    const input: UpdateProfileInput = { favoriteGames: ['Missing'] } as any;
    gameRepo.findByNames.mockResolvedValue([]);
    await expect(useCase.execute('u1', input)).rejects.toBeInstanceOf(NotFoundException);
  });
});
