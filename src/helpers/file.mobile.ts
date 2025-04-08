import * as FileSystem from 'expo-file-system';
import type { FileTreeNode } from '../providers/FileStorage/FileStorageProvider';
import { addToTree } from './file.tree';

export const readDirectoryMobile = async (path: string) => {
	const dir = FileSystem.documentDirectory + path;

	const dirInfo = await FileSystem.getInfoAsync(dir);
	if (!dirInfo.exists) {
		await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
	}

	try {
		let fileList: FileTreeNode[] = [];
		const files = await FileSystem.readDirectoryAsync(
			`${FileSystem.documentDirectory}${path}`,
		);

		for (const file of files) {
			fileList = addToTree(0, fileList, file.split('.').slice(0, -1));
		}

		return fileList;
	} catch (e) {
		console.log(e);
		return [];
	}
};

export const readFileMobile = async (path: string) => {
	const fileInfo = await FileSystem.getInfoAsync(
		`${FileSystem.documentDirectory}${path}`,
	);
	if (!fileInfo.exists) {
		return '';
	}
	return await FileSystem.readAsStringAsync(
		`${FileSystem.documentDirectory}${path}`,
		{ encoding: FileSystem.EncodingType.UTF8 },
	);
};

export const writeFileMobile = async (path: string, data: string) => {
	try {
		await FileSystem.writeAsStringAsync(
			`${FileSystem.documentDirectory}${path}`,
			data,
			{ encoding: FileSystem.EncodingType.UTF8 },
		);
		return readFileMobile(path);
	} catch (e) {
		console.log(e);
		return '';
	}
};
