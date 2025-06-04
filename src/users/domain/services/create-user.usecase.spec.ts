import { ConflictException, NotFoundException } from '@nestjs/common';
import { CreateUserUseCase } from './create-user.usecase';
import { CreateUserInput } from '../../application/dto/create-user.input';
import { USER_REPOSITORY, IUserRepository } from '../repositories/user.repository';
import { GAME_REPOSITORY, IGameRepository } from '../../../games/domain/repositories/game.repository';

const baseInput: CreateUserInput = {
  gamerTag: 'Player1',
  email: 'test@example.com',
  password: 'secret',
  favoriteGames: ['1'],
  platforms: ['PC'],
  genres: [],
  country: 'GT',
  available: true,
  hasMic: true,
  showGamerTag: true,
  photos: [],
  styleOfPlay: 'Casual',
  availability: ['Manana'],
  languages: ['es'],
  termsAccepted: true,
};

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let userRepo: jest.Mocked<IUserRepository>;
  let gameRepo: jest.Mocked<IGameRepository>;

  beforeEach(() => {
    userRepo = {
      create: jest.fn(),
      findByEmail: jest.fn(),
      findByGamerTag: jest.fn(),
    } as any;
    gameRepo = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      searchByName: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as any;

    useCase = new CreateUserUseCase(userRepo, gameRepo);
  });

  it('should create user with hashed password', async () => {
    userRepo.findByEmail.mockResolvedValue(null);
    userRepo.findByGamerTag.mockResolvedValue(null);
    gameRepo.findById.mockResolvedValue({ id: '1', name: 'Game' } as any);
    userRepo.create.mockImplementation(async (u) => u as any);

    const result = await useCase.execute({ ...baseInput });
    expect(result.password).not.toBe(baseInput.password);
    expect(userRepo.create).toHaveBeenCalled();
  });

  it('should throw when email exists', async () => {
    userRepo.findByEmail.mockResolvedValue({} as any);
    await expect(useCase.execute({ ...baseInput })).rejects.toBeInstanceOf(ConflictException);
  });

  it('should throw when gamerTag exists', async () => {
    userRepo.findByEmail.mockResolvedValue(null);
    userRepo.findByGamerTag.mockResolvedValue({} as any);
    await expect(useCase.execute({ ...baseInput })).rejects.toBeInstanceOf(ConflictException);
  });

  it('should throw when game does not exist', async () => {
    userRepo.findByEmail.mockResolvedValue(null);
    userRepo.findByGamerTag.mockResolvedValue(null);
    gameRepo.findById.mockResolvedValue(null);
    await expect(useCase.execute({ ...baseInput })).rejects.toBeInstanceOf(NotFoundException);
  });
});
