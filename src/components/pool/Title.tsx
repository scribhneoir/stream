import { useRef, useState } from 'react';
import { Platform, Pressable, Text, TextInput } from 'react-native';

export const PoolTitle = (props: {
	title: string;
	setTitle: (s: string) => void;
	onBlur: () => void;
}) => {
	const { title, setTitle, onBlur } = props;
	const titleRef = useRef<TextInput>(null);
	const [edit, setEdit] = useState(false);

	const toggleEdit = () => {
		if (!edit) {
			setEdit(true);
			setTimeout(() => {
				titleRef.current?.focus();
				//select end of text
				if (Platform.OS === 'web') {
					// @ts-ignore - accessing DOM properties
					const element = titleRef.current;
					// @ts-ignore - accessing DOM properties
					element?.setSelectionRange(
						// @ts-ignore - accessing DOM properties
						element.value.length,
						// @ts-ignore - accessing DOM properties
						element.value.length,
					);
				}
			}, 100);
			return;
		}
	};

	return (
		<Pressable
			onPress={toggleEdit}
			style={{
				maxWidth: 500,
				width: '100%',
				display: 'flex',
				alignContent: 'flex-start',
			}}
		>
			{edit ? (
				<TextInput
					value={title}
					onChangeText={setTitle}
					onBlur={() => {
						setEdit(false);
						onBlur();
					}}
					keyboardAppearance='dark'
					autoCorrect={false}
					autoComplete='off'
					spellCheck={false}
					ref={titleRef}
					style={[
						{
							fontFamily: 'sp',
							color: '#B8C2B9',
							fontSize: 25,
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
			) : (
				<Text
					style={[
						{
							fontFamily: 'sp',
							color: '#B8C2B9',
							fontSize: 25,
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
				>
					{title.split('.').at(-1)}
				</Text>
			)}
		</Pressable>
	);
};
