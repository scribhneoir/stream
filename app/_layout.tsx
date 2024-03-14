import { Entypo } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Animated, {
  LinearTransition,
  ReduceMotion,
  useAnimatedStyle,
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
      ? withSpring(0, {
          duration: 300,
          dampingRatio: 1,
          stiffness: 100,
          overshootClamping: true,
          restDisplacementThreshold: 0.01,
          restSpeedThreshold: 2,
          reduceMotion: ReduceMotion.Never,
        })
      : withSpring(300, {
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

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: width.value,
    };
  });

  return (
    <View style={{ backgroundColor: 'black', height: '100%', width: '100%' }}>
      <SafeAreaView
        style={{ position: 'relative', height: '100%', width: '100%' }}
      >
        <View style={{ position: 'relative', height: '100%', width: '100%' }}>
          <Animated.View
            layout={LinearTransition}
            style={[
              animatedStyles,
              {
                position: 'absolute',
                left: 0,
                display: 'flex',
                flexDirection: 'column',
                zIndex: 10,
                height: '100%',
                overflow: 'hidden',
                backgroundColor: '#374151',
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
              },
            ]}
          >
            <View style={{ padding: 10, width: 300 }}>
              <Entypo
                onPress={toggleDrawer}
                name='menu'
                size={24}
                color='white'
              />
              <Text style={{ color: 'white' }}>Drawer</Text>
            </View>
          </Animated.View>
          <View style={{ padding: 10, height: '100%', width: '100%' }}>
            <Entypo
              onPress={toggleDrawer}
              name='menu'
              size={24}
              color='white'
            />
            <Text style={{ color: 'white' }}>Hello, World!</Text>
            <Slot />
          </View>
        </View>
      </SafeAreaView>
      <StatusBar style='auto' />
    </View>
  );
}
