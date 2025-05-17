import { GameEntity } from '../entities/game.entity';

export const GAME_REPOSITORY = Symbol('GAME_REPOSITORY');

export interface IGameRepository {
  create(game: Partial<GameEntity>): Promise<GameEntity>;

  findAll(): Promise<GameEntity[]>;
}
