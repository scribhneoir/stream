import { Slot } from 'expo-router';
import PageWrapper from '../components/PageWrapper';
import { FileStorageProvider } from '../providers/FileStorage';
import { PlatformProvider } from '../providers/Platform';
import '../styles/scrollbar.css';

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
