import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

@Catch()
export class GraphQLExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GraphQLExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    this.logger.error('GraphQL Exception:', exception);

    if (exception instanceof BadRequestException) {
      const response = exception.getResponse();
      const message = (response as any).message || 'Bad Request';
      return new GraphQLError(
        Array.isArray(message) ? message.join(', ') : message,
      );
    }

    if (exception.message) {
      return new GraphQLError(exception.message);
    }

    return new GraphQLError('Internal Server Error');
  }
}
