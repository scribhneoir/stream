import { useState } from 'react';
import { View } from 'react-native';
import { TitleField } from '../components/flow/TitleField';
import { VeiledTextInput } from '../components/flow/VeiledTextInput';
import { useFileStorage } from '../providers/FileStorage';

export default function Flow() {
	const [title, setTitle] = useState('');
	const [text, setText] = useState('');
	const [tags, setTags] = useState<string>('');
	const [showTitle, setShowTitle] = useState(false);

	const { readFile, writeFile } = useFileStorage();

	const handleStateReset = () => {
		setTitle('');
		setText('');
		setTags('');
		setShowTitle(false);
	};

	//todo: async storage for title and current note

	//todo: title suggestions

	const handleSave = async () => {
		if (!title.trim()) return;
		const oldTitle = title;
		const oldTags = tags;
		const oldText = text.trim();
		const titleArray = title.split('.');
		handleStateReset();

		try {
			let data = await readFile(`${title}.md`);
			if (!data.trim()) {
				data = `---\ntitle: ${oldTitle.split('.').at(-1)}\ndate: ${new Date().toLocaleDateString()}\ndraft: true\ntags: ${oldTags.replaceAll(
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
				<TitleField
					title={title}
					setTitle={setTitle}
					setShowTitle={setShowTitle}
					handleSave={handleSave}
				/>
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
