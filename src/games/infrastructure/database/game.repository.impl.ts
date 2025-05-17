import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game, GameDocument } from './schemas/game.schema';
import { IGameRepository } from '../../domain/repositories/game.repository';
import { GameEntity } from '../../domain/entities/game.entity';

@Injectable()
export class GameRepositoryImpl implements IGameRepository {
  constructor(@InjectModel(Game.name) private model: Model<GameDocument>) {}

  async create(game: Partial<GameEntity>): Promise<GameEntity> {
    const created = await this.model.create(game);
    return new GameEntity(
      (created._id as any).toString(),
      created.name,
      created.genre,
      created.platforms,
      created.coverUrl,
      created.developer,
      created.releaseYear,
    );
  }

  async findAll(): Promise<GameEntity[]> {
    const games = await this.model.find();
    return games.map(
      (g) =>
        new GameEntity(
          (g._id as any).toString(),
          g.name,
          g.genre,
          g.platforms,
          g.coverUrl,
          g.developer,
          g.releaseYear,
        ),
    );
  }
}
