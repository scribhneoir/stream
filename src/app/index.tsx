import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useRef, useEffect } from 'react';
import {
	type NativeSyntheticEvent,
	Platform,
	Pressable,
	TextInput,
	type TextInputKeyPressEventData,
	View,
} from 'react-native';
import Animated, {
	ReduceMotion,
	SlideInDown,
	SlideInUp,
	SlideOutDown,
	SlideOutUp,
} from 'react-native-reanimated';
import { useFileStorage } from '../providers/FileStorage';

export default function Flow() {
	const [reset, setReset] = useState(false);
	const [title, setTitle] = useState('');
	const [text, setText] = useState('');
	const [tags, setTags] = useState<string>('');
	const [enterCount, setEnterCount] = useState(0);
	const [tagInit, setTagInit] = useState(false);
	const [showTitle, setShowTitle] = useState(false);

	const { readFile, writeFile } = useFileStorage();

	const ref_title = useRef<TextInput>(null);
	const ref_text = useRef<TextInput>(null);
	const ref_tags = useRef<TextInput>(null);

	const handleStateReset = () => {
		setReset(true);
		setTitle('');
		setText('');
		setTags('');
		setShowTitle(false);
		setEnterCount(0);
		setTagInit(false);
	};

	//todo: async storage for title and current note

	const handleTitleChange = (t: string) => {
		const newTitle = t.replace(' ', '.').toLocaleLowerCase();
		setTitle(newTitle);
	};

	//todo: title suggestions

	const handleSave = async () => {
		if (!title.trim()) return;
		const oldTitle = title;
		const oldTags = tags;
		const oldText = text.trim();
		const titleArray = title.split('.');
		handleStateReset();
		ref_title.current?.blur();

		try {
			let data = await readFile(`${title}.md`);
			if (!data.trim()) {
				data = `---\ntitle: ${oldTitle}\ndate: ${new Date().toLocaleDateString()}\ndraft: true\ntags: ${oldTags.replaceAll(
					'#',
					'\n  - ',
				)}\n---\n# ${titleArray[titleArray.length - 1]}`;
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

	const handleTextKeyPress = (
		e: NativeSyntheticEvent<TextInputKeyPressEventData>,
	) => {
		if (e.nativeEvent.key === 'Enter') {
			if (enterCount >= 3) {
				setShowTitle(true);
				// handleSave();
			} else {
				setEnterCount(enterCount + 1);
			}
		} else if (
			text.length === 0 &&
			(e.nativeEvent.key === 'Backspace' || e.nativeEvent.key === 'Delete')
		) {
			ref_title.current?.focus();
		} else {
			if (enterCount) {
				setEnterCount(0);
			}
			if (e.nativeEvent.key === '#') {
				setTagInit(true);
			} else if (tagInit) {
				setTagInit(false);
				if (e.nativeEvent.key !== ' ') {
					setReset(true);
					setTags(`${tags} #${e.nativeEvent.key}`);
					setText(text.substring(0, text.length - 1));
					ref_tags.current?.focus();
				}
			}
		}
	};

	const handleTitleKeyPress = (
		e: NativeSyntheticEvent<TextInputKeyPressEventData>,
	) => {
		if (
			e.nativeEvent.key === 'Escape' ||
			((e.nativeEvent.key === 'Backspace' || e.nativeEvent.key === 'Delete') &&
				!title.trim())
		) {
			setTitle('');
			setShowTitle(false);
			ref_title.current?.blur();
		}
	};

	const setWebInputDim = () => {
		if (ref_text.current && Platform.OS === 'web') {
			// @ts-ignore - accessing DOM properties
			const element = ref_text.current;
			// @ts-ignore - accessing DOM properties
			element.style.height = '0px';
			// @ts-ignore - accessing DOM properties
			element.style.height = `${element.scrollHeight}px`;
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (!showTitle) {
			setWebInputDim();
		}
	}, [showTitle]);

	return (
		<View
			style={{
				position: 'relative',
				display: 'flex',
				height: '100%',
				width: '100%',
				alignItems: 'center',
				justifyContent: 'flex-start',
			}}
		>
			{showTitle && (
				<Animated.View
					entering={SlideInDown.springify().reduceMotion(ReduceMotion.Never)}
					exiting={SlideOutDown.springify().reduceMotion(ReduceMotion.Never)}
					style={{
						borderRadius: 10,
						borderWidth: 2,
						borderColor: '#353835',
						overflow: 'hidden',
						paddingHorizontal: 7,
						position: 'absolute',
						top: '30%',
						zIndex: 1,
					}}
				>
					<TextInput
						value={title}
						ref={ref_title}
						keyboardAppearance='dark'
						onKeyPress={(e) => handleTitleKeyPress(e)}
						onChangeText={(t) => handleTitleChange(t)}
						placeholder='title'
						placeholderTextColor='#353835'
						enterKeyHint='done'
						autoFocus
						autoCorrect={false}
						autoComplete='off'
						spellCheck={false}
						onSubmitEditing={handleSave}
						style={[
							{
								backgroundColor: 'black',
								fontFamily: 'spB',
								width: '100%',
								color: '#B8C2B9',
								fontSize: 25,
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
				</Animated.View>
			)}
			{!showTitle && (
				<Animated.View
					entering={SlideInUp.springify().reduceMotion(ReduceMotion.Never)}
					exiting={SlideOutUp.springify().reduceMotion(ReduceMotion.Never)}
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'flex-start',
						height: '90%',
						width: '100%',
						maxWidth: 500,
					}}
				>
					<TextInput
						value={tags}
						ref={ref_tags}
						keyboardAppearance='dark'
						onChangeText={(t) => setTags(t)}
						enterKeyHint='done'
						autoCorrect={false}
						autoComplete='off'
						spellCheck={false}
						onSubmitEditing={() => ref_text.current?.focus()}
						style={[
							{
								backgroundColor: 'black',
								fontFamily: 'spB',
								width: '100%',
								color: '#353835',
								fontSize: 14,
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
					<Pressable
						style={{
							width: '100%',
							height: '100%',
							position: 'relative',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'flex-start',
							overflow: 'hidden',
						}}
						onPress={() => {
							ref_text.current?.focus();
						}}
					>
						<TextInput
							value={text}
							keyboardAppearance='dark'
							multiline
							showsHorizontalScrollIndicator={false}
							showsVerticalScrollIndicator={false}
							autoCorrect={false}
							autoComplete='off'
							autoFocus
							spellCheck={false}
							ref={ref_text}
							onKeyPress={(e) => handleTextKeyPress(e)}
							onChange={(e) => {
								if (!reset) {
									setText(e.nativeEvent.text);
									setWebInputDim();
								} else {
									setReset(false);
								}
							}}
							style={[
								{
									fontFamily: 'sp',
									width: '100%',
									position: 'absolute',
									bottom: '50%',
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
											outlineStyle: 'none',
										}
									: {},
							]}
						/>
						<LinearGradient
							colors={['black', 'transparent']}
							locations={[0.5, 1]}
							style={{
								width: '100%',
								height: '50%',
								pointerEvents: 'none',
							}}
						/>
					</Pressable>
				</Animated.View>
			)}
		</View>
	);
}
