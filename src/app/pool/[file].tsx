import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	TextInput,
	View,
} from 'react-native';
import { parse, stringify } from 'yaml';
import { PoolTitle } from '../../components/pool/Title';
import { useFileStorage } from '../../providers/FileStorage';
import { PlatformEnum, usePlatform } from '../../providers/Platform';
import { useSettings } from '../../providers/Settings';

export default function Pool() {
	const { file } = useLocalSearchParams();
	const { readFile, writeFile } = useFileStorage();
	const { primaryColor } = useSettings();
	const { platform } = usePlatform();
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
				setTitle(frontmatterData?.title.toString() ?? '');
				setDraft(frontmatterData?.draft === 'true');
				setTags(frontmatterData?.tags ?? []);
			}
		})();
	}, [file]);

	// Create a ref to hold the latest state values
	const latestStateRef = useRef({ text, title, draft, tags });

	// Keep the ref updated whenever state changes
	useEffect(() => {
		latestStateRef.current = { text, title, draft, tags };
	}, [text, title, draft, tags]);

	const fileData = () => {
		const { text, title, draft, tags } = latestStateRef.current;
		return `---\n${stringify({ title, draft, tags })}---\n${text}`;
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		// Clean up function to force save when component unmounts
		return () => {
			if (debounceTimeout.current) {
				clearTimeout(debounceTimeout.current);
				debounceTimeout.current = null;
			}

			// Force save using the latest state captured in ref
			if (file) {
				const { text: currentText } = latestStateRef.current;
				// Only save if there's actual content to save
				if (currentText && currentText.trim() !== '') {
					writeFile(`${file}.md`, fileData()).catch((err) =>
						console.error('Failed to save file on unmount:', err),
					);
				}
			}
		};
	}, [file]);

	return (
		<KeyboardAvoidingView
			behavior={platform === PlatformEnum.IOS ? 'padding' : undefined}
			style={{ flex: 1 }}
		>
			<View
				style={[
					{
						display: 'flex',
						height: '90%',
						width: '100%',
						alignItems: 'center',
						overflow: 'hidden',
						justifyContent: 'flex-start',
						gap: 10,
					},
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
					autoCorrect={false}
					autoComplete='off'
					spellCheck={false}
					style={[
						{
							fontFamily: 'sp',
							width: '100%',
							height: '100%',
							maxWidth: 500,
							color: primaryColor,
							fontSize: 18,
							verticalAlign: 'bottom',
							paddingTop: 0,
							paddingBottom: 0,
						},
						Platform.OS === 'web'
							? {
									//web-only style props
									//@ts-ignore
									outline: 'none',
								}
							: {},
					]}
				/>
			</View>
		</KeyboardAvoidingView>
	);
}
