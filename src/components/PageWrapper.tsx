import { FontAwesome } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import React, { type ReactNode, useState } from 'react';
import { Image, Keyboard, Pressable, Text, View } from 'react-native';
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
	const { platform, platformReady } = usePlatform();
	const { fileTree, fsReady } = useFileStorage();
	const [fontsLoaded] = useFonts({
		sp: require('../../assets/fonts/SpaceMono/SpaceMono-Regular.ttf'),
		spB: require('../../assets/fonts/SpaceMono/SpaceMono-Bold.ttf'),
		spI: require('../../assets/fonts/SpaceMono/SpaceMono-Italic.ttf'),
		spBI: require('../../assets/fonts/SpaceMono/SpaceMono-BoldItalic.ttf'),
	});

	const [drawerOpen, setDrawerOpen] = useState(false);
	const width = useSharedValue(0);
	const animatedRef = useAnimatedRef();

	const toggleDrawer = (open: boolean) => {
		runOnUI(() => {
			const measurement = measure(animatedRef);
			width.value = open
				? withSpring(0, {
						duration: 200,
						dampingRatio: 1,
						stiffness: 100,
						overshootClamping: true,
						restDisplacementThreshold: 0.01,
						restSpeedThreshold: 2,
						reduceMotion: ReduceMotion.Never,
				  })
				: withSpring(measurement?.width || 300, {
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
		if (!open) {
			Keyboard.dismiss();
		}
	};

	const animatedStyles = useAnimatedStyle(() => {
		return {
			width: width.value,
		};
	});

	return (
		<>
			{!fontsLoaded || !platformReady || !fsReady ? (
				<>
					<Splash />
				</>
			) : (
				<View
					style={{ backgroundColor: 'black', height: '100%', width: '100%' }}
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
									}}
								>
									<View
										style={{
											display: 'flex',
											flexDirection: 'row',
											gap: 2,
											alignItems: 'center',
										}}
									>
										<FontAwesome
											onPress={() => toggleDrawer(!drawerOpen)}
											name='bars'
											size={25}
											color='#B8C2B9'
											style={{ marginTop: 3 }}
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
										onPress={() => toggleDrawer(!drawerOpen)}
										style={{
											backgroundColor: '#B8C2B9',
											alignItems: 'center',
											display: 'flex',
											flexDirection: 'row',
											gap: 10,
											padding: 4,
											paddingLeft: 10,
											marginLeft: 4,
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
									<FileTree tree={fileTree} />
								</View>
								<Pressable
									onPress={() => toggleDrawer(!drawerOpen)}
									style={{
										width: '100%',
										height: '100%',
										backgroundColor: '#00000088',
									}}
								/>
							</Animated.View>
							<View style={{ padding: 10, height: '100%', width: '100%' }}>
								<FontAwesome
									onPress={() => toggleDrawer(!drawerOpen)}
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
			)}
		</>
	);
}
