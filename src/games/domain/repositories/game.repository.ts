import { GameEntity } from '../entities/game.entity';

export const GAME_REPOSITORY = Symbol('GAME_REPOSITORY');

export interface IGameRepository {
  create(game: Partial<GameEntity>): Promise<GameEntity>;

  findAll(): Promise<GameEntity[]>;

  findById(id: string): Promise<GameEntity | null>;

  searchByName(name: string): Promise<GameEntity[]>;

  findByNames(names: string[]): Promise<GameEntity[]>;

  update(id: string, data: Partial<GameEntity>): Promise<GameEntity | null>;

  delete(id: string): Promise<boolean>;
}
