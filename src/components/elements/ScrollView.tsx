import type { ReactNode } from 'react';
import { Platform, ScrollView as View } from 'react-native';

export function ScrollView(props: {
	children: ReactNode;
}) {
	const { children } = props;
	return (
		<View
			style={[
				{
					display: 'flex',
					width: '100%',
					height: '90%',
					overflow: 'scroll',
				},
				Platform.OS === 'web'
					? {
							//web-only style props
							// @ts-ignore
							overflowY: 'auto',
							overflowX: 'hidden',
							padding: 10,
						}
					: {},
			]}
		>
			{children}
		</View>
	);
}
