import { FieldNode } from 'graphql';

export const doesPathExist = (
  nodes: ReadonlyArray<FieldNode>,
  path: string[],
  previousResults: string[] = []
): string[] | undefined => {
  if (!nodes) {
    return;
  }

  const node = nodes.find(x => x.name.value === path[0]);

  if (!node) {
    return;
  }

  if (path.length === 1) {
    return previousResults.concat(path[0]);
  }

  return doesPathExist(
    node.selectionSet!.selections as FieldNode[],
    path.slice(1),
    previousResults
  );
};
