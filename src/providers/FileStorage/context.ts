import { createContext, useContext } from 'react';
import type { Tree } from '../../helpers/file.tree';

export type FileStorageContextType = {
	fsReady: boolean;
	fileTree: Tree;
	fileList: Array<string>;
	refreshFileList: () => void;
	setRootDir: () => void;
	readFile: (path: string) => Promise<string>;
	writeFile: (path: string, data: string) => Promise<string>;
};

export const FileStorageContext = createContext<FileStorageContextType | null>(
	null,
);

export const useFileStorage = () => {
	const fs = useContext<FileStorageContextType | null>(FileStorageContext);
	if (!fs) {
		throw new Error(
			'You must call useFileStorage() inside of a <FileStorageProvider />',
		);
	}
	return fs;
};
