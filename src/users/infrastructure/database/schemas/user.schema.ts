import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  gamerTag: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'Game', default: [] })
  favoriteGames: MongooseSchema.Types.ObjectId[];

  @Prop({ type: [String], default: [] })
  platforms: string[];

  @Prop({ type: [String], default: [] })
  genres: string[];

  @Prop()
  country: string;

  @Prop({ default: true })
  available: boolean;

  @Prop({ default: true })
  hasMic: boolean;

  @Prop({ default: true })
  showGamerTag: boolean;

  @Prop({ type: [String], default: [] })
  photos: string[]; // URLs

  @Prop({ default: 'Casual' })
  styleOfPlay: string;

  @Prop({ type: [String], default: [] })
  availability: string[];

  @Prop({ type: [String], default: [] })
  languages: string[];

  @Prop({ default: false })
  termsAccepted: boolean;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
