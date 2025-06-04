import {
  Inject,
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserInput } from '../../application/dto/create-user.input';
import {
  IUserRepository,
  USER_REPOSITORY,
} from '../repositories/user.repository';
import { UserEntity } from '../entities/user.entity';
import { GAME_REPOSITORY, IGameRepository } from '../../../games/domain/repositories/game.repository';
import { scryptSync, randomBytes } from 'crypto';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(GAME_REPOSITORY)
    private readonly gameRepository: IGameRepository,
  ) {}

  async execute(data: CreateUserInput): Promise<UserEntity> {
    const emailExists = await this.userRepository.findByEmail(data.email);
    if (emailExists) {
      throw new ConflictException('El correo ya está registrado');
    }
    const tagExists = await this.userRepository.findByGamerTag(data.gamerTag);
    if (tagExists) {
      throw new ConflictException('El GamerTag ya está registrado');
    }

    let favoriteGameIds: string[] = [];
    if (data.favoriteGames?.length) {
      const games = await this.gameRepository.findByNames(data.favoriteGames);
      if (games.length !== data.favoriteGames.length) {
        const found = games.map((g) => g.name);
        const missing = data.favoriteGames.filter((n) => !found.includes(n));
        throw new NotFoundException(`Juego no encontrado: ${missing.join(', ')}`);
      }
      favoriteGameIds = games.map((g) => g.id);
    }

    const salt = randomBytes(8).toString('hex');
    const hash = scryptSync(data.password, salt, 32).toString('hex');
    const hashed = `${salt}.${hash}`;

    return this.userRepository.create({
      ...data,
      favoriteGames: favoriteGameIds,
      password: hashed,
    });
  }
}
