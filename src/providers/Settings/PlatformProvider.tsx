import { type ReactNode, useEffect, useState } from 'react';
import { SettingsContext, type SettingsContextType } from './context';

const SettingsProvider = (props: { children: ReactNode }) => {
	const { children } = props;

	const wrapped: SettingsContextType = {};

	return (
		<SettingsContext.Provider value={wrapped}>
			{children}
		</SettingsContext.Provider>
	);
};
export default SettingsProvider;
