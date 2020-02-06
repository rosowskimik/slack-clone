import { ApolloError } from 'apollo-server-express';

export class CustomError extends ApolloError {
  readonly alreadyHandled: true;

  constructor(
    message: string,
    code?: string,
    extensions?: Record<string, any>
  ) {
    super(message, code, extensions);
  }
}
