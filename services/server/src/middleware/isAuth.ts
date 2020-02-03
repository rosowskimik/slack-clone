import { MiddlewareFn } from 'type-graphql';
import { AppContext } from '../@types/AppContext';
import { AuthenticationError } from 'apollo-server-express';

export const isAuth: MiddlewareFn<AppContext> = ({ context }, next) => {
  if (!context.req.session!.userId) {
    throw new AuthenticationError(
      'you must be logged in to access this resource'
    );
  }
  return next();
};
