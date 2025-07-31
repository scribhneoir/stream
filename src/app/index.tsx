import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { TitleField } from '../components/flow/TitleField';
import { VeiledTextInput } from '../components/flow/VeiledTextInput';
import { useFileStorage } from '../providers/FileStorage';

export default function Flow() {
	const [text, setText] = useState('');
	const [tags, setTags] = useState<string>('');
	const [showTitle, setShowTitle] = useState(false);

	const { readFile, writeFile } = useFileStorage();

	const handleStateReset = () => {
		setText('');
		setTags('');
		setShowTitle(false);
	};

	//todo: async storage for title and current note
	const saveText = useCallback(async (text: string) => {
		await AsyncStorage.setItem('text', text);
	}, []);

	const loadText = useCallback(async () => {
		const text = await AsyncStorage.getItem('text');
		if (text) {
			setText(text);
		}
	}, []);

	useEffect(() => {
		loadText();
	}, [loadText]);

	useEffect(() => {
		saveText(text);
	}, [text, saveText]);

	//todo: title suggestions

	const handleSave = async (title: string) => {
		if (!title.trim()) return;
		const oldTags = tags;
		const oldText = text.trim();
		handleStateReset();

		try {
			let data = await readFile(`${title}.md`);
			if (!data.trim()) {
				data = `---\ntitle: ${title.split('.').at(-1)}\ndate: ${new Date().toLocaleDateString()}\ndraft: true\ntags: ${oldTags.replaceAll(
					'#',
					'\n  - ',
				)}\n---\n`;
			}
			data = `${data}\n\n### ${new Date().toLocaleDateString()}\n${oldText}`;
			const ancientTags = data.match(/^(tags:)(.+)/m)?.[0] || '';
			data.replaceAll(
				ancientTags,
				`${ancientTags}${oldTags.replaceAll('#', '\\#')}`,
			);
			data.replace(/(date:)(.+)/m, `$1 ${new Date().toLocaleDateString()}`);
			await writeFile(`${title}.md`, data);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<View
			style={{
				position: 'relative',
				display: 'flex',
				height: '100%',
				width: '100%',
				alignItems: 'center',
				justifyContent: 'flex-start',
				marginTop: 30,
			}}
		>
			{showTitle && (
				<TitleField setShowTitle={setShowTitle} handleSave={handleSave} />
			)}
			{!showTitle && (
				<VeiledTextInput
					text={text}
					setText={setText}
					tags={tags}
					setTags={setTags}
					setShowTitle={setShowTitle}
				/>
			)}
		</View>
	);
}
