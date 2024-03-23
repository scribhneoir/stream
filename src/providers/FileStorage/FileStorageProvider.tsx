import React, { type ReactNode, useEffect, useState } from 'react';
import { readDirectoryWeb } from '../../helpers/file.web';
import { PlatformEnum, usePlatform } from '../Platform/context';
import { FileStorageContext, type FileStorageContextType } from './context';

export type FileTreeNode = {
	displayName: string;
	path?: string;
	handle?: FileSystemFileHandle;
	children: Array<FileTreeNode>;
};

export const FileStorageProvider = (props: { children: ReactNode }) => {
	const { children } = props;
	const { platform, platformReady } = usePlatform();
	const [fsReady, setFsReady] = useState<boolean>(false);
	const [poolDir, setPoolDir] = useState<string>();
	const [rootFileHandle, setRootFileHandle] =
		useState<FileSystemDirectoryHandle | null>(null);
	const [fileHandleList, setFileHandleList] = useState<
		Array<FileSystemFileHandle>
	>([]);
	const [fileTree, setFileTree] = useState<Array<FileTreeNode>>([]);

	const setRootDir = async () => {
		if (platform === PlatformEnum.WEB) {
			// @ts-ignore
			const dirHandle = (await window.showDirectoryPicker({
				id: 'pool',
				mode: 'readwrite',
				startIn: 'documents',
			})) as FileSystemDirectoryHandle;
			//todo: handle user cancel
			if (dirHandle) {
				setRootFileHandle(dirHandle);
				setPoolDir(dirHandle.name);
			}
		}
	};

	const refreshFileList = async () => {
		if (platform === PlatformEnum.WEB && rootFileHandle) {
			const files = await readDirectoryWeb(rootFileHandle);
			setFileTree(files);
		}
		if (!fsReady) {
			setFsReady(true);
		}
	};

	const readFile = async (path: string) => {
		return '';
	};

	const writeFile = async (path: string, data: string) => {
		return '';
	};

	useEffect(() => {
		if (platformReady) {
			if (platform !== PlatformEnum.WEB) {
				setPoolDir('stream');
			}
		}
	}, [platformReady, platform]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: adding refreshFileList to dependancies causes infinite loop
	useEffect(() => {
		if (poolDir) {
			refreshFileList();
		}
	}, [poolDir]);

	const wrapped: FileStorageContextType = {
		fsReady,
		fileTree,
		setRootDir,
		refreshFileList,
		readFile,
		writeFile,
	};

	return (
		<FileStorageContext.Provider value={wrapped}>
			{children}
		</FileStorageContext.Provider>
	);
};
