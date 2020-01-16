import { FieldNode } from 'graphql';

export const doesPathExist = (
  nodes: ReadonlyArray<FieldNode>,
  path: string[]
): boolean => {
  if (!nodes) {
    return false;
  }

  const node = nodes.find(x => x.name.value === path[0]);

  if (!node) {
    return false;
  }

  if (path.length === 1) {
    return true;
  }

  return doesPathExist(
    node.selectionSet!.selections as FieldNode[],
    path.slice(1)
  );
};
