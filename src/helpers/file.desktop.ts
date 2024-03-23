import {
	BaseDirectory,
	readDir,
	readTextFile,
	writeTextFile,
} from '@tauri-apps/api/fs';

//todo: construct file tree
export const readDirectoryDesktop = async (path: string) => {
	const entries = await readDir(path, { dir: BaseDirectory.Document });
	return entries.map((entry) => entry.path);
};

export const readFileDesktop = async (path: string) => {
	return readTextFile(path, { dir: BaseDirectory.Document });
};

export const writeFileDesktop = async (path: string, data: string) => {
	await writeTextFile(path, data, { dir: BaseDirectory.AppConfig });
	return readFileDesktop(path);
};
