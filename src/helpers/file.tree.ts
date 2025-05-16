export const toFileTree = (files: string[]) => {
	const splitFiles = files
		.map((file) => file.split('.'))
		.sort((a, b) => b.length - a.length);

	const tree: Tree = {};

	for (const file of splitFiles) {
		let node = tree;
		for (let j = 0; j < file.length; j++) {
			const part = file[j];
			if (!node[part]) {
				node[part] = {
					fileName: null,
					children: {},
				};
			}
			if (j === file.length - 1) {
				node[part].fileName = file.join('.');
			} else {
				node = node[part].children;
			}
		}
	}

	const collapsedTree = colapseTree(tree);
	console.log('collapsedTree', collapsedTree);
	return collapsedTree;
};

const colapseTree = (tree: Tree): Tree => {
	if (Object.keys(tree).length === 0) {
		return tree;
	}

	for (let i = 0; i < Object.keys(tree).length; i++) {
		const key = Object.keys(tree)[i];
		const node = tree[key];
		const childrenKeys = Object.keys(node.children);
		if (childrenKeys.length === 1 && !node.fileName) {
			tree[`${key}.${childrenKeys[0]}`] = node.children[childrenKeys[0]];
			delete tree[key];
			i--;
		} else if (Object.keys(node.children).length > 0 && node.fileName) {
			tree[key] = {
				fileName: null,
				children: colapseTree({
					...node.children,
					[node.fileName]: {
						fileName: node.fileName,
						children: {},
					},
				}),
			};
		} else {
			tree[key] = {
				fileName: node.fileName,
				children: colapseTree(node.children),
			};
		}
	}
	return tree;
};

export type Tree = Record<string, TreeNode>;

export type TreeNode = {
	fileName: string | null;
	children: Tree;
};
