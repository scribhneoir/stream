import type { FileTreeNode } from '../providers/FileStorage/FileStorageProvider';
import { addToTree } from './file.tree';

export const readDirectoryWeb = async (
	directoryHandle: FileSystemDirectoryHandle,
) => {
	let fileList: FileTreeNode[] = [];
	// @ts-ignore
	for await (const [_, value] of directoryHandle.entries()) {
		if (value.kind === 'file') {
			fileList = addToTree(0, fileList, value.name.split('.').slice(0, -1));
		}
	}
	return fileList;
};

export const readFileWeb = async (fileHandle: FileSystemFileHandle) => {
	return (await fileHandle.getFile()).text();
};

export const writeFileWeb = async (
	fileHandle: FileSystemFileHandle,
	data: string,
) => {
	const writable = await fileHandle.createWritable();
	await writable.write(data);
	await writable.close();
	return readFileWeb(fileHandle);
};
