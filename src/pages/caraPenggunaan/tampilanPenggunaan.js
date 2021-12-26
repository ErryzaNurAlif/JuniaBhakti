import React from 'react';
import {Text, View, Image, StyleSheet, Dimensions} from 'react-native';
import { back } from 'react-native/Libraries/Animated/Easing';
import { Gambar } from '../../assets/assets';
import {HeaderPage} from '../../components/components';

const TampilanPenggunaan = () => {
  return (
    <View style={styles.containerPage}>
      <HeaderPage titleHeader="Informasi Detail" />

      <View style={styles.containerContentPage}>
        <Text style={styles.headerContent}>Cara Membuat Akun</Text>
        <Image source={Gambar} style={styles.imagePenggunaan}/>

        <View style={styles.containerContent}>
            <Text style={styles.contentTitle}>Tata cara membuat akun :</Text>
            <Text style={styles.textContent}>1. Klik Daftar</Text>
            <Text style={styles.textContent}>2. Silahkan Anda isi formulir dengan teliti dan lengkap</Text>
            <Text style={styles.textContent}>3. Jika sudah mengisi seluruh formulir</Text>
            <Text style={styles.textContent}>4. Klik daftar akun, Apabila Anda sudah berhasil</Text>
            <Text style={styles.textContentEnter}>membuat akun</Text>
            <Text style={styles.textContent}>5. Silahkan Anda masukkan email dan kata sandi yang</Text>
            <Text style={styles.textContentEnter}>Anda telah buat</Text>
            <Text style={styles.textContent}>6. Jika sudah melewati langkah tersebut Anda akan </Text>
            <Text style={styles.textContentEnter}>diarahkan pada halaman beranda</Text>
        </View>
      </View>
    </View>
  );
};

export default TampilanPenggunaan;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  containerPage: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  containerContentPage: {
    alignItems: 'center',
    marginTop: 30,
  },
  headerContent: {
    color: '#1E1C22',
    fontFamily: 'Shippori-ExtraBold',
    fontSize: 17,
    marginBottom: 20,
  },
  imagePenggunaan: {
    width: windowWidth * 0.58,
    height: windowHeight * 0.28,
  },
  containerContent: {
    marginTop: 25,
    paddingHorizontal: 15,
  },
  contentTitle: {
    textAlign: 'justify',
    fontFamily: 'Shippori-Medium',
    fontSize: 15, 
    color: '#1E1C22',
    marginBottom: 5
  },
  textContent: {
    textAlign: 'justify',
    fontFamily: 'Shippori-Regular',
    fontSize: 13,
    color: '#1E1C22'
  },
  textContentEnter: {
    marginLeft: 13,
    textAlign: 'justify',
    fontFamily: 'Shippori-Regular',
    fontSize: 13,
    color: '#1E1C22'
}
});
