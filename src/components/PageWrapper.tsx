import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { type ReactNode, useState } from 'react';
import { Image, Keyboard, Platform, Pressable, View } from 'react-native';
import Animated, {
	LinearTransition,
	ReduceMotion,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	measure,
	useAnimatedRef,
	runOnUI,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFileStorage } from '../providers/FileStorage';
import { PlatformEnum, usePlatform } from '../providers/Platform';
import { useSettings } from '../providers/Settings';
import FileTree from './FileTree';
import Splash from './Splash';
import { IconWrapper } from './elements/IconWrapper';
import { Text } from './elements/Text';

export default function PageWrapper(props: { children: ReactNode }) {
	const { children } = props;
	const { platform } = usePlatform();
	const { fileTree, fsReady } = useFileStorage();
	const { backgroundColor, accentColor, darkMode } = useSettings();
	const [fontsLoaded] = useFonts({
		sp: require('../../assets/fonts/SpaceMono/SpaceMono-Regular.ttf'),
		spB: require('../../assets/fonts/SpaceMono/SpaceMono-Bold.ttf'),
		spI: require('../../assets/fonts/SpaceMono/SpaceMono-Italic.ttf'),
		spBI: require('../../assets/fonts/SpaceMono/SpaceMono-BoldItalic.ttf'),
	});

	const [drawerOpen, setDrawerOpen] = useState(false);
	const router = useRouter();
	const width = useSharedValue(0);
	const animatedRef = useAnimatedRef();

	const toggleDrawer = (open: boolean) => {
		runOnUI(() => {
			const measurement = measure(animatedRef);
			width.value = open
				? withSpring(measurement?.width || 300, {
						duration: 200,
						dampingRatio: 1,
						stiffness: 100,
						overshootClamping: true,
						restDisplacementThreshold: 0.01,
						restSpeedThreshold: 2,
						reduceMotion: ReduceMotion.Never,
					})
				: withSpring(0, {
						duration: 200,
						dampingRatio: 1,
						stiffness: 100,
						overshootClamping: true,
						restDisplacementThreshold: 0.01,
						restSpeedThreshold: 2,
						reduceMotion: ReduceMotion.Never,
					});
		})();
		setDrawerOpen(open);
		Keyboard.dismiss();
	};

	const animatedStyles = useAnimatedStyle(() => {
		return {
			width: width.value,
		};
	});

	const handleStreamPress = () => {
		router.navigate('/');
		toggleDrawer(false);
	};

	const handleSettingsPress = () => {
		router.navigate('/settings');
		toggleDrawer(false);
	};

	if (platform !== PlatformEnum.DESKTOP && (!fsReady || !fontsLoaded)) {
		return <Splash />;
	}

	return (
		<View
			style={{
				backgroundColor,
				height: '100%',
				width: '100%',
			}}
		>
			<SafeAreaView
				style={{ position: 'relative', height: '100%', width: '100%' }}
			>
				<Animated.View
					style={{ position: 'relative', height: '100%', width: '100%' }}
					ref={animatedRef}
				>
					<Animated.View
						layout={LinearTransition}
						style={[
							animatedStyles,
							{
								position: 'absolute',
								left: 0,
								display: 'flex',
								flexDirection: 'row',
								zIndex: 10,
								height: '100%',
								width,
								overflow: 'hidden',
							},
						]}
					>
						<View
							style={{
								borderTopRightRadius: 10,
								borderBottomRightRadius: 10,
								height: '100%',
								paddingTop: 6,
								width: 300,
								gap: 8,
								backgroundColor: darkMode ? '#111211' : backgroundColor,
								overflow: 'hidden',
								display: 'flex',
							}}
						>
							<View
								style={{
									display: 'flex',
									flexDirection: 'row',
									gap: 10,
									alignItems: 'center',
									paddingLeft: 10,
								}}
							>
								<FontAwesome6
									onPress={() => toggleDrawer(!drawerOpen)}
									name='bars'
									size={25}
									color={accentColor}
									style={{ marginTop: 3, cursor: 'pointer' }}
								/>
								<Image
									style={{
										height: 20,
										width: 80,
										margin: 0,
									}}
									resizeMode='contain'
									source={require('../../assets/logo.png')}
								/>
							</View>
							<Pressable
								onPress={handleStreamPress}
								style={{
									backgroundColor: accentColor,
									alignItems: 'center',
									display: 'flex',
									flexDirection: 'row',
									gap: 5,
									padding: 4,
									paddingLeft: 10,
									cursor: 'pointer',
									pointerEvents: 'box-only',
								}}
							>
								<IconWrapper icon='edit' invert>
									<Text invert>flow</Text>
								</IconWrapper>
							</Pressable>
							<View
								style={[
									{
										flex: 1,
										display: 'flex',
										overflow: 'scroll',
										marginLeft: -12,
									},
									Platform.OS === 'web'
										? {
												//web-only style props
												// @ts-ignore
												overflowY: 'auto',
												overflowX: 'hidden',
											}
										: {},
								]}
							>
								<FileTree tree={fileTree} toggleDrawer={toggleDrawer} />
							</View>
							<Pressable
								onPress={handleSettingsPress}
								style={{
									borderTopWidth: 1,
									borderTopColor: '#B8C2B9',
									alignItems: 'center',
									display: 'flex',
									flexDirection: 'row',
									gap: 10,
									padding: 8,
									paddingLeft: 10,
									cursor: 'pointer',
									marginTop: 'auto',
								}}
							>
								<IconWrapper icon='gear'>
									<Text>settings</Text>
								</IconWrapper>
							</Pressable>
						</View>
						<Pressable
							onPress={() => toggleDrawer(false)}
							style={{
								position: 'absolute',
								zIndex: -1,
								width: '100%',
								height: '100%',
								backgroundColor: darkMode ? '#00000080' : '#777D7780',
							}}
						/>
					</Animated.View>
					<View
						style={{
							padding: 10,
							height: '96%',
							width: '100%',
						}}
					>
						<FontAwesome6
							onPress={() => toggleDrawer(true)}
							name='bars'
							size={25}
							color={accentColor}
							style={{ marginTop: -1 }}
						/>
						{children}
					</View>
				</Animated.View>
			</SafeAreaView>
			<StatusBar style='auto' />
		</View>
	);
}
