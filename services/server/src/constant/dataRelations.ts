import { RelationOwner } from '../@types/RelationOwner';

export const dataRelations: { [keys in RelationOwner]: string[] } = {
  channel: ['team', 'messages', 'members'],
  message: ['channel', 'author'],
  team: ['owner', 'channels', 'members'],
  user: ['teams', 'channels']
};
