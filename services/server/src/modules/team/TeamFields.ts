import { GraphQLResolveInfo } from 'graphql';
import { Resolver, FieldResolver, Root, Ctx, Info } from 'type-graphql';
import { Team } from '../../entity/Team';
import { AppContext } from '../../@types/AppContext';
import { loadRelations } from '../../utils/loadRelations';

@Resolver(of => Team)
export class TeamResolver {
  @FieldResolver()
  async owner(
    @Root() { owner }: Team,
    @Ctx() { loaders }: AppContext,
    @Info() info: GraphQLResolveInfo
  ) {
    const relations = loadRelations('user', info);
    return relations.length > 0
      ? await loaders.userLoader.load(owner.id)
      : owner;
  }
}
