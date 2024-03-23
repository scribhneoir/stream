import { createContext, useContext } from 'react';

export enum PlatformEnum {
	WEB = 'web',
	DESKTOP = 'desktop',
	IOS = 'ios',
	ANDROID = 'android',
}
export type PlatformContextType = {
	platformReady: boolean;
	platform: PlatformEnum;
};

export const PlatformContext = createContext<PlatformContextType | null>(null);

export const usePlatform = () => {
	const plat = useContext<PlatformContextType | null>(PlatformContext);
	if (!plat) {
		throw new Error(
			'You must call usePlatform() inside of a <PlatformProvider />',
		);
	}
	return plat;
};
