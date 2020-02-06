import { ApolloError, UserInputError } from 'apollo-server-express';
import { MiddlewareFn } from 'type-graphql';

import { AppContext } from '../@types/AppContext';

export const ErrorHandler: MiddlewareFn<AppContext> = async (_, next) => {
  try {
    await next();
  } catch (error) {
    if (error instanceof ApolloError) throw error;

    if (error.code === '23505') duplicateKey(error);
    throw new ApolloError('something went wrong');
  }
};

const duplicateKey = (error: any): never => {
  const field = (error.detail as string).match(/\(([^)]+)\)/)![1];
  throw new UserInputError(`${error.table} with that ${field} already exists`);
};
