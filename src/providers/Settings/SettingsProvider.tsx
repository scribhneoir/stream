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

	useEffect(() => {
		if (
			(!darkMode && accentColor === '#b8c2b9') ||
			(darkMode && accentColor === '#353835')
		) {
			setAccentColor(primaryColor); // Reset to default if it matches primary color
		}
	}, [darkMode, primaryColor, accentColor]);

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
