import { ApolloError, UserInputError } from 'apollo-server-express';
import { MiddlewareFn } from 'type-graphql';

import { AppContext } from '../@types/AppContext';

export const ErrorHandler: MiddlewareFn<AppContext> = async (_, next) => {
  try {
    await next();
  } catch (error) {
    if (error instanceof ApolloError) throw error;

    if (error.code === '23505') duplicateKey(error);
    if (error.validationErrors) validationError(error);

    throw new ApolloError('something went wrong');
  }
};

type ErrorHandlerFunc = (error: any) => never;

const duplicateKey: ErrorHandlerFunc = error => {
  const field = (error.detail as string).match(/\(([^)]+)\)/)![1];
  throw new UserInputError(`${error.table} with that ${field} already exists`);
};

const validationError: ErrorHandlerFunc = error => {
  const message = error.validationErrors[0].constraints;
  const key = Object.keys(message)[0];
  throw new UserInputError(message[key]);
};
