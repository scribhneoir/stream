import { type ReactNode, useEffect, useMemo, useState } from 'react';
import {
	readDirectoryMobile,
	readFileMobile,
	writeFileMobile,
} from '../../helpers/file.mobile';
import { addToTree } from '../../helpers/file.tree';
import {
	readDirectoryWeb,
	readFileWeb,
	writeFileWeb,
} from '../../helpers/file.web';
import { PlatformEnum, usePlatform } from '../Platform/context';
import { FileStorageContext, type FileStorageContextType } from './context';

export type FileTreeNode = {
	displayName: string;
	fileName?: string;
	children: Array<FileTreeNode>;
};

export const FileStorageProvider = (props: { children: ReactNode }) => {
	const { children } = props;
	const { platform, platformReady } = usePlatform();
	const [fsReady, setFsReady] = useState<boolean>(false);
	const [poolDir, setPoolDir] = useState<string>('');
	const [rootFileHandle, setRootFileHandle] =
		useState<FileSystemDirectoryHandle | null>(null);
	const [fileList, setFileList] = useState<Array<string>>([]);

	const fileTree: Array<FileTreeNode> = useMemo(() => {
		let ft: Array<FileTreeNode> = [];
		for (const value of fileList) {
			ft = addToTree(ft, value);
		}
		return ft;
	}, [fileList]);

	const setRootDir = async () => {
		if (platform === PlatformEnum.WEB) {
			try {
				// @ts-ignore
				const dirHandle = (await window.showDirectoryPicker({
					id: 'pool',
					mode: 'readwrite',
					startIn: 'documents',
				})) as FileSystemDirectoryHandle;
				if (dirHandle) {
					setRootFileHandle(dirHandle);
					setPoolDir(dirHandle.name);
				}
			} catch (e) {
				//user canceled
				console.error(e);
				return;
			}
		}
	};

	const refreshFileList = async () => {
		if (platform === PlatformEnum.WEB && rootFileHandle) {
			const files = await readDirectoryWeb(rootFileHandle);
			setFileList(files);
		} else if (
			platform === PlatformEnum.IOS ||
			platform === PlatformEnum.ANDROID
		) {
			const files = await readDirectoryMobile(poolDir);
			setFileList(files);
		}
		//todo: handle desktop
		if (!fsReady) {
			setFsReady(true);
		}
	};

	const readFile = async (fileName: string) => {
		if (platform === PlatformEnum.WEB && rootFileHandle) {
			const fileHandle = await rootFileHandle.getFileHandle(fileName, {
				create: true,
			});
			return await readFileWeb(fileHandle);
		}
		if (platform === PlatformEnum.IOS || platform === PlatformEnum.ANDROID) {
			return await readFileMobile(`${poolDir}/${fileName}`);
		}

		return '';
	};

	const writeFile = async (fileName: string, data: string) => {
		let result = '';
		if (platform === PlatformEnum.WEB && rootFileHandle) {
			const fileHandle = await rootFileHandle.getFileHandle(fileName, {
				create: true,
			});
			result = await writeFileWeb(fileHandle, data);
		} else if (
			platform === PlatformEnum.IOS ||
			platform === PlatformEnum.ANDROID
		) {
			result = await writeFileMobile(`${poolDir}/${fileName}`, data);
		}
		refreshFileList();
		return result;
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
		fileList,
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
