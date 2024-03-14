import { Entypo } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Animated, {
  ReduceMotion,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  useFonts({
    sp: require('../assets/fonts/SpaceMono/SpaceMono-Regular.ttf'),
    spB: require('../assets/fonts/SpaceMono/SpaceMono-Bold.ttf'),
    spI: require('../assets/fonts/SpaceMono/SpaceMono-Italic.ttf'),
    spBI: require('../assets/fonts/SpaceMono/SpaceMono-BoldItalic.ttf'),
  });

  const [drawerOpen, setDrawerOpen] = useState(false);
  const width = useSharedValue(0);
  const toggleDrawer = () => {
    width.value = drawerOpen
      ? withSpring(300, {
          duration: 300,
          dampingRatio: 1,
          stiffness: 100,
          overshootClamping: true,
          restDisplacementThreshold: 0.01,
          restSpeedThreshold: 2,
          reduceMotion: ReduceMotion.Never,
        })
      : withSpring(0, {
          duration: 300,
          dampingRatio: 1,
          stiffness: 100,
          overshootClamping: true,
          restDisplacementThreshold: 0.01,
          restSpeedThreshold: 2,
          reduceMotion: ReduceMotion.Never,
        });
    setDrawerOpen(!drawerOpen);
  };
  return (
    <View style={{ backgroundColor: 'black', height: '100%', width: '100%' }}>
      <SafeAreaView
        style={{ position: 'relative', height: '100%', width: '100%' }}
      >
        <View style={{ position: 'relative', height: '100%', width: '100%' }}>
          <Entypo
            onPress={toggleDrawer}
            name='menu'
            size={24}
            color='white'
          />
          {/* <View
            className={`absolute left-0 flex flex-col ${drawerOpen ? 'w-[300px] max-w-[300px]' : 'max-w-0'} z-10 h-full overflow-hidden bg-gray-800 transition-transform`}
          > */}
          <Animated.View
            style={{
              position: 'absolute',
              left: 0,
              display: 'flex',
              flexDirection: 'column',
              zIndex: 10,
              height: '100%',
              width,
              overflow: 'hidden',
              backgroundColor: '#374151',
            }}
          >
            <Entypo
              onPress={toggleDrawer}
              name='menu'
              size={24}
              color='white'
            />
            <Text style={{ color: 'white' }}>Drawer</Text>
          </Animated.View>
          <Text style={{ color: 'white' }}>Hello, World!</Text>
          <StatusBar style='light' />
          <Slot />
        </View>
      </SafeAreaView>
    </View>
  );
}
