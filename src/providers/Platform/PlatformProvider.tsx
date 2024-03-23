import React, { type ReactNode, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import {
	PlatformContext,
	type PlatformContextType,
	PlatformEnum,
} from './context';

const FileStorageProvider = (props: { children: ReactNode }) => {
	const { children } = props;
	const [platformReady, setPlatformReady] = useState<boolean>(false);
	const [platform, setPlatform] = useState<PlatformEnum>(PlatformEnum.WEB);

	useEffect(() => {
		if (Platform.OS === 'web') {
			// @ts-ignore
			if (window.__TAURI__) {
				setPlatform(PlatformEnum.DESKTOP);
			} else {
				setPlatform(PlatformEnum.WEB);
			}
		} else if (Platform.OS === 'ios') {
			setPlatform(PlatformEnum.IOS);
		} else if (Platform.OS === 'android') {
			setPlatform(PlatformEnum.ANDROID);
		}
		setPlatformReady(true);
	}, []);

	const wrapped: PlatformContextType = {
		platformReady,
		platform,
	};

	return (
		<PlatformContext.Provider value={wrapped}>
			{children}
		</PlatformContext.Provider>
	);
};
export default FileStorageProvider;
