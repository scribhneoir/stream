import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useState } from 'react';
import { Pressable, Switch, View } from 'react-native';
import { Accordion } from '../../components/elements/Accordion';
import { ColorSelector } from '../../components/elements/ColorSelector';
import { IconWrapper } from '../../components/elements/IconWrapper';
import { ScrollView } from '../../components/elements/ScrollView';
import { Text } from '../../components/elements/Text';
import { useSettings } from '../../providers/Settings';

export default function Settings() {
	const { setAccentColor, accentColor, colors, setDarkMode, darkMode } =
		useSettings();
	const toggleSwitch = () => setDarkMode(!darkMode);

	return (
		<View
			style={{
				display: 'flex',
				alignItems: 'flex-start',
				justifyContent: 'space-between',
				height: '100%',
				width: '100%',
				marginLeft: 'auto',
				marginRight: 'auto',
				maxWidth: 500,
				gap: 10,
			}}
		>
			<Text>settings</Text>
			<ScrollView>
				<Accordion title='appearance' icon='paintbrush'>
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-between',
							width: '100%',
						}}
					>
						<IconWrapper icon='cloud-moon'>
							<Text>dark mode</Text>
						</IconWrapper>
						<Switch
							trackColor={{ false: '#777D77', true: accentColor }}
							thumbColor='#B8C2B9'
							//@ts-ignore
							activeThumbColor='#B8C2B9'
							onValueChange={toggleSwitch}
							value={darkMode}
						/>
					</View>
					<IconWrapper icon='rainbow'>
						<Text>accent color</Text>
					</IconWrapper>
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-between',
							width: '100%',
							marginTop: 10,
						}}
					>
						{colors.map((color) => (
							<ColorSelector
								key={color}
								color={color}
								setColor={setAccentColor}
								selected={accentColor === color}
							/>
						))}
					</View>
				</Accordion>
				<Accordion title='daily' icon='calendar'>
					<Text>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat. Duis aute irure dolor in
						reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
						pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
						culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
						dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Ut enim ad minim
						veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
						ea commodo consequat. Duis aute irure dolor in reprehenderit in
						voluptate velit esse cillum dolore eu fugiat nulla pariatur.
						Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
						officia deserunt mollit anim id est laborum.
					</Text>
				</Accordion>
				<Accordion title='publish' icon='paper-plane'>
					<Text>Feature coming soon! Stay tuned for updates.</Text>
				</Accordion>
			</ScrollView>
			<View>
				<View>
					<Pressable
						style={{
							borderColor: '#B8C2B9',
							borderWidth: 1,
							padding: 10,
							borderRadius: 10,
						}}
					>
						<Text>feedback</Text>
					</Pressable>
				</View>
				<Text>stream v0.1.0 | developed by scribhneoir</Text>
			</View>
		</View>
	);
}
