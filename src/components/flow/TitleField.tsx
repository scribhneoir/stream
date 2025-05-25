import { useEffect, useMemo, useRef, useState } from 'react';
import {
	type NativeSyntheticEvent,
	Platform,
	Pressable,
	Text,
	TextInput,
	type TextInputKeyPressEventData,
	View,
} from 'react-native';
import Animated, {
	FadeInDown,
	FadeOutDown,
	ReduceMotion,
} from 'react-native-reanimated';
import { useFileStorage } from '../../providers/FileStorage';

const DAILY = '\udb84\udee1 daily';

export const TitleField = (props: {
	setShowTitle: (show: boolean) => void;
	handleSave: (title: string) => void;
}) => {
	const { setShowTitle, handleSave } = props;
	const { fileList, fsReady } = useFileStorage();
	const [title, setTitle] = useState('');

	const ref_title = useRef<TextInput>(null);

	const handleTitleChange = (t: string) => {
		const newTitle = t.replace(' ', '.').toLocaleLowerCase();
		setTitle(newTitle);
	};

	const handleTitleSaveAndReset = (title?: string) => {
		if (!title?.trim()) return;
		handleSave(title);
		setTitle('');
		setShowTitle(false);
	};

	const handleTitleKeyPress = (
		e: NativeSyntheticEvent<TextInputKeyPressEventData>,
	) => {
		if (
			e.nativeEvent.key === 'Escape' ||
			((e.nativeEvent.key === 'Backspace' || e.nativeEvent.key === 'Delete') &&
				!title.trim())
		) {
			ref_title.current?.blur();
			setTitle('');
			setShowTitle(false);
		} else if (e.nativeEvent.key === 'Tab' && titleSuggestions.length > 0) {
			e.preventDefault();
			const newTitle = `${titleSuggestions[0]}.`;
			setTitle(newTitle);
		}
	};

	useEffect(() => {
		if (ref_title.current) {
			setTimeout(() => ref_title.current?.focus(), 200);
		}
	}, []);

	const titleSuggestions = useMemo(() => {
		if (!fsReady || !title) return [];
		const depth = title.split('.').length;
		const suggestions = fileList
			.map((file) => file.split('.').slice(0, depth).join('.'))
			.filter((file) => file.startsWith(title) && !file.startsWith('daily'))
			.slice(0, 5);
		return [...(depth === 1 ? [DAILY] : []), ...new Set(suggestions)];
	}, [fileList, fsReady, title]);

	return (
		<Animated.View
			entering={FadeInDown.springify()
				.mass(1)
				.damping(15)
				.stiffness(100)
				.reduceMotion(ReduceMotion.Never)}
			exiting={FadeOutDown.springify()
				.mass(1)
				.damping(15)
				.stiffness(100)
				.reduceMotion(ReduceMotion.Never)}
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'flex-start',
				height: Platform.OS === 'web' ? '50%' : '52%',
				width: '100%',
				maxWidth: 500,
			}}
		>
			<View
				style={{
					borderRadius: 10,
					borderWidth: 2,
					borderColor: '#353835',
					overflow: 'hidden',
					paddingHorizontal: 7,
					paddingVertical: 5,
					width: '100%',
					maxWidth: 500,
					zIndex: 1,
					marginTop: 'auto',
				}}
			>
				{titleSuggestions.length > 0 &&
					titleSuggestions.reverse().map((suggestion) => (
						<Pressable
							key={suggestion}
							onPress={() => {
								if (suggestion === DAILY) {
									handleTitleSaveAndReset(
										`daily.${new Date().getFullYear()}.${new Date().getMonth()}.${new Date().getDate()}`,
									);
								} else {
									setTitle(`${suggestion}.`);
								}
							}}
						>
							<Text
								style={[
									{
										backgroundColor: 'black',
										fontFamily: 'spI',
										width: '100%',
										color: '#353835',
										fontSize: 23,
									},
									Platform.OS === 'web'
										? {
												//web-only style props
												//@ts-ignore
												outline: 'none',
											}
										: {},
								]}
							>
								{suggestion}
							</Text>
						</Pressable>
					))}
				<TextInput
					value={title}
					ref={ref_title}
					keyboardAppearance='dark'
					onKeyPress={(e) => handleTitleKeyPress(e)}
					onChangeText={(t) => handleTitleChange(t)}
					placeholder='title your work...'
					placeholderTextColor='#353835'
					enterKeyHint='done'
					autoCorrect={false}
					autoComplete='off'
					spellCheck={false}
					onSubmitEditing={() => handleTitleSaveAndReset()}
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
									outline: 'none',
								}
							: {},
					]}
				/>
			</View>
		</Animated.View>
	);
};
