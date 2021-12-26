import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Background, LogoKlinik } from '../../assets/assets';


const GetStarted = ({navigation}) => {
  return(
    <View style={styles.containerPage}>
        <View style={styles.container}>
            <View style={styles.backgroundPage}>
              <Image source={Background} style={styles.imageBackground}/>
              
              <View style={styles.backgroundLogo}>
                <Image source={LogoKlinik} style={styles.imageLogoKlnik}/>
              </View>

              <View style={styles.tittleContent}>
                <Text style={styles.textTitleContent}>Aplikasi Pendaftaran Pasien</Text>
                <Text style={styles.textTitleContent}>Pada Klinik Junia Bhakti</Text>
              </View>
            </View>
          
            <View style={styles.buttom}>
              <TouchableOpacity
                style={styles.touchMasuk}
                onPress={() => navigation.navigate('MasukAkun')}
              >
              <Text style={styles.titleTouchMasuk}>Masuk</Text>
              </TouchableOpacity>
              <Text style={styles.textAtau}>Atau</Text>
              <TouchableOpacity
                style={styles.touchPenggunaan}
                onPress={() => navigation.navigate('TampilanPenggunaan')}
              >
              <Text style={styles.titleTouchPenggunaan}>Cara Penggunaan</Text>
              </TouchableOpacity>
            </View>
        </View>
    </View>
  );
};

export default GetStarted;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  containerPage: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  backgroundPage:{
    alignItems: 'center'
  },
  imageBackground: {
    width: windowWidth * 1,
    height: windowHeight * 0.5,
  },
  imageLogoKlnik:{
    width: windowWidth * 0.34,
    height: windowHeight * 0.12,
  },
  backgroundLogo:{
    position: 'absolute',
    top: 70
  },
  tittleContent: {
    alignItems: 'center',
    position: 'absolute',
    top: 185
  },
  textTitleContent: {
    fontFamily: 'Shippori-ExtraBold',
    fontSize: 16,
    color: 'white'
  },
  buttom: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 80
  },
  touchMasuk: {
    width: '100%',
    height: 50,
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: '#020E8A',
  },
  titleTouchMasuk: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Shippori-Bold',
    fontSize: 16,
  },
  textAtau: {
    fontFamily: 'Shippori-Medium',
    fontSize: 14, 
    marginVertical: 10
  },
  touchPenggunaan: {
    width: '100%',
    height: 50,
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#020E8A'
  },
  titleTouchPenggunaan: {
    color: '#020E8A',
    textAlign: 'center',
    fontFamily: 'Shippori-Bold',
    fontSize: 16,
  },
});
