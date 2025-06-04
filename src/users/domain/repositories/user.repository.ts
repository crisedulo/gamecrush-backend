import { UserEntity } from '../entities/user.entity';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export abstract class IUserRepository {
  abstract create(user: Partial<UserEntity>): Promise<UserEntity>;
  abstract findByEmail(email: string): Promise<UserEntity | null>;
  abstract findByGamerTag(gamerTag: string): Promise<UserEntity | null>;
}
