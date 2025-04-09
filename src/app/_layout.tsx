import { Slot } from 'expo-router';
import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { FileStorageProvider } from '../providers/FileStorage';
import { PlatformProvider } from '../providers/Platform';

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
