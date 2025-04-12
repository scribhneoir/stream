import { useEffect, useRef } from 'react';
import {
	type NativeSyntheticEvent,
	Platform,
	TextInput,
	type TextInputKeyPressEventData,
} from 'react-native';
import Animated, {
	ReduceMotion,
	SlideInDown,
	SlideOutDown,
} from 'react-native-reanimated';

export const TitleField = (props: {
	title: string;
	setTitle: (title: string) => void;
	setShowTitle: (show: boolean) => void;
	handleSave: () => void;
}) => {
	const { title, setTitle, setShowTitle, handleSave } = props;

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
		}
	};

	useEffect(() => {
		if (ref_title.current) {
			setTimeout(() => ref_title.current?.focus(), 100);
		}
	}, []);

	return (
		<Animated.View
			entering={SlideInDown.springify().reduceMotion(ReduceMotion.Never)}
			exiting={SlideOutDown.springify().reduceMotion(ReduceMotion.Never)}
			style={{
				borderRadius: 10,
				borderWidth: 2,
				borderColor: '#353835',
				overflow: 'hidden',
				paddingHorizontal: 7,
				// position: 'absolute',
				// top: '30%',
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
		</Animated.View>
	);
};
