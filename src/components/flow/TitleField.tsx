import { useEffect, useMemo, useRef } from 'react';
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

export const TitleField = (props: {
	title: string;
	setTitle: (title: string) => void;
	setShowTitle: (show: boolean) => void;
	handleSave: () => void;
}) => {
	const { title, setTitle, setShowTitle, handleSave } = props;
	const { fileList, fsReady } = useFileStorage();

	const ref_title = useRef<TextInput>(null);

	const handleTitleChange = (t: string) => {
		const newTitle = t.replace(' ', '.').toLocaleLowerCase();
		setTitle(newTitle);
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
			.filter((file) => file.startsWith(title))
			.slice(0, 5);
		return new Array(...new Set(suggestions));
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
				justifyContent: 'center',
				height: Platform.OS === 'web' ? '80%' : '100%',
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
				}}
			>
				{titleSuggestions.length > 0 &&
					titleSuggestions.reverse().map((suggestion, index) => (
						<Pressable
							key={suggestion}
							onPress={() => setTitle(`${suggestion}.`)}
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
												// @ts-ignore
												outlineStyle: 'none',
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
									outlineStyle: 'none',
								}
							: {},
					]}
				/>
			</View>
		</Animated.View>
	);
};
