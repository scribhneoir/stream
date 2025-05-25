import { Text, View } from 'react-native';

export default function Settings() {
	/**
	 * Settings:
	 * - Appearance
	 *   - Preset
	 *   - Custom
	 *   - Fonts?
	 *   - Font size
	 * - Daily folder
	 * - Daily folder name
	 * - Daily folder format
	 * - Donate / feature request
	 * - App version & developer
	 */

	return (
		<View>
			<Text
				style={{
					color: '#B8C2B9',
					fontFamily: 'spB',
					fontSize: 21,
					marginTop: 4,
				}}
			>
				settings
			</Text>
		</View>
	);
}
