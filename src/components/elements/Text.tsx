import { Text as ReactNativeText } from 'react-native';
import { useSettings } from '../../providers/Settings';

export function Text(props: {
	invert?: boolean;
	bold?: boolean;
	italic?: boolean;
	accent?: boolean;
	children: React.ReactNode;
}) {
	const { invert, bold, italic, accent, children } = props;
	const { primaryColor, accentColor, backgroundColor } = useSettings();

	return (
		<ReactNativeText
			style={{
				fontFamily: `sp${bold ? 'B' : ''}${italic ? 'I' : ''}`,
				fontSize: 16,
				color: invert ? backgroundColor : accent ? accentColor : primaryColor,
				textAlign: 'left',
				pointerEvents: 'none',
				userSelect: 'none',
			}}
		>
			{children}
		</ReactNativeText>
	);
}
