import { Pressable } from 'react-native';
import { useSettings } from '../../providers/Settings';
import { Text } from './Text';

export function Button(props: {
	children?: React.ReactNode;
	primary?: boolean;
	onPress: () => void;
}) {
	const { children, primary, onPress } = props;
	const { accentColor, backgroundColor } = useSettings();
	return (
		<Pressable
			onPress={onPress}
			style={{
				paddingHorizontal: 8,
				paddingVertical: 4,
				backgroundColor: primary ? accentColor : backgroundColor,
				borderColor: accentColor,
				borderWidth: 2,
				borderRadius: 10,
				cursor: 'pointer',
			}}
		>
			<Text invert={primary} bold={primary} accent>
				{children}
			</Text>
		</Pressable>
	);
}
