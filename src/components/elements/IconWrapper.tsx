import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { View } from 'react-native';
import { useSettings } from '../../providers/Settings';
export const IconWrapper = (props: {
	icon: React.ComponentProps<typeof FontAwesome6>['name'];
	invert?: boolean;
	children?: React.ReactNode;
}) => {
	const { icon, invert, children } = props;
	const { accentColor, backgroundColor } = useSettings();
	return (
		<View
			style={{
				display: 'flex',
				flexDirection: 'row',
				gap: 8,
				alignItems: 'center',
			}}
		>
			<View
				style={{
					width: 15,
					marginTop: 3,
					display: 'flex',
					alignItems: 'flex-end',
					justifyContent: 'center',
				}}
			>
				<FontAwesome6
					name={icon}
					size={15}
					color={invert ? backgroundColor : accentColor}
				/>
			</View>
			{children}
		</View>
	);
};
