import { React, useState } from 'react';
import type {PropsWithChildren} from 'react';
import Sound from 'react-native-sound';
import BackgroundTimer from 'react-native-background-timer';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
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
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [sound, setSound] = useState();
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [volume, setVolume] = useState();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  function play() {
    Sound.setCategory('Playback');
    var eight08 = new Sound('eight08.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      console.log('duration=' + eight08.getDuration());
      console.log(BackgroundTimer);
      if (verifyVolume()) {
        eight08.setVolume(Number.parseFloat(volume));
      }
      eight08.play((success) => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed');
        }
      });

    });

  }

  function isAlarmTime() {
    const date = new Date();
    return (date.getHours() == hours
      && date.getMinutes() == minutes);
  }

  function setAlarm3() {
    console.log("Hours=" + hours + ", Minutes="
      + minutes + ", verifyTime()=" + verifyTime());
    if (verifyTime()) {
      const date1 = new Date();
      date1.setHours(hours);
      date1.setMinutes(minutes);
      date1.setSeconds(0);
      const date2 = new Date();
      const dateDiff = date1 - date2;
      const dateDiff2 = 86400000 + dateDiff;
      console.log("date1=" + date1 + ", date2=" + date2 + ", date1 - date2=" + dateDiff);
      console.log("verifyVolume()=" + verifyVolume());
      dateDiff > 0 ? setAlarm4(dateDiff) : setAlarm4(dateDiff2);
    }
    function setAlarm4(dateDiff0) {
      BackgroundTimer.setTimeout(() => play(), dateDiff0);
      const hour = 1000 * 3600;
      const minute = 1000 * 60;
      console.log("Alarm will ring in " + dateDiff0 / (dateDiff0 > hour ? hour
        : dateDiff0 > minute ? minute : 1000)
      + (dateDiff0 > hour ? " hours." : dateDiff0 > minute ? " minutes." : " seconds."));
    }
  }
  function verifyTime() {
    return hours >= 0 && hours <= 24 && minutes >= 0 && minutes <= 60
  }
  function verifyVolume() {
    const volumeNumber = Number.parseFloat(volume);
    return volumeNumber != NaN && volumeNumber >= 0 && volumeNumber <= 1;
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Button title="Play" onPress={play} />
          <Text>Hours:</Text>
          <TextInput onChangeText={newText => setHours(newText)} />
          <Text>Minutes:</Text>
          <TextInput onChangeText={newText => setMinutes(newText)} />
          <Text>Volume:</Text>
          <TextInput onChangeText={newText => setVolume(newText)} />
          <Button title="Set Alarm1" onPress={setAlarm3} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}



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
