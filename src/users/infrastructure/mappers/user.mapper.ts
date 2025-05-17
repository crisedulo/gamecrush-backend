import { UserEntity } from '../../domain/entities/user.entity';
import { UserDocument } from '../database/schemas/user.schema';

export class UserMapper {
  static toEntity(doc: UserDocument): UserEntity {
    return new UserEntity(
      (doc._id as any).toString(),
      doc.gamerTag,
      doc.email,
      doc.password,
      doc.favoriteGames.map((id) => id.toString()),
      doc.platforms,
      doc.genres,
      doc.country,
      doc.available,
      doc.hasMic,
      doc.showGamerTag,
      doc.photos,
    );
  }

  static toPersistence(entity: Partial<UserEntity>) {
    return {
      gamerTag: entity.gamerTag,
      email: entity.email,
      password: entity.password,
      favoriteGames: entity.favoriteGames ?? [],
      platforms: entity.platforms ?? [],
      genres: entity.genres ?? [],
      country: entity.country ?? '',
      available: entity.available ?? true,
      hasMic: entity.hasMic ?? false,
      showGamerTag: entity.showGamerTag ?? true,
      photos: entity.photos ?? [],
    };
  }
}
