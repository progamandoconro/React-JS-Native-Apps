/**
TODO: separate kanji elements. Create Anki logic. (maybe get pictures and sounds).
 */

import React, {useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Alert,
  Button,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
const kanji = require('./storage/kanjiapi_full.json');

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const [k, setK] = useState();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const debugerKanjis = () => {
    var el = 0;
    for (var i in kanji.kanjis) {
      if (
        i &&
        kanji.kanjis[i]['meanings'].length > 0 &&
        kanji.kanjis[i]['kun_readings'].length > 0
      ) {
        console.log(
          i,
          kanji.kanjis[i]['meanings'],
          kanji.kanjis[i]['kun_readings'],
          (el = el + 1),
        );
      }
    }
  };
  const kanjiList = [];
  for (var i in kanji.kanjis) {
    if (
      i &&
      kanji.kanjis[i].meanings.length > 0 &&
      kanji.kanjis[i].kun_readings.length > 0
    ) {
      kanjiList.push([
        String(i),
        ' / ',
        String(kanji.kanjis[i].meanings),
        ' / ',
        String(kanji.kanjis[i].kun_readings),
      ]);
    }
  }

  const randomKanji = () => {
    const randomIndex = Math.floor(Math.random() * kanjiList.length) + 1;
    setK(kanjiList[randomIndex]);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Button title="Click" onPress={randomKanji} />

          <Text style={{fontSize: 55}}>{k}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
