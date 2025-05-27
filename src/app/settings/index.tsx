import { useState } from 'react';
import { Button, Platform, Pressable, Switch, Text, View } from 'react-native';
import { Accordion } from '../../components/elements/Accordion';
import { ColorSelector } from '../../components/elements/ColorSelector';
import { ScrollView } from '../../components/elements/ScrollView';

export default function Settings() {
	const [isEnabled, setIsEnabled] = useState(false);
	const [selectedColor, setSelectedColor] = useState('#B8C2B9'); // Default color
	const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

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
			<Text
				style={{
					color: '#B8C2B9',
					fontFamily: 'spB',
					fontSize: 21,
				}}
			>
				settings
			</Text>
			<ScrollView>
				<Accordion title='appearance' icon='paint-brush'>
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-between',
							width: '100%',
						}}
					>
						<Text
							style={{
								color: '#B8C2B9',
								fontFamily: 'sp',
								fontSize: 21,
							}}
						>
							dark mode
						</Text>
						<Switch
							trackColor={{ false: '#3e3e3e', true: selectedColor }}
							thumbColor='#B8C2B9'
							//@ts-ignore
							activeThumbColor='#B8C2B9'
							onValueChange={toggleSwitch}
							value={isEnabled}
						/>
					</View>
					<Text
						style={{
							color: '#B8C2B9',
							fontFamily: 'sp',
							fontSize: 21,
						}}
					>
						accent color
					</Text>
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-between',
							width: '100%',
						}}
					>
						<ColorSelector
							color='#e66374' // Example color
							setColor={setSelectedColor}
							selectedColor={selectedColor} // Change to true if this color is selected
						/>
						<ColorSelector
							color='#e0ac63' // Example color
							setColor={setSelectedColor}
							selectedColor={selectedColor}
						/>
						<ColorSelector
							color='#6d946f' // Example color
							setColor={setSelectedColor}
							selectedColor={selectedColor}
						/>
						<ColorSelector
							color='#65929d' // Example color
							setColor={setSelectedColor}
							selectedColor={selectedColor}
						/>
						<ColorSelector
							color='#9477a3' // Example color
							setColor={setSelectedColor}
							selectedColor={selectedColor}
						/>
						<ColorSelector
							color='#B8C2B9' // Example color
							setColor={setSelectedColor}
							selectedColor={selectedColor}
						/>
					</View>
				</Accordion>
				<Accordion title='daily' icon='calendar'>
					<Text
						style={{
							color: '#B8C2B9',
							fontFamily: 'sp',
							fontSize: 21,
						}}
					>
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
					<Text
						style={{
							color: '#B8C2B9',
							fontFamily: 'sp',
							fontSize: 21,
						}}
					>
						Feature coming soon! Stay tuned for updates.
					</Text>
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
						<Text
							style={{
								color: '#B8C2B9',
								fontFamily: 'sp',
								fontSize: 20,
							}}
						>
							feedback
						</Text>
					</Pressable>
				</View>
				<Text
					style={{
						color: '#B8C2B9',
						fontFamily: 'sp',
						fontSize: 14,
						textAlign: 'center',
					}}
				>
					stream v0.1.0 | developed by scribhneoir
				</Text>
			</View>
		</View>
	);
}
