import { Pressable, View } from 'react-native';
import { useSettings } from '../../providers/Settings';

export const ColorSelector = (props: {
	color: string;
	setColor: (color: string) => void;
	selected: boolean;
}) => {
	const { color, setColor, selected } = props;
	const { backgroundColor } = useSettings();

	return (
		<Pressable
			style={{
				borderWidth: selected ? 4 : 0,
				borderColor: color,
				borderRadius: 100,
				marginHorizontal: -6,
			}}
			onPress={() => setColor(color)}
		>
			<View
				style={{
					width: selected ? 45 : 50,
					height: selected ? 45 : 50,
					backgroundColor: color, // Example color
					borderRadius: 100,
					borderColor: backgroundColor,
					borderWidth: 4,
				}}
			/>
		</Pressable>
	);
};
