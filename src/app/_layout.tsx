import { Slot } from 'expo-router';
import PageWrapper from '../components/PageWrapper';
import { FileStorageProvider } from '../providers/FileStorage';
import { PlatformProvider } from '../providers/Platform';
import '../styles/scrollbar.css';
import SettingsProvider from '../providers/Settings/SettingsProvider';

export default function App() {
	return (
		<PlatformProvider>
			<FileStorageProvider>
				<SettingsProvider>
					<PageWrapper>
						<Slot />
					</PageWrapper>
				</SettingsProvider>
			</FileStorageProvider>
		</PlatformProvider>
	);
}
