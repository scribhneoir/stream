import * as FileSystem from 'expo-file-system';

export const readDirectoryMobile = async (path: string) => {
	const dir = FileSystem.documentDirectory + path;

	const dirInfo = await FileSystem.getInfoAsync(dir);
	if (!dirInfo.exists) {
		await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
	}

	try {
		const files = await FileSystem.readDirectoryAsync(
			`${FileSystem.documentDirectory}${path}`,
		);

		return files;
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
