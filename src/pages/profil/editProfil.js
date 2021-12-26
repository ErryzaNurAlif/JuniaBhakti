import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import {
  IconEmail,
  IconKataSandi,
  IconNamaPengguna,
  IconRemoveFoto,
  IconAlamat,
  IconTelepon,
} from '../../assets/icon/icon';
import Modal from 'react-native-modal';
import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import {showMessage} from 'react-native-flash-message';
import {FormInputAkun, HeaderPage, Loading} from '../../components/components';
import {launchImageLibrary} from 'react-native-image-picker';
import {CommonActions} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default class EditProfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isId: '',
      userName: '',
      notelp: '',
      alamat: '',
      email: '',
      password: '',
      isPasswordOk: false,
      img: '',
      imgUrl: '',
      fileInfo: '',
      imgPicker: false,
      passConfirm: false,
      isLoading: false,
    };
  }

  backAction = () => {
    this.props.navigation.navigate('Profil', {refresh: true});
    return true;
  };

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
    this.getDataUser();
    this.getdDataId();
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  async getdDataId() {
    const user = auth().currentUser;
    const id = user.uid;
    await firestore()
      .collection('users')
      .where('userId', '==', id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          console.log({
            isId: documentSnapshot.id,
            data: documentSnapshot.data(),
          });
          this.setState({
            isId: documentSnapshot.id,
          });
        });
      });
  }

  async getDataUser() {
    const user = auth().currentUser;
    const id = user.uid;
    let snapshot = await firestore()
      .collection('users')
      .where('userId', '==', id)
      .get();
    console.log(`snapshot`, snapshot);

    let userDetail = snapshot.docs.map(doc => doc.data());
    let userData = userDetail[0];
    console.log(`userDatail`, userDetail[0]);
    this.setState({
      isId: id,
      email: userData.email,
      img: userData.photoURL,
      alamat: userData.alamat,
      notelp: userData.noHp,
      userName: userData.nama,
    });
  }

  onChangeText = (nameState, value) => {
    this.setState({
      [nameState]: value,
    });
  };

  toast = (message, error) => {
    showMessage({
      message: message,
      type: 'default',
      backgroundColor: error ? '#E06379' : '#42AD62',
      fontSize: 13,
      color: 'white',
    });
  };

  AlertWidget = (judul, pesan) =>
    Alert.alert(judul, pesan, [
      {text: 'Paham', onPress: () => this.setState({passConfirm: true})},
    ]);

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
            img: response.uri,
            fileInfo: response.fileName,
            imgPicker: false,
          });
        }
      });
    }
  }

  editTelp = () => {
    if (this.state.notelp !== '') {
      firestore()
        .collection('users')
        .doc(this.state.isId)
        .update({
          noHp: this.state.notelp,
        })
        .then(() => {
          console.log(this.state.notelp);
          this.setState({isLoading: false});
        })
        .catch(error => {
          this.toast('Format nomor telepon anda salah', true);
          console.log(`error 1`, error);
          this.setState({isLoading: false});
        });
    } else {
      console.log(`error 2`, error);
      this.setState({isLoading: false});
    }
  };

  editAlamat = () => {
    if (this.state.alamat !== '') {
      firestore()
        .collection('users')
        .doc(this.state.isId)
        .update({
          alamat: this.state.alamat,
        })
        .then(() => {
          console.log(this.state.alamat);
          this.setState({isLoading: false});
        })
        .catch(error => {
          this.toast('Format alamat anda salah', true);
          console.log(`error`, error);
          this.setState({isLoading: false});
        });
    } else {
      console.log(`error 2`);
      this.setState({isLoading: false});
    }
  };

  submitEdit = async () => {
    const {userName, password, isLoading} = this.state;
    var user = auth().currentUser;
    console.log(`this.state`, this.state);
    await user
      .updateProfile({
        displayName: userName,
      })
      .then(async () => {
        if (password !== '') {
          this.editPassword();
          this.props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: 'MasukAkun',
                },
              ],
            }),
          );
        } else {
          this.toast('Anda berhasil merubah data', false);
          !isLoading &&
            (await this.props.navigation.navigate('Profil', {refresh: true}));
        }
      })
      .catch(error => {
        console.log(`error`, error);
        this.setState({isLoading: false});
      });
  };

  editPassword = async () => {
    if (this.state.password !== '') {
      this.setState({isLoading: true});
      var user = auth().currentUser;
      await user
        .updatePassword(this.state.password)
        .then(async result => {
          console.log(`result change pass`, result);
          this.toast('Anda berhasil merubah kata sandi', false);
          this.setState({isPasswordOk: true, isLoading: false});
        })
        .catch(error => {
          this.toast('Format kata sandi anda tidak benar', true);
          console.log(`error password`, error);
          this.setState({isLoading: false});
        });
    }
  };

  submitUpload = async url => {
    firestore()
      .collection('users')
      .doc(this.state.isId)
      .update({
        photoURL: url,
      })
      .then(async () => {
        if (password !== '') {
          await this.props.navigation.replace('MasukAkun');
        } else {
          !isLoading &&
            (await this.props.navigation.navigate('Profil', {refresh: true}));
        }
      })
      .catch(error => {
        console.log(`error`, error);
      });
  };

  upload = async () => {
    if (this.state.fileInfo !== '') {
      this.setState({isLoading: true});
      const reference = storage().ref(`${this.state.fileInfo}`);
      const pathToFile = `${utils.FilePath.TEMP_DIRECTORY}/${this.state.fileInfo}`;
      try {
        await reference.putFile(pathToFile);
        const url = await storage()
          .ref(`${this.state.fileInfo}`)
          .getDownloadURL();
        this.submitUpload(url);
        this.setState({imgUrl: url});
        setTimeout(() => {
          this.setState({isLoading: false});
        }, 100);
      } catch (error) {
        this.toast('Ada kesalahan saat upload foto', true);
      }
    }
  };

  validateEdit = async () => {
    setTimeout(async () => {
      await this.submitEdit();
    }, 100);
    setTimeout(async () => {
      await this.upload();
    }, 100);
    setTimeout(async () => {
      this.editTelp();
    }, 100);
    setTimeout(async () => {
      this.editAlamat();
    }, 100);
  };

  render() {
    return (
      <View style={styles.containerPage}>
        <HeaderPage titleHeader="Edit Profil"/>
        <ScrollView>
          <View style={styles.containerFormInput}>
            <TouchableOpacity
              style={styles.avatarWrapper}
              onPress={() => this.setState({imgPicker: true})}>
              <Image
                source={{uri: this.state.img}}
                style={styles.imageUser}
              />
              <View style={{position: 'absolute', bottom: 5, right: 0}}>
                <IconRemoveFoto />
              </View>
            </TouchableOpacity>

            <FormInputAkun
              placeholder="Nama Pengguna"
              nameState="userName"
              IconInput={<IconNamaPengguna />}
              onChangeText={value => this.onChangeText('userName', value)}
              value={this.state.userName}
              editable={false}
            />
            <FormInputAkun
              placeholder="Nomor Telepon"
              nameState="notelp"
              keyboardType="number-pad"
              IconInput={<IconTelepon />}
              onChangeText={value => this.onChangeText('notelp', value)}
              value={this.state.notelp}
            />
            <FormInputAkun
              placeholder="Alamat"
              nameState="alamat"
              IconInput={<IconAlamat />}
              onChangeText={value => this.onChangeText('alamat', value)}
              value={this.state.alamat}
            />
            <FormInputAkun
              placeholder="Alamat Email"
              nameState="email"
              IconInput={<IconEmail />}
              onChangeText={value => this.onChangeText('email', value)}
              value={this.state.email}
              editable={false}
            />
            <FormInputAkun
              placeholder="Ganti Password"
              nameState="password"
              IconInput={<IconKataSandi />}
              onChangeText={value => this.onChangeText('password', value)}
              value={this.state.password}
              secureTextEntry
              onPressIn={() =>
                this.AlertWidget(
                  'Perhatian',
                  'Setelah mengganti kata sandi Anda akan di log out dan di arahkan pada halaman masuk akun',
                )
              }
            />

            <TouchableOpacity
              style={styles.touchMasuk}
              onPress={() => this.validateEdit()}>
              <Text style={styles.titleTouchMasuk}>Ubah Profil</Text>
            </TouchableOpacity>

            {this.imgPickerModal()}
          </View>
        </ScrollView>
        {this.state.isLoading ? <Loading /> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerPage: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    marginBottom: 30,
  },
  containerFormInput: {
    marginTop: 20,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchMasuk: {
    backgroundColor: '#020E8A',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginTop: 5,
  },
  titleTouchMasuk: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Shippori-Bold',
    fontSize: 16,
  },
  avatarWrapper: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#E9E9E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:20
  },
  imageUser: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
});
