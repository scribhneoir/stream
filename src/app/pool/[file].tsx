import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Platform, TextInput, View } from 'react-native';
import { useFileStorage } from '../../providers/FileStorage';

export default function Pool() {
	const { file } = useLocalSearchParams();
	const { readFile, writeFile } = useFileStorage();
	const [text, setText] = useState<string>('');

	const handleChange = async (newText: string) => {
		setText(newText);
		writeFile(`${file}.md`, newText);
	};

	useEffect(() => {
		(async () => {
			const data = await readFile(`${file}.md`);
			setText(data);
		})();
	}, [file, readFile]);

	//todo: add title rename

	//todo: render frontmatter seperately

	//todo: render markdown

	//todo: add tags

	return (
		<View
			style={{
				display: 'flex',
				height: '90%',
				width: '100%',
				alignItems: 'center',
				justifyContent: 'flex-start',
			}}
		>
			<TextInput
				value={text}
				onChangeText={handleChange}
				keyboardAppearance='dark'
				multiline
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				autoCorrect={false}
				autoComplete='off'
				spellCheck={false}
				style={[
					{
						fontFamily: 'sp',
						width: '100%',
						position: 'absolute',
						height: '100%',
						maxWidth: 500,
						color: '#B8C2B9',
						fontSize: 18,
						verticalAlign: 'bottom',
						paddingTop: 0,
						paddingBottom: 0,
					},
					Platform.OS === 'web'
						? {
								//web-only style props
								// @ts-ignore
								scrollbarWidth: 'none',
								// @ts-ignore
								outlineStyle: 'none',
							}
						: {},
				]}
			/>
		</View>
	);
}
