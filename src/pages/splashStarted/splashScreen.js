import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { LogoKlinik } from '../../assets/assets';
import auth from '@react-native-firebase/auth';
import SoundPlayer from 'react-native-sound-player';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    SoundPlayer.playSoundFile('selamatdatang', 'mp3');
    const unsubcribe = auth().onAuthStateChanged(user => {
      setTimeout(() => {
        if (user) {
          navigation.replace('MainApp');
        } else {
          navigation.replace('GetStarted');
        }
      }, 3050);
    });

      return () => unsubcribe();
  }, [navigation]);

  return (
    <View style={styles.containerSplash}>
      <Image source={LogoKlinik} style={styles.imageLogoKlnik}/>
    </View>
  );
};

export default SplashScreen;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  containerSplash: {
    flex: 1,
    backgroundColor: '#020E8A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageLogoKlnik:{
    width: windowWidth * 0.34,
    height: windowHeight * 0.12,
  }
});
