import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { useFileStorage } from '../providers/FileStorage';
import { PlatformEnum, usePlatform } from '../providers/Platform';
const Splash = () => {
	const { platform, platformReady } = usePlatform();
	const { setRootDir } = useFileStorage();
	return (
		<View
			style={{
				backgroundColor: 'black',
				height: '100%',
				width: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Image
				style={{
					height: 40,
					width: 160,
					margin: 0,
				}}
				resizeMode='contain'
				source={require('../../assets/logo.png')}
			/>
			{platformReady && platform === PlatformEnum.WEB && (
				<Pressable
					onPress={setRootDir}
					style={{
						backgroundColor: '#B8C2B9',
						marginTop: 10,
						paddingHorizontal: 4,
						paddingBottom: 3,
						paddingTop: 1,
					}}
				>
					<Text style={{ fontFamily: 'sp' }}>choose directory</Text>
				</Pressable>
			)}
		</View>
	);
};

export default Splash;
