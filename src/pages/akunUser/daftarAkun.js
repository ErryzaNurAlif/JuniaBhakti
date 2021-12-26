import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import {IconAddFoto, NullFoto, IconTanggal} from '../../assets/assets';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  HeaderPage,
  FormInputPendaftaran,
  Loading,
} from '../../components/components';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import Modal from 'react-native-modal';
import {showMessage} from 'react-native-flash-message';
import {utils} from '@react-native-firebase/app';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

export default class DaftarAkun extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nomorktp: '',
      nama: '',
      tanggalLahir: '',
      alamat: '',
      nomortelp: '',
      email: '',
      katasandi: '',
      fileInfo: '',
      img: '',
      hasPhoto: true,
      isLoading: false,
      modalDate: false,
      pickingDate: 'inDate',
      errTanggalLahir: null,
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

  imgPicker(picker) {
    let options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
      includeBase64: true,
    };
    if (picker == 'gallery') {
      launchImageLibrary(options, response => {
        console.log(`response`, response);
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          this.setState({
            img: {uri: response.uri},
            fileInfo: response.fileName,
            imgPicker: false,
          });
        }
      });
    }
  }

  imgPickerModal() {
    return (
      <View>
        <Modal
          isVisible={this.state.imgPicker}
          onBackButtonPress={() => this.setState({imgPicker: false})}
          onBackdropPress={() => this.setState({imgPicker: false})}>
          <View style={{backgroundColor: '#020E8A', borderRadius: 10, borderColor: 'white', borderWidth: 0.5}}>
            <TouchableOpacity onPress={() => this.imgPicker('gallery')}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontSize: 16,
                  margin: 20,
                  fontFamily: 'Shippori-Bold',
                }}>
                Pilih dari Gallery
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }

  upload = async id => {
    if (this.state.fileInfo !== '') {
      const reference = storage().ref(`${this.state.fileInfo}`);
      const pathToFile = `${utils.FilePath.TEMP_DIRECTORY}/${this.state.fileInfo}`;
      try {
        await reference.putFile(pathToFile);
        try {
          const url = await storage()
            .ref(`${this.state.fileInfo}`)
            .getDownloadURL();
          this.writeUserDetail(id, url);
        } catch (error) {
          console.log(`error 1`, error);
          this.toast('Ada kesalahan saat upload poto', true);
        }
        setTimeout(() => {
          this.setState({isLoading: false});
        }, 100);
      } catch (error) {
        console.log(`error 2`, error);
        this.toast('Ada kesalahan saat upload poto', true);
      }
    }
  };

  writeUserDetail(id, url) {
    const {alamat, email, nomorktp, nama, nomortelp, tanggalLahir} = this.state;
    firestore()
      .collection('users')
      .add({
        alamat: alamat,
        email: email,
        ktp: nomorktp,
        nama: nama,
        noHp: nomortelp,
        tanggalLahir: tanggalLahir,
        createdAt: new Date(),
        userId: id,
        photoURL: url,
      })
      .then(async () => {
        this.toast('Anda berhasil mendaftar', false);
        await this.props.navigation.navigate('MasukAkun');
      })
      .catch(error => {
        console.log(`error`, error);
        this.toast('Ada kesalahan', true);
        this.setState({isLoading: false});
      });
  }

  regist() {
    try {
      this.setState({isLoading: true});
      auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.katasandi)
        .then(response => {
          this.upload(response.user.uid);
          console.log(`response`, response.user.uid);
        })
        .catch(error => {
          if (error.code === 'auth/weak-password') {
            this.setState({isLoading: false});
            this.toast('Kata sandi lemah, minimal 6 karakter!', true);
          }
          else if (error.code === 'auth/invalid-email') {
            this.setState({isLoading: false});
            this.toast('Alamat email tidak terdaftar!', true);
          }
          else if (error.code === 'auth/wrong-password') {
            this.setState({isLoading: false});
            this.toast('Kata sandi anda salah!', true);
          }
          else if ('auth/email-already-in-use'){
            this.setState({isLoading: false});
            this.toast('Email sudah digunakan!', true);
          }
          console.log(`error tipe`, typeof error);
          console.log(`error`, error);
          this.setState({isLoading: false});
        });
    } catch (error) {
      this.toast(error.code, true);
      this.setState({isLoading: false});
    }
  }

  onChangeText = (nameState, value, err) => {
    this.setState({
      [nameState]: value,
      [err]: null,
    });
  };

  submitValidation() {
    const {nomorktp, nama, tanggalLahir,  alamat, nomortelp, email, katasandi, img} = this.state;
    if (
      nomorktp == '' || nama == '' || tanggalLahir == '' || alamat == '' ||
      nomortelp == '' || email == '' || katasandi == '' || img == ''
    ) {
      if (nomorktp == '') {
        this.setState({errNoKTP: 'Masukkan no KTP'});
      }
      if (nama == '') {
        this.setState({errNama: 'Masukkan nama'});
      }
      if (tanggalLahir == '') {
        this.setState({errTanggalLahir: 'Masukkan tanggal lahir'});
      }
      if (alamat == '') {
        this.setState({errAlamat: 'Masukkan alamat'});
      }
      if (nomortelp == '') {
        this.setState({errNoTelp: 'Masukkan telepon'});
      }
      if (email == '') {
        this.setState({errEmail: 'Masukkan email'});
      }
      if (katasandi == '') {
        this.setState({errKataSandi: 'Masukkan kata sandi'});
      }
      if (img == '') {
        this.toast('Masukkan Foto Anda!', true);
      }
    } else {
      this.regist();
    }
  }

  timePicker() {
    return (
      <View>
        {this.state.modalDate && (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date()}
            mode="date"
            display="default"
            onChange={(event, time) => {
              this.setState({
                tanggalLahir: moment(time).format('DD-MM-YYYY'),
                modalDate: false,
                errTanggalLahir: null,
              });
            }}
          />
        )}
      </View>
    );
  }

  render() {
    const {
      nomorktp,
      nama,
      tanggalLahir,
      alamat,
      nomortelp,
      email,
      katasandi,
      errNoKTP,
      errNama,
      errTanggalLahir,
      errAlamat,
      errNoTelp, 
      errEmail,
      errKataSandi
    } = this.state;
    return (
      <View style={styles.containerPage}>
        <HeaderPage titleHeader="Pendaftaran Akun" />

        <ScrollView
          style={{paddingHorizontal: 20}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.profil}>
            <TouchableOpacity
              style={styles.avatarWrapper}
              onPress={() => this.setState({imgPicker: true})}>
              <Image source={this.state.img == '' ? NullFoto : this.state.img} style={styles.avatar} />
              {this.state.hasPhoto ? (
                <IconAddFoto style={styles.addFoto} />
              ) : null}
            </TouchableOpacity>
          </View>

          <FormInputPendaftaran
            title="Nomor KTP"
            placeholder="Masukkan No KTP"
            keyboardType="number-pad"
            nameState={nomorktp}
            onChangeText={value =>
              this.onChangeText('nomorktp', value, 'errNoKTP')
            }
            errMessage={errNoKTP}
            value={nomorktp}
          />
          <FormInputPendaftaran
            title="Nama"
            placeholder="Masukkan Nama"
            nameState={nama}
            onChangeText={value => this.onChangeText('nama', value, 'errNama')}
            errMessage={errNama}
            value={nama}
          />

          <FormInputPendaftaran
            title="Tanggal Lahir"
            placeholder="Masukan Tanggal Lahir"
            nameState={tanggalLahir}
            editable={false}
            iconDate={<IconTanggal />}
            onPress={() =>
              this.setState({modalDate: true, pickingDate: 'inDate'})
            }
            value={tanggalLahir}
            errMessage={errTanggalLahir}
          />

          <FormInputPendaftaran
            title="Alamat"
            placeholder="Masukkan Alamat"
            nameState={alamat}
            onChangeText={value => this.onChangeText('alamat', value, 'errAlamat')}
            value={alamat}
            errMessage={errAlamat}
          />

          <FormInputPendaftaran
            title="No Telepon"
            placeholder="Masukkan No Telp"
            keyboardType="number-pad"
            nameState={nomortelp}
            onChangeText={value => this.onChangeText('nomortelp', value, 'errNoTelp')}
            value={nomortelp}
            errMessage={errNoTelp}
          />

          <FormInputPendaftaran
            title="Email"
            placeholder="Masukkan Email"
            nameState={email}
            onChangeText={value => this.onChangeText('email', value, 'errEmail')}
            value={email}
            errMessage={errEmail}
          />

          <FormInputPendaftaran
            title="Kata Sandi"
            placeholder="Masukkan Kata Sandi"
            nameState={katasandi}
            onChangeText={value => this.onChangeText('katasandi', value, 'errKataSandi')}
            secureTextEntry
            value={katasandi}
            errMessage={errKataSandi}
          />

          <TouchableOpacity
            style={styles.touchKonfirmasi}
            onPress={() => this.submitValidation()}>
            <Text style={styles.titleTouch}>Daftar Akun</Text>
          </TouchableOpacity>
        </ScrollView>
        {this.timePicker()}
        {this.imgPickerModal()}
        {this.state.isLoading ? <Loading /> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerPage: {
    backgroundColor: '#F7F8FA',
  },
  titlePage: {
    color: '#020E8A',
    fontFamily: 'Shippori-SemiBold',
    fontSize: 16,
    width: '60%',
    marginVertical: 40,
  },
  profil: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarWrapper: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#E9E9E9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  addFoto: {
    position: 'absolute',
    bottom: 5,
    right: 0,
  },
  touchKonfirmasi: {
    padding: 17,
    backgroundColor: '#020E8A',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 90,
  },
  titleTouch: {
    color: 'white',
    fontFamily: 'Shippori-SemiBold',
    fontSize: 18,
    textAlign: 'center',
  },
});
