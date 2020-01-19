import { FieldNode, GraphQLResolveInfo } from 'graphql';

interface ILoadRelations {
  info: GraphQLResolveInfo;
  paths: string[];
}

export const loadRelations = ({
  info: { fieldName, fieldNodes },
  paths
}: ILoadRelations): string[] => {
  let results: string[] = [];

  paths.forEach(path => {
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
