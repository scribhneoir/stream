import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, TextInput, View } from 'react-native';
import { parse, stringify } from 'yaml';
import { PoolTitle } from '../../components/pool/Title';
import { useFileStorage } from '../../providers/FileStorage';

export default function Pool() {
	const { file } = useLocalSearchParams();
	const { readFile, writeFile } = useFileStorage();
	const [text, setText] = useState<string>('');
	const [title, setTitle] = useState<string>('');
	const [tags, setTags] = useState<string[]>([]);
	const [draft, setDraft] = useState(true);
	const router = useRouter();

	const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

	const handleChange = async (newText: string) => {
		setText(newText);
		//debounce

		if (debounceTimeout.current) {
			clearTimeout(debounceTimeout.current);
		}

		debounceTimeout.current = setTimeout(async () => {
			await writeFile(`${file}.md`, fileData());
		}, 300); // Adjust debounce delay as needed
	};

	const fileData = () =>
		`---\n${stringify({ title, draft, tags })}---\n${text}`;

	const handleTitleBlur = async () => {
		const frontmatter = { title, draft, tags };
		let textToWrite = text.trim();

		const existingFileData = await readFile(`${title}.md`);
		if (existingFileData) {
			const [_, existingFrontmatter, existingText] =
				existingFileData.split('---');
			const existingFrontmatterData = parse(existingFrontmatter);
			frontmatter.tags.push(...(existingFrontmatterData.tags || []));
			textToWrite = `${existingText.trim()}\n${textToWrite}`;
		}
		await writeFile(
			`${title}.md`,
			`---\n${stringify(frontmatter)}---\n${textToWrite}`,
		);
		router.navigate(`/pool/${title}`);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		(async () => {
			const data = await readFile(`${file}.md`);
			const [_, frontmatter, text] = data.split('---');
			if (text) {
				setText(text.trim());
			}

			if (frontmatter) {
				const frontmatterData = parse(frontmatter);
				setTitle(frontmatterData?.title ?? '');
				setDraft(frontmatterData?.draft === 'true');
				setTags(frontmatterData?.tags ?? []);
			}
		})();
	}, [file]);

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : undefined}
			style={{ flex: 1 }}
		>
			<View
				style={[
					{
						display: 'flex',
						height: '90%',
						width: '100%',
						alignItems: 'center',
						justifyContent: 'flex-start',
						overflow: 'scroll',
						paddingBottom: 10,
						gap: 10,
					},
					Platform.OS === 'web'
						? {
								//web-only style props
								// @ts-ignore
								scrollbarColor: '#B8C2B9 #111211',
								overflowY: 'scroll',
								overflowX: 'hidden',
							}
						: {},
				]}
			>
				<PoolTitle title={title} setTitle={setTitle} onBlur={handleTitleBlur} />
				{/* todo: options */}
				{/* todo: tags */}
				{/* todo: live render markdown */}
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
		</KeyboardAvoidingView>
	);
}
