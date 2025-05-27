import { createContext, useContext } from 'react';

// biome-ignore lint/complexity/noBannedTypes: not implemented yet
export type SettingsContextType = {};

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
