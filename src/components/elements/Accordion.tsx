import { FontAwesome } from '@expo/vector-icons';
import { type ReactNode, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';

function AccordionItem(props: {
	isExpanded: boolean;
	children: ReactNode;
	viewKey: string;
	duration: number;
}) {
	const { isExpanded, children, viewKey, duration } = props;
	const height = useSharedValue(0);

	const derivedHeight = useDerivedValue(() =>
		withTiming(height.value * Number(isExpanded), {
			duration,
		}),
	);
	const bodyStyle = useAnimatedStyle(() => ({
		height: derivedHeight.value,
	}));

	return (
		<Animated.View
			key={`accordionItem_${viewKey}`}
			style={[
				{
					width: '100%',
					overflow: 'hidden',
					borderBottomColor: '#353835',
					borderBottomWidth: 2,
				},
				bodyStyle,
			]}
		>
			<View
				onLayout={(e) => {
					height.value = e.nativeEvent.layout.height;
				}}
				style={{
					width: '100%',
					position: 'absolute',
					display: 'flex',
					alignItems: 'center',
				}}
			>
				<View
					style={{
						width: '100%',
						paddingBottom: 15,
					}}
				>
					{children}
				</View>
			</View>
		</Animated.View>
	);
}

export function Accordion(props: {
	title: string;
	children: ReactNode;
	icon?: React.ComponentProps<typeof FontAwesome>['name'];
	duration?: number;
}) {
	const { children, title, duration = 500 } = props;
	const [isExpanded, setIsExpanded] = useState(false);

	const rotation = useDerivedValue(() =>
		withTiming(90 * Number(isExpanded), {
			duration,
		}),
	);
	const rotationStyle = useAnimatedStyle(() => ({
		transform: [{ rotate: `${rotation.value}deg` }],
	}));

	return (
		<>
			<Pressable
				style={{
					width: '100%',
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
				onPress={() => setIsExpanded(!isExpanded)}
			>
				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						gap: 10,
					}}
				>
					{props.icon && (
						<FontAwesome name={props.icon} size={15} color='#B8C2B9' />
					)}
					<Text style={{ color: '#B8C2B9', fontFamily: 'sp', fontSize: 20 }}>
						{title}
					</Text>
				</View>
				<Animated.View style={rotationStyle}>
					<FontAwesome
						name='angle-right'
						size={20}
						color='#B8C2B9'
						style={{ marginTop: 3, cursor: 'pointer' }}
					/>
				</Animated.View>
			</Pressable>
			<AccordionItem
				isExpanded={isExpanded}
				viewKey={title}
				duration={duration}
			>
				{children}
			</AccordionItem>
		</>
	);
}
