import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { type ReactNode, useState } from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { IconWrapper } from './IconWrapper';
import { Text } from './Text';

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
					borderBottomColor: '#777D77',
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
						paddingHorizontal: 20,
						paddingTop: 10,
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
	icon?: React.ComponentProps<typeof FontAwesome6>['name'];
	duration?: number;
}) {
	const { children, title, icon, duration = 500 } = props;
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

					paddingTop: 3,
					paddingBottom: 5,
					paddingLeft: 2,
				}}
				onPress={() => setIsExpanded(!isExpanded)}
			>
				<IconWrapper icon={props.icon ?? 'circle'}>
					<Text>{title}</Text>
				</IconWrapper>
				<Animated.View style={rotationStyle}>
					<FontAwesome6
						name='angle-right'
						size={18}
						color='#777D77'
						style={{ cursor: 'pointer' }}
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
