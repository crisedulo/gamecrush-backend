import { Inject, Injectable, ConflictException } from '@nestjs/common';
import { CreateUserInput } from '../../application/dto/create-user.input';
import {
  IUserRepository,
  USER_REPOSITORY,
} from '../repositories/user.repository';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(data: CreateUserInput): Promise<UserEntity> {
    const existing = await this.userRepository.findByEmail(data.email);
    if (existing) {
      throw new ConflictException('El correo ya está registrado');
    }

    return this.userRepository.create(data);
  }
}
