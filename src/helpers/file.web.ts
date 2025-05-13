export const readDirectoryWeb = async (
	directoryHandle: FileSystemDirectoryHandle,
) => {
	const fileList: string[] = [];
	// @ts-ignore
	for await (const [_, value] of directoryHandle.entries()) {
		if (value.kind === 'file') {
			fileList.push(value.name.replace('.md', ''));
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
