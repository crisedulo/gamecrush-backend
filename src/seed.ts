import { connect, connection, model } from 'mongoose';
import {
  Game,
  GameSchema,
} from './games/infrastructure/database/schemas/game.schema';
import {
  User,
  UserSchema,
} from './users/infrastructure/database/schemas/user.schema';
import { randomBytes, scryptSync } from 'crypto';

async function run() {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/gamecrush';
  await connect(uri);

  const GameModel = model(Game.name, GameSchema);
  const UserModel = model(User.name, UserSchema);

  await GameModel.deleteMany({});
  await UserModel.deleteMany({});

  const games = await GameModel.insertMany([
    { name: 'Valorant' },
    { name: 'Fortnite' },
    { name: 'Minecraft' },
    { name: 'League of Legends' },
    { name: 'Apex Legends' },
  ]);

  const salt = randomBytes(8).toString('hex');
  const hash = scryptSync('password', salt, 32).toString('hex');
  const password = `${salt}.${hash}`;

  await UserModel.insertMany([
    {
      gamerTag: 'gamer1',
      email: 'gamer1@example.com',
      password,
      favoriteGames: [games[0]._id, games[1]._id],
      platforms: ['PC'],
      styleOfPlay: 'Casual',
      availability: ['Noche'],
      languages: ['es'],
      termsAccepted: true,
    },
    {
      gamerTag: 'gamer2',
      email: 'gamer2@example.com',
      password,
      favoriteGames: [games[2]._id],
      platforms: ['PS5'],
      styleOfPlay: 'Competitivo',
      availability: ['Fines de semana'],
      languages: ['es', 'en'],
      termsAccepted: true,
    },
  ]);

  console.log('Seed data inserted');
  await connection.close();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
