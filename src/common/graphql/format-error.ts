import { GraphQLFormattedError } from 'graphql';

const STATUS_CODE_MAP: Record<number, string> = {
  400: 'BAD_REQUEST',
  404: 'NOT_FOUND',
  409: 'CONFLICT',
};

export function formatGraphQLError(
  error: GraphQLFormattedError & { extensions: { status?: number } },
): GraphQLFormattedError {
  const status = error.extensions.status ?? 500;
  const code = STATUS_CODE_MAP[status] ?? 'INTERNAL_SERVER_ERROR';

  return {
    message: error.message,
    extensions: {
      code,
      statusCode: status,
    },
  };
}
