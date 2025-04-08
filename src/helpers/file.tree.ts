import type { FileTreeNode } from '../providers/FileStorage/FileStorageProvider';

export const addToTree = (
	index: number,
	children: FileTreeNode[],
	name: string[],
) => {
	const namePart = name[index];
	const existingNode = children.find((child) => child.displayName === namePart);
	if (existingNode) {
		if (index === name.length - 1) {
			existingNode.fileName = name.join('.');
			return children;
		}
		existingNode.children = addToTree(index + 1, existingNode.children, name);
	} else {
		if (index === name.length - 1) {
			children.push({
				displayName: namePart,
				fileName: name.join('.'),
				children: [],
			});
			return children;
		}
		const newNode = {
			displayName: namePart,
			children: addToTree(index + 1, [], name),
		};
		children.push(newNode);
	}
	return children;
};
