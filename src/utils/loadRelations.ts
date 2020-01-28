import { FieldNode, GraphQLResolveInfo } from 'graphql';
import { relations } from '../constant/relations';

type LoadRelations = (
  parent: 'channel' | 'message' | 'team' | 'user',
  info: GraphQLResolveInfo
) => string[];

export const loadRelations: LoadRelations = (
  parent,
  { fieldName, fieldNodes }
) => {
  let results: string[] = [];

  relations[parent].forEach(path => {
    results = results.concat(doesPathExist(fieldNodes, [fieldName, path]));
  });

  return results;
};

const doesPathExist = (
  nodes: ReadonlyArray<FieldNode>,
  path: string[]
): string[] => {
  if (!nodes) {
    return [];
  }

  const node = nodes.find(x => x.name.value === path[0]);

  if (!node) {
    return [];
  }

  if (path.length === 1) {
    return path;
  }

  return doesPathExist(
    node.selectionSet!.selections as FieldNode[],
    path.slice(1)
  );
};
