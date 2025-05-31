import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import {
	type NativeSyntheticEvent,
	Platform,
	Pressable,
	TextInput,
	type TextInputKeyPressEventData,
} from 'react-native';
import Animated, {
	FadeInUp,
	ReduceMotion,
	FadeOutUp,
} from 'react-native-reanimated';
import { useSettings } from '../../providers/Settings';

export const VeiledTextInput = (props: {
	text: string;
	tags: string;
	setText: (text: string) => void;
	setTags: (tags: string) => void;
	setShowTitle: (show: boolean) => void;
}) => {
	const { text, tags, setText, setTags, setShowTitle } = props;
	const { backgroundColor, primaryColor, accentColor } = useSettings();

	const [enterCount, setEnterCount] = useState(0);
	const [tagInit, setTagInit] = useState(false);

	const ref_text = useRef<TextInput>(null);
	const ref_tags = useRef<TextInput>(null);

	const handleTextKeyPress = (
		e: NativeSyntheticEvent<TextInputKeyPressEventData>,
	) => {
		if (e.nativeEvent.key === 'Enter') {
			if (enterCount >= 3) {
				ref_text.current?.blur();
				setText(text.trim());
				setShowTitle(true);
				// handleSave();
			} else {
				setEnterCount(enterCount + 1);
			}
		} else {
			if (enterCount) {
				setEnterCount(0);
			}
			if (e.nativeEvent.key === '#') {
				setTagInit(true);
			} else if (tagInit) {
				setTagInit(false);
				if (e.nativeEvent.key !== ' ') {
					setTags(`${tags} #${e.nativeEvent.key}`);
					setText(text.substring(0, text.length - 1));
					ref_tags.current?.focus();
				}
			}
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
		if (ref_text.current) {
			setTimeout(() => {
				setWebInputDim();
				ref_text.current?.focus();
				//select end of text
				if (Platform.OS === 'web') {
					// @ts-ignore - accessing DOM properties
					const element = ref_text.current;
					// @ts-ignore - accessing DOM properties
					element.setSelectionRange(element.value.length, element.value.length);
				}
			}, 100);
		}
	}, []);

	return (
		<Animated.View
			entering={FadeInUp.springify()
				.mass(1)
				.damping(15)
				.stiffness(100)
				.reduceMotion(ReduceMotion.Never)}
			exiting={FadeOutUp.springify()
				.mass(1)
				.damping(15)
				.stiffness(100)
				.reduceMotion(ReduceMotion.Never)}
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'flex-start',
				height: Platform.OS === 'web' ? '80%' : '100%',
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
						backgroundColor: backgroundColor,
						fontFamily: 'spB',
						width: '100%',
						color: accentColor,
						fontSize: 14,
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
					spellCheck={false}
					placeholder='Write something...'
					placeholderTextColor={accentColor}
					ref={ref_text}
					onKeyPress={(e) => handleTextKeyPress(e)}
					onChange={(e) => {
						setText(e.nativeEvent.text);
						setWebInputDim();
					}}
					style={[
						{
							fontFamily: 'sp',
							width: '100%',
							position: 'absolute',
							bottom: '50%',
							color: primaryColor,
							fontSize: 18,
							verticalAlign: 'bottom',
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
					colors={[backgroundColor, 'transparent']}
					locations={[0.5, 1]}
					style={{
						width: '100%',
						height: Platform.OS === 'web' ? '50%' : '40%',
						pointerEvents: 'none',
					}}
				/>
			</Pressable>
		</Animated.View>
	);
};
