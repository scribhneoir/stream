import { Slot } from 'expo-router';
import React from 'react';
import PageWrapper from '../src/components/PageWrapper';
import { FileStorageProvider } from '../src/providers/FileStorage';
import { PlatformProvider } from '../src/providers/Platform';

export default function App() {
	return (
		<PlatformProvider>
			<FileStorageProvider>
				<PageWrapper>
					<Slot />
				</PageWrapper>
			</FileStorageProvider>
		</PlatformProvider>
	);
}
