import { Text as ReactNativeText } from 'react-native';
import { useSettings } from '../../providers/Settings';

export function Text(props: {
	invert?: boolean;
	bold?: boolean;
	italic?: boolean;
	children: React.ReactNode;
}) {
	const { invert, bold, italic, children } = props;
	const { primaryColor, backgroundColor } = useSettings();

	return (
		<ReactNativeText
			style={{
				fontFamily: `sp${bold ? 'B' : ''}${italic ? 'I' : ''}`,
				fontSize: 16,
				color: invert ? backgroundColor : primaryColor,
				textAlign: 'left',
			}}
		>
			{children}
		</ReactNativeText>
	);
}
