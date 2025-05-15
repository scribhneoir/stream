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
	return tree;
	// const collapsedTree = colapseTree(tree);
	// console.log('collapsedTree', collapsedTree);
	// return collapsedTree;
};

const colapseTree = (tree: Tree): Tree => {
	console.log(tree);
	if (!tree || Object.keys(tree).length === 0) {
		return {};
	}
	for (const key in tree) {
		const node = tree[key];
		const childKeys = Object.keys(node.children);
		if (childKeys.length === 1) {
			tree[`${key}.${childKeys[0]}`] = { ...node.children[childKeys[0]] };
			delete tree[key];
		}
	}
	return colapseTree(tree);
};

export type Tree = Record<string, TreeNode>;

export type TreeNode = {
	fileName: string | null;
	children: Tree;
};
