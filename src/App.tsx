import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  ScrollView,
  Text,
  Image,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import {escapeRegExp} from 'lodash';

const App = () => {
  const [string, updateString] = useState('');
  const [validation, updateValidation] = useState('');

  useEffect(() => {
    updateValidation('');

    const matchBracket = (pattern: RegExp) => {
      const regex = escapeRegExp(string).match(pattern);
      return regex !== null ? regex.length : 0;
    };

    const brackets = {
      open: [matchBracket(/\(+/g), matchBracket(/\[+/g), matchBracket(/{+/g)],
      close: [matchBracket(/\)+/g), matchBracket(/\]+/g), matchBracket(/}+/g)],
    };

    (brackets.open[0] > brackets.close[0] ||
      brackets.open[1] > brackets.close[1] ||
      brackets.open[2] > brackets.close[2]) &&
      updateValidation('opening');

    (brackets.open[0] < brackets.close[0] ||
      brackets.open[1] < brackets.close[1] ||
      brackets.open[2] < brackets.close[2]) &&
      updateValidation('closing');
  }, [string]);

  return (
    <SafeAreaView style={styles.container} accessible>
      <ScrollView keyboardDismissMode="interactive">
        <Image source={require('./assets/icon.png')} style={styles.icon} />
        <Text style={styles.title}>BRACKETS CHECKER</Text>
        <Text style={styles.about}>Made with love by @lefrankleal</Text>
        <KeyboardAvoidingView>
          <TextInput
            onChangeText={updateString}
            multiline
            placeholder="Please insert your text here to test it!"
            placeholderTextColor={'#AAA'}
            style={styles.input}
            numberOfLines={5}
          />
        </KeyboardAvoidingView>
        {string.length > 0 ? (
          <Text style={styles.explanation}>
            Your string
            {validation.length > 0
              ? ' has not equilibrated brackets'
              : ' has equilibrated brackets'}
          </Text>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },
  icon: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginVertical: 20,
  },
  title: {
    alignSelf: 'center',
  },
  about: {
    alignSelf: 'center',
    marginBottom: 25,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    color: '#000',
    textAlignVertical: 'top',
    maxHeight: Dimensions.get('screen').height * 0.5,
  },
  explanation: {
    alignSelf: 'center',
  },
});

export default App;
