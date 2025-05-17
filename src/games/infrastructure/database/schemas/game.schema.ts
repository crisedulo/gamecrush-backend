import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Game {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  genre?: string;

  @Prop({ type: [String], default: [] })
  platforms?: string[];

  @Prop()
  coverUrl?: string;

  @Prop()
  developer?: string;

  @Prop()
  releaseYear?: number;
}

export type GameDocument = Game & Document;
export const GameSchema = SchemaFactory.createForClass(Game);
