import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  Platform,
  Pressable,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';

export default function Flow() {
  const [reset, setReset] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [tags, setTags] = useState<string>('');
  const [enterCount, setEnterCount] = useState(0);
  const [tagInit, setTagInit] = useState(false);

  const ref_title = useRef<TextInput>(null);
  const ref_text = useRef<TextInput>(null);
  const ref_tags = useRef<TextInput>(null);

  const handleStateReset = () => {
    setReset(true);
    setTitle('');
    setText('');
    setTags('');
    setEnterCount(0);
    setTagInit(false);
    ref_title.current?.focus();
  };

  const handleTitleChange = (t: string) => {
    const newTitle = t.replace(' ', '.').toLocaleLowerCase();
    setTitle(newTitle);
  };

  const handleTextKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => {
    if (e.nativeEvent.key === 'Enter') {
      if (enterCount >= 3) {
        //todo: handle save
        handleStateReset();
      } else {
        setEnterCount(enterCount + 1);
      }
    } else if (
      text.length === 0 &&
      (e.nativeEvent.key === 'Backspace' || e.nativeEvent.key === 'Delete')
    ) {
      ref_title.current?.focus();
    } else {
      if (enterCount) {
        setEnterCount(0);
      }
      if (e.nativeEvent.key === '#') {
        setTagInit(true);
      } else if (tagInit) {
        setTagInit(false);
        if (e.nativeEvent.key !== ' ') {
          setReset(true);
          setTags(tags + ' #' + e.nativeEvent.key);
          setText(text.substring(0, text.length - 1));
          ref_tags.current?.focus();
        }
      }
    }
  };

  return (
    <View
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <TextInput
        value={title}
        ref={ref_title}
        keyboardAppearance='dark'
        onChangeText={t => handleTitleChange(t)}
        placeholder='title'
        placeholderTextColor='#353835'
        returnKeyType='done'
        autoFocus
        autoCorrect={false}
        autoComplete='off'
        spellCheck={false}
        onSubmitEditing={() =>
          title ? ref_text.current?.focus() : ref_title.current?.focus()
        }
        style={[
          {
            backgroundColor: 'black',
            fontFamily: 'spB',
            width: '100%',
            color: '#B8C2B9',
            fontSize: 25,
          },
          Platform.OS === 'web'
            ? {
                //web-only style props
                // @ts-ignore
                scrollbarWidth: 'none',
                // @ts-ignore
                outlineStyle: 'none',
              }
            : {},
        ]}
      />
      <TextInput
        value={tags}
        ref={ref_tags}
        keyboardAppearance='dark'
        onChangeText={t => setTags(t)}
        returnKeyType='done'
        autoCorrect={false}
        autoComplete='off'
        spellCheck={false}
        onSubmitEditing={() =>
          title ? ref_text.current?.focus() : ref_title.current?.focus()
        }
        style={[
          {
            backgroundColor: 'black',
            fontFamily: 'spB',
            width: '100%',
            color: '#353835',
            fontSize: 14,
          },
          Platform.OS === 'web'
            ? {
                //web-only style props
                // @ts-ignore
                scrollbarWidth: 'none',
                // @ts-ignore
                outlineStyle: 'none',
              }
            : {},
        ]}
      />
      <Pressable
        style={{
          position: 'relative',
          display: 'flex',
          height: '90%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
        onPress={() => {
          title && ref_text.current?.focus();
        }}
      >
        <TextInput
          value={text}
          keyboardAppearance='dark'
          multiline
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          autoCorrect={false}
          autoComplete='off'
          spellCheck={false}
          ref={ref_text}
          onKeyPress={e => handleTextKeyPress(e)}
          onChange={e => {
            if (!reset) {
              setText(e.nativeEvent.text);
              if (Platform.OS === 'web') {
                // @ts-ignore
                e.nativeEvent.target.style.height = 0;
                // @ts-ignore
                e.nativeEvent.target.style.height = `${e.nativeEvent.target.scrollHeight}px`;
              }
            } else {
              setReset(false);
            }
          }}
          style={[
            {
              fontFamily: 'sp',
              width: '100%',
              maxHeight: '100%',
              position: 'absolute',
              bottom: '50%',
              color: '#B8C2B9',
              fontSize: 18,
              textAlignVertical: 'bottom',
              paddingTop: 0,
              paddingBottom: 0,
            },
            Platform.OS === 'web'
              ? {
                  //web-only style props
                  // @ts-ignore
                  scrollbarWidth: 'none',
                  // @ts-ignore
                  outlineStyle: 'none',
                }
              : {},
          ]}
        />
        <LinearGradient
          colors={['black', 'transparent']}
          locations={[0.5, 1]}
          style={{
            width: '100%',
            height: '50%',
            pointerEvents: 'none',
          }}
        />
      </Pressable>
    </View>
  );
}
