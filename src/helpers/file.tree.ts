import { Children } from 'react';
import type { FileTreeNode } from '../providers/FileStorage/FileStorageProvider';

export const addToTree = (children: FileTreeNode[], name: string) =>
	_addToTree(0, children, name.split('.').slice(0, -1));

const _addToTree = (
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
		existingNode.children = _addToTree(index + 1, existingNode.children, name);
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
			children: _addToTree(index + 1, [], name),
		};
		children.push(newNode);
	}
	return children;
};
