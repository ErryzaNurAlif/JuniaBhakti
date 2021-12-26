import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {BackgroundRounded, IconBackRounded, IconEmail, IconKataSandi} from '../../assets/assets';
import {showMessage} from 'react-native-flash-message';
import {FormInputAkun, Loading} from '../../components/components';
import auth from '@react-native-firebase/auth';

export default class MasukAkun extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      katasandi: '',
      isLoading: false,
      errEmail: true,
      errKataSandi: null,
    };
  }

  toast = (message, error) => {
    showMessage({
      message: message,
      type: 'default',
      backgroundColor: error ? '#E06379' : '#42AD62',
      fontSize: 13,
      color: 'white',
    });
  };

  onChangeText = (nameState, value, err) => {
    this.setState({
      [nameState]: value,
      [err]: null,
    });
  };

  submitValidation() {
    const {email, katasandi} = this.state;
    if (email == '' || katasandi == '') {
      if (email == '') {
        this.setState({errEmail: 'Masukkan email'});
      }
      if (katasandi == '') {
        this.setState({errKataSandi: 'Masukkan kata sandi'});
      }
    } else {
      this.login();
    }
  }

  async login() {
    this.setState({isLoading: true});
    try {
      await auth()
        .signInWithEmailAndPassword(this.state.email, this.state.katasandi)
        .then(async () => {
          await this.props.navigation.replace('MainApp')
        })
        .catch(error => {
          if (error.code === 'auth/user-not-found') {
            this.toast('Email anda tidak terdaftar!', true);
          }
          else if (error.code === 'auth/invalid-email') {
            this.toast('Email anda salah!', true);
          }
          else if (error.code === 'auth/weak-password') {
            this.toast('Kata sandi lemah, minimal 6 karakter', true);
          }
          else if (error.code === 'auth/wrong-password') {
            this.toast('Kata sandi anda salah!', true);
          }
          console.log(`error tipe`, typeof error);
          console.log(`error`, error);
          this.setState({isLoading: false});
        });
    } catch (error) {
      console.log(`error`, error);
      this.toast(error.code, true);
      this.setState({isLoading: false});
    }
  }

  render() {
    const {email, katasandi, errEmail, errKataSandi} = this.state;
    return (
      <View style={styles.containerPage}>
        <View style={styles.containerHeader}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <IconBackRounded/>
          </TouchableOpacity>

          <BackgroundRounded />
        </View>

        <View style={styles.containerTitle}>
          <Text style={styles.title1}>Selamat Datang</Text>
          <Text style={styles.title1}>Kembali</Text>
        </View>

        <View style={styles.containerContent}>
          <Text style={styles.titleContent}>Gabung</Text>

          <FormInputAkun
            placeholder="Email"
            nameState={email}
            IconInput={<IconEmail />}
            onChangeText={value =>
              this.onChangeText('email', value, 'errEmail')
            }
            errMessage={errEmail}
            value={email}
          />

          <FormInputAkun
            placeholder="Kata Sandi"
            nameState={katasandi}
            IconInput={<IconKataSandi />}
            onChangeText={value =>
              this.onChangeText('katasandi', value, 'errKataSandi')
            }
            secureTextEntry
            errMessage={errKataSandi}
            value={katasandi}
          />

          <TouchableOpacity
            style={styles.touchMasuk}
            onPress={() => this.submitValidation()}>
            <Text style={styles.titleTouchMasuk}>Masuk</Text>
          </TouchableOpacity>

          <View style={styles.containerTitleBottom}>
            <Text style={styles.title2}>Tidak punya akun?</Text>

            <TouchableOpacity
              style={styles.touchLinkDaftar}
              onPress={() => this.props.navigation.navigate('DaftarAkun')}>
              <Text style={styles.title3}>Daftar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {this.state.isLoading ? <Loading /> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerPage: {
    backgroundColor: '#020E8A',
    flex: 1,
  },
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20
  },
  containerTitle: {
    marginTop: 35,
    marginLeft: 20,
    marginBottom: 60,
  },
  title1: {
    fontFamily: 'Shippori-ExtraBold',
    color: 'white',
    fontSize: 23,
  },
  containerContent: {
    width: '100%',
    bottom: 0,
    position: 'absolute',
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 30,
    padding: 35,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: 60,
  },
  titleContent: {
    color: '#1E1C22',
    fontFamily: 'Shippori-Bold',
    fontSize: 18,
    marginBottom: 35,
  },
  containerInputAkun: {
    backgroundColor: '#EBEEF2',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 30,
  },
  inputAkun: {
    width: '89.5%',
    marginLeft: 10,
    fontFamily: 'Shippori-Regular',
    fontSize: 13,
    color: '#6B6B6B',
  },
  touchMasuk: {
    width: '100%',
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
  containerTitleBottom: {
    flexDirection: 'row',
    marginTop: 15,
  },
  title2: {
    color: '#6B6B6B',
    fontFamily: 'Shippori-Bold',
    fontSize: 13,
    marginRight: 5,
  },
  title3: {
    color: '#020E8A',
    fontFamily: 'Shippori-Bold',
    fontSize: 13,
    marginRight: 5,
  },
});
