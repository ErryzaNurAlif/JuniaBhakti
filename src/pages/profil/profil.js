import React, {Component} from 'react';
import Modal from 'react-native-modal';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {IconEdit, IconKeluar, IconLaporanProfil} from '../../assets/assets';
import {HeaderPage, ItemMenuProfil, Logout} from '../../components/components';
import {widthByScreen} from '../../utils/dimensions';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import SoundPlayer from 'react-native-sound-player';

export default class Profil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nama: '',
      email: '',
      img: '',
      imgModal: false,
      isLoading: false,
      isAdmin: false,
      passConfirm: false,
      refreshing: false,
    };
  }

  componentDidMount() {
    this.getDataUser();
    this.getAdmin();
  }

  async getDataUser() {
    const user = auth().currentUser;
    console.log(`user`, user);
    let snapshot = await firestore()
      .collection('users')
      .where('userId', '==', user.uid)
      .get();
    console.log(`snapshot`, snapshot);

    let userDetail = (await snapshot).docs.map(doc => doc.data());
    let userData = userDetail[0];
    console.log(`userDetail`, userDetail[0]);
    this.setState({
      email: userData.email,
      img: userData.photoURL,
      nama: userData.nama,
    });
  }

  async getAdmin() {
    const user = auth().currentUser;
    let snapshot = await firestore()
      .collection('users')
      .where('userId', '==', user.uid)
      .get();

    let userDetail = (await snapshot).docs.map(doc => doc.data());
    let userData = await userDetail[0];
    this.setState({
      isAdmin: userData.isAdmin,
    });
  }

  logout() {
    this.setState({isLoading: true});
    SoundPlayer.playSoundFile('terimakasih', 'mp3');
    setTimeout(() => {
      auth()
        .signOut()
        .then(() => {
          this.props.navigation.replace('MasukAkun');
          this.setState({isLoading: false});
        });
    }, 3050);
  }

  AlertWidget = (judul, pesan) =>
    Alert.alert(judul, pesan, [
      {text: 'Keluar', onPress: () => this.logout()},
      {text: 'Batal', onPress: () => this.setState({passConfirm: true})},
    ]);

  imgModal() {
    return (
      <View>
        <Modal
          isVisible={this.state.imgModal}
          onBackButtonPress={() => this.setState({imgModal: false})}
          onBackdropPress={() => this.setState({imgPicker: false})}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: 'white',
            }}>
            <View style={{borderColor: 'white'}}>
              <TouchableOpacity
                onPress={() => this.setState({imgModal: false})}>
                <Text
                  style={{color: 'white', fontSize: 29, textAlign: 'right'}}>
                  x
                </Text>
              </TouchableOpacity>
              <Image
                source={{uri: this.state.img}}
                style={{width: widthByScreen(80), height: widthByScreen(80)}}
                resizeMode="contain"
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  getParam = () => {
    if (this.props.route.params?.refresh) {
      this.getDataUser();
      this.getAdmin();
    } else {
      return null;
    }
  };

  render() {
    return (
      <View style={styles.containerPage}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.getDataUser();
                this.getAdmin();
              }}
            />
          }>
          <HeaderPage titleHeader="Profil" />

          <View style={styles.containerContent}>
            <TouchableOpacity onPress={() => this.setState({imgModal: true})}>
              <Image source={{uri: this.state.img}} style={styles.imageUser} />
            </TouchableOpacity>

            <View style={styles.containerInfoUser}>
              <Text style={styles.nameUser}>{this.state.nama}</Text>
              <Text style={styles.emailUser}>{this.state.email}</Text>
            </View>

            <ItemMenuProfil
              iconLeft={<IconEdit />}
              titleButton="Ubah Profil"
              onPress={() => this.props.navigation.navigate('EditProfil')}
            />

            {this.state.isAdmin ? (
              <ItemMenuProfil
                iconLeft={<IconLaporanProfil />}
                titleButton="Laporan"
                onPress={() => this.props.navigation.navigate('Laporan')}
              />
            ) : null}

            <ItemMenuProfil
              iconLeft={<IconKeluar />}
              titleButton="Keluar"
              onPress={() => this.AlertWidget('Keluar dari Aplikasi')}
            />
          </View>
        </ScrollView>
        {this.imgModal()}
        {this.state.isLoading ? <Logout /> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerPage: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  imageUser: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  containerContent: {
    alignItems: 'center',
    marginTop: 100,
  },
  containerInfoUser: {
    width: 300,
    alignItems: 'center',
    paddingVertical: 20,
  },
  nameUser: {
    color: '#1E1C22',
    fontFamily: 'Shippori-ExtraBold',
    fontSize: 18,
  },
  emailUser: {
    color: '#6F6F6F',
    fontFamily: 'Shippori-Medium',
    fontSize: 13,
    marginTop: 5,
  },
});
