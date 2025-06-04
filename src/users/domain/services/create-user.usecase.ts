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

    if (data.favoriteGames?.length) {
      for (const id of data.favoriteGames) {
        const exists = await this.gameRepository.findById(id);
        if (!exists) {
          throw new NotFoundException(`Juego no encontrado: ${id}`);
        }
      }
    }

    const salt = randomBytes(8).toString('hex');
    const hash = scryptSync(data.password, salt, 32).toString('hex');
    const hashed = `${salt}.${hash}`;

    return this.userRepository.create({ ...data, password: hashed });
  }
}
