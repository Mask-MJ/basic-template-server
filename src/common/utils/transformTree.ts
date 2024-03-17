export const transformTree = <T extends { id: number }>(arr: T[]): T[] => {
  const map = new Map();
  const tree: T[] = [];
  arr.forEach((node) => {
    map.set(node.id, { ...node, children: [] });
  });

  map.forEach((node, _, map) => {
    const parentId = node.parentId;
    const parent = map.get(parentId);

    if (parent) {
      parent.children.push(node);
    } else {
      tree.push(node);
    }
  });
  return tree;
};
