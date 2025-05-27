import { Pressable, View } from 'react-native';

export const ColorSelector = (props: {
	color: string;
	setColor: (color: string) => void;
	selectedColor: string;
}) => {
	const { color, setColor, selectedColor } = props;
	const selected = selectedColor === color;
	return (
		<Pressable
			style={{
				borderWidth: selected ? 2 : 0,
				borderColor: color,
				borderRadius: 100,
			}}
			onPress={() => setColor(color)}
		>
			<View
				style={{
					width: selected ? 45 : 50,
					height: selected ? 45 : 50,
					backgroundColor: color, // Example color
					borderRadius: 100,
					borderWidth: 4,
				}}
			/>
		</Pressable>
	);
};
