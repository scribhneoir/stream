import { FontAwesome } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { type ReactNode, useState } from 'react';
import { Image, Keyboard, Platform, Pressable, Text, View } from 'react-native';
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
import FileTree from './FileTree';
import Splash from './Splash';

export default function PageWrapper(props: { children: ReactNode }) {
	const { children } = props;
	const { platform } = usePlatform();
	const { fileTree, fsReady } = useFileStorage();
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

	if (platform === PlatformEnum.WEB && !fsReady) {
		return <Splash />;
	}

	return (
		<View style={{ backgroundColor: 'black', height: '100%', width: '100%' }}>
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
								borderTopRightRadius: 10,
								borderBottomRightRadius: 10,
							},
						]}
					>
						<View
							style={{
								borderTopRightRadius: 10,
								borderBottomRightRadius: 10,
								height: '100%',
								paddingTop: 10,
								paddingLeft: 10,
								paddingBottom: 10,
								width: 300,
								gap: 8,
								backgroundColor: '#111211',
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
								}}
							>
								<FontAwesome
									onPress={() => toggleDrawer(!drawerOpen)}
									name='bars'
									size={25}
									color='#B8C2B9'
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
									backgroundColor: '#B8C2B9',
									alignItems: 'center',
									display: 'flex',
									flexDirection: 'row',
									gap: 10,
									padding: 4,
									paddingLeft: 10,
									marginLeft: -10,
									cursor: 'pointer',
								}}
							>
								<FontAwesome
									name='pencil-square-o'
									size={24}
									color='black'
									style={{ marginTop: 3 }}
								/>
								<Text
									style={{
										color: '#000000',
										fontFamily: 'spB',
										fontSize: 20,
										marginTop: -1,
									}}
								>
									flow
								</Text>
							</Pressable>
							<Text
								style={{
									color: '#B8C2B9',
									fontFamily: 'sp',
									fontSize: 15,
									marginTop: -1,
									marginLeft: 0,
									borderColor: '#B8C2B9',
									borderBottomWidth: 1,
									paddingBottom: 2,
								}}
							>
								pool
							</Text>
							<View
								style={[
									{
										flex: 1,
										display: 'flex',
										overflow: 'scroll',
									},
									Platform.OS === 'web'
										? {
												//web-only style props
												// @ts-ignore
												scrollbarColor: '#B8C2B9 #111211',
												'&::WebkitScrollbarColor': '#B8C2B9 #111211',
												overflowY: 'scroll',
												overflowX: 'hidden',
											}
										: {},
								]}
							>
								<FileTree tree={fileTree} toggleDrawer={toggleDrawer} />
							</View>
						</View>
						<Pressable
							onPress={() => toggleDrawer(false)}
							style={{
								width: '100%',
								height: '100%',
								backgroundColor: '#00000088',
							}}
						/>
					</Animated.View>
					<View style={{ padding: 10, height: '100%', width: '100%' }}>
						<FontAwesome
							onPress={() => toggleDrawer(true)}
							name='bars'
							size={25}
							color='#B8C2B9'
							style={{ marginTop: 3 }}
						/>
						{children}
					</View>
				</Animated.View>
			</SafeAreaView>
			<StatusBar style='auto' />
		</View>
	);
}
