import { Resolver, FieldResolver, Root, Ctx, Info } from 'type-graphql';
import { Team } from '../../entity/Team';
import { AppContext } from 'src/@types/AppContext';
import { GraphQLResolveInfo } from 'graphql';
import { loadRelations } from '../../utils/loadRelations';

@Resolver(of => Team)
export class TeamResolver {
  @FieldResolver()
  async owner(
    @Root() { owner }: Team,
    @Ctx() { loaders }: AppContext,
    @Info() info: GraphQLResolveInfo
  ) {
    const relations = loadRelations({ info, paths: ['teams'] });
    return relations.length > 0
      ? await loaders.userLoader.load(owner.id)
      : owner;
  }
}
