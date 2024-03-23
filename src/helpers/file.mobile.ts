import * as FileSystem from 'expo-file-system';

export const readDirectoryMobile = async (path: string) => {
	return await FileSystem.readDirectoryAsync(
		`${FileSystem.documentDirectory}${path}`,
	);
};

export const readFileMobile = async (path: string) => {
	return await FileSystem.readAsStringAsync(
		`${FileSystem.documentDirectory}${path}`,
	);
};

export const writeFileMobile = async (path: string, data: string) => {
	await FileSystem.writeAsStringAsync(
		`${FileSystem.documentDirectory}${path}`,
		data,
	);
	return readFileMobile(path);
};
