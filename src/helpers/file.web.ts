import type { FileTreeNode } from '../providers/FileStorage/FileStorageProvider';

const addToTree = (
	index: number,
	children: FileTreeNode[],
	name: string[],
	file: FileSystemFileHandle,
) => {
	const namePart = name[index];
	const existingNode = children.find((child) => child.displayName === namePart);
	if (existingNode) {
		existingNode.children = addToTree(
			index + 1,
			existingNode.children,
			name,
			file,
		);
	} else {
		if (index === name.length - 1) {
			children.push({
				displayName: namePart,
				path: file.name,
				handle: file,
				children: [],
			});
			return children;
		}
		const newNode = {
			displayName: namePart,
			children: addToTree(index + 1, [], name, file),
		};
		children.push(newNode);
	}
	return children;
};

export const readDirectoryWeb = async (
	directoryHandle: FileSystemDirectoryHandle,
) => {
	let fileList: FileTreeNode[] = [];
	// @ts-ignore
	for await (const [_, value] of directoryHandle.entries()) {
		if (value.kind === 'file') {
			fileList = addToTree(
				0,
				fileList,
				value.name.split('.').slice(0, -1),
				value,
			);
		}
	}
	return fileList;
};

// export const readFileWeb = async (path: string) => {
// 	return await FileSystem.readAsStringAsync(
// 		`${FileSystem.documentDirectory}${path}`,
// 	);
// };

// export const writeFileWeb = async (path: string, data: string) => {
// 	await FileSystem.writeAsStringAsync(
// 		`${FileSystem.documentDirectory}${path}`,
// 		data,
// 	);
// 	return readFile(path);
// };
