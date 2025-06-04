import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { formatGraphQLError } from './common/graphql/format-error';
import { join } from 'path';

// Módulos funcionales
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
// import { MatchesModule } from './matches/matches.module';
import { GamesModule } from './games/games.module';
// import { ChatsModule } from './chats/chats.module';

// Configuración centralizada
import configuration from './config/configuration';
import { validationSchema } from './config/validation';

@Module({
  imports: [
    // Carga variables de entorno y las valida con Joi
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),

    // Configuración asíncrona de Mongoose con URI desde .env
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('mongoUri'),
      }),
    }),

    // Configuración de GraphQL con Apollo (modo code-first)
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: true,
      playground: true,
      formatError: formatGraphQLError,
    }),

    // Importa tus módulos funcionales
    UsersModule,
    AuthModule,
    // MatchesModule,
    GamesModule,
    // ChatsModule,
  ],
})
export class AppModule {}
