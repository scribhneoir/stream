import { createContext, useContext } from 'react';

export type SettingsContextType = {
	darkMode: boolean;
	setDarkMode: (value: boolean) => void;
	accentColor: string;
	setAccentColor: (value: string) => void;
	colors: string[];
	primaryColor: string;
	backgroundColor: string;
};

export const SettingsContext = createContext<SettingsContextType | null>(null);

export const useSettings = () => {
	const set = useContext<SettingsContextType | null>(SettingsContext);
	if (!set) {
		throw new Error(
			'You must call useSettings() inside of a <SettingsProvider />',
		);
	}
	return set;
};
