import {
	BaseDirectory,
	create,
	exists,
	mkdir,
	readDir,
	readTextFile,
	writeTextFile,
} from '@tauri-apps/plugin-fs';

//todo: construct file tree
export const readDirectoryDesktop = async (path: string) => {
	createDirectory(path);
	const entries = await readDir(path, { baseDir: BaseDirectory.Document });
	const fileList: string[] = [];

	for await (const value of entries) {
		if (value.isFile && value.name[0] !== '.' && value.name.endsWith('.md')) {
			fileList.push(value.name.replace('.md', ''));
		}
	}
	return fileList;
};

export const readFileDesktop = async (path: string) => {
	const existsPath = await exists(path, { baseDir: BaseDirectory.Document });
	if (!existsPath) {
		return '';
	}
	return readTextFile(path, { baseDir: BaseDirectory.Document });
};

export const writeFileDesktop = async (path: string, data: string) => {
	createFile(path);
	await writeTextFile(path, data, { baseDir: BaseDirectory.Document });
	return readFileDesktop(path);
};

const createDirectory = async (path: string) => {
	const existsPath = await exists(path, { baseDir: BaseDirectory.Document });
	if (!existsPath) {
		await mkdir(path, {
			baseDir: BaseDirectory.Document,
		});
	}
};

const createFile = async (path: string) => {
	const existsPath = await exists(path, { baseDir: BaseDirectory.Document });
	if (!existsPath) {
		const file = await create(path, { baseDir: BaseDirectory.Document });
		file.close();
	}
};
