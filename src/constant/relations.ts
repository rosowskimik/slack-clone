export const relations = {
  channel: ['team', 'messages', 'members'],
  message: ['channel', 'author'],
  team: ['owner', 'channels', 'members'],
  user: ['teams', 'channels']
};
