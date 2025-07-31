import AsyncStorage from '@react-native-async-storage/async-storage';
import {
	type ReactNode,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { SettingsContext, type SettingsContextType } from './context';

const SettingsProvider = (props: { children: ReactNode }) => {
	const { children } = props;
	const [darkMode, setDarkMode] = useState(true);
	const [accentColor, setAccentColor] = useState('#b8c2b9'); // Default color

	const primaryColor = useMemo(() => {
		return darkMode ? '#b8c2b9' : '#353835';
	}, [darkMode]);

	const backgroundColor = useMemo(() => {
		return darkMode ? '#000000' : '#ede6de';
	}, [darkMode]);

	const colors = useMemo(
		() => [primaryColor, '#9477a3', '#65929d', '#6d946f', '#e0ac63', '#e66374'],
		[primaryColor],
	);

	const loadSettings = useCallback(async () => {
		const darkMode = await AsyncStorage.getItem('darkMode');
		const accentColor = await AsyncStorage.getItem('accentColor');
		setDarkMode(darkMode === 'true');
		setAccentColor(accentColor ?? '#b8c2b9');
	}, []);

	const saveSettings = useCallback(async () => {
		await AsyncStorage.setItem('darkMode', darkMode.toString());
		await AsyncStorage.setItem('accentColor', accentColor);
	}, [darkMode, accentColor]);

	useEffect(() => {
		loadSettings();
	}, [loadSettings]);

	useEffect(() => {
		if (
			(!darkMode && accentColor === '#b8c2b9') ||
			(darkMode && accentColor === '#353835')
		) {
			setAccentColor(primaryColor); // Reset to default if it matches primary color
		}
		saveSettings();
	}, [darkMode, primaryColor, accentColor, saveSettings]);

	const wrapped: SettingsContextType = {
		darkMode,
		setDarkMode,
		accentColor,
		setAccentColor,
		colors,
		primaryColor,
		backgroundColor,
	};

	return (
		<SettingsContext.Provider value={wrapped}>
			{children}
		</SettingsContext.Provider>
	);
};
export default SettingsProvider;
