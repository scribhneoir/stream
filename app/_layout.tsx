import { Entypo, FontAwesome } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState } from 'react';
import { View, Text, Pressable, Keyboard, Image, Platform } from 'react-native';
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

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    sp: require('../assets/fonts/SpaceMono/SpaceMono-Regular.ttf'),
    spB: require('../assets/fonts/SpaceMono/SpaceMono-Bold.ttf'),
    spI: require('../assets/fonts/SpaceMono/SpaceMono-Italic.ttf'),
    spBI: require('../assets/fonts/SpaceMono/SpaceMono-BoldItalic.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const width = useSharedValue(0);
  const animatedRef = useAnimatedRef();

  const test = async () => {
    if (Platform.OS === 'web') {
      // @ts-ignore
      const dirHandle = await window.showDirectoryPicker({
        id: 'pool',
        mode: 'readwrite',
        startIn: 'documents',
      });
      for await (const entry of dirHandle.values()) {
        console.log(entry.kind, entry.name);
      }
    }
  };

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
    test();
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: width.value,
    };
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View
      style={{ backgroundColor: 'black', height: '100%', width: '100%' }}
      onLayout={onLayoutRootView}
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
                <Entypo
                  onPress={() => toggleDrawer(!drawerOpen)}
                  name='menu'
                  size={35}
                  color='#B8C2B9'
                  style={{ marginTop: 3 }}
                />
                <Image
                  style={{
                    height: 20,
                    width: 80,
                    resizeMode: 'contain',
                    margin: 0,
                  }}
                  source={require('../assets/logo.png')}
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
                  Flow
                </Text>
              </Pressable>
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
            <Entypo
              onPress={() => toggleDrawer(!drawerOpen)}
              name='menu'
              size={35}
              style={{ marginTop: 3 }}
              color='#B8C2B9'
            />
            <Slot />
          </View>
        </Animated.View>
      </SafeAreaView>
      <StatusBar style='auto' />
    </View>
  );
}
