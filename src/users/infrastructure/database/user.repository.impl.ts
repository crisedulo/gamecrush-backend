import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserRepository } from '../../domain/repositories/user.repository';
import { User, UserDocument } from './schemas/user.schema';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
  constructor(@InjectModel(User.name) private model: Model<UserDocument>) {}

  async create(user: Partial<UserEntity>): Promise<UserEntity> {
    const doc = new this.model(UserMapper.toPersistence(user));
    const saved = await doc.save();
    return UserMapper.toEntity(saved);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const doc = await this.model.findOne({ email });
    if (!doc) return null;
    return UserMapper.toEntity(doc);
  }
}
