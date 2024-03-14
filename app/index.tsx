import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { View, TextInput, Platform } from 'react-native';

export default function Flow() {
  const [text, setText] = useState('');

  return (
    <View
      style={{
        position: 'relative',
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <TextInput
        value={text}
        onChangeText={t => setText(t)}
        multiline
        autoFocus
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onChange={e => {
          if (Platform.OS === 'web') {
            // @ts-ignore
            e.nativeEvent.target.style.height = 0;
            // @ts-ignore
            e.nativeEvent.target.style.height = `${e.nativeEvent.target.scrollHeight}px`;
          }
        }}
        style={{
          fontFamily: 'sp',
          width: '90%',
          lineHeight: 35,
          maxHeight: '50%',
          position: 'absolute',
          bottom: '50%',
          color: '#B8C2B9',
          padding: 10,
          fontSize: 20,
          textAlignVertical: 'bottom',
          paddingTop: 0,
          paddingBottom: 0,
          //web-only style props
          // @ts-ignore
          scrollbarWidth: 'none',
          // @ts-ignore
          outlineStyle: 'none',
        }}
      />
      <LinearGradient
        colors={['black', 'transparent']}
        locations={[0.5, 1]}
        style={{
          width: '90%',
          height: '50%',
          pointerEvents: 'none',
        }}
      />
    </View>
  );
}
