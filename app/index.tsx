import '../global.css';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { useFonts } from 'expo-font';
import { MarkdownTextInput } from '@expensify/react-native-live-markdown';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  useFonts({
    sp: require('../assets/fonts/SpaceMono/SpaceMono-Regular.ttf'),
    spB: require('../assets/fonts/SpaceMono/SpaceMono-Bold.ttf'),
    spI: require('../assets/fonts/SpaceMono/SpaceMono-Italic.ttf'),
    spBI: require('../assets/fonts/SpaceMono/SpaceMono-BoldItalic.ttf'),
  });

  const [text, setText] = React.useState('');

  return (
    <View className='relative flex h-full w-full items-center justify-start bg-black'>
      <MarkdownTextInput
        value={text}
        onChangeText={t => setText(t)}
        multiline
        autoFocus
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{
          fontFamily: 'sp',
          width: '90%',
          maxHeight: '50%',
          position: 'absolute',
          bottom: '50%',
          backgroundColor: 'black',
          color: '#B8C2B9',
          padding: 10,
          fontSize: 20,
          //web-only style props
          // @ts-ignore
          scrollbarWidth: 'none',
          // @ts-ignore
          outlineStyle: 'none',
        }}
      />
      <LinearGradient
        // Background Linear Gradient
        colors={['black', 'transparent']}
        locations={[0.5, 1]}
        style={{
          width: '90%',
          height: '50%',
          pointerEvents: 'none',
        }}
      />
      <StatusBar style='auto' />
    </View>
  );
}
