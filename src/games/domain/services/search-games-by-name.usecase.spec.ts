import { SearchGamesByNameUseCase } from './search-games-by-name.usecase';
import { GAME_REPOSITORY, IGameRepository } from '../repositories/game.repository';

describe('SearchGamesByNameUseCase', () => {
  it('returns games from repository', async () => {
    const repo: jest.Mocked<IGameRepository> = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      searchByName: jest.fn().mockResolvedValue([{ id: '1', name: 'Game' }] as any),
      findByNames: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as any;

    const useCase = new SearchGamesByNameUseCase(repo);
    const result = await useCase.execute('ga');
    expect(repo.searchByName).toHaveBeenCalledWith('ga');
    expect(result[0].id).toBe('1');
  });
});
