import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {IconDaftarPasien} from '../../assets/assets';
import {HeaderPage, ItemMenuProfil} from '../../components/components.js';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';

export default class InfoAntrian extends Component {
  constructor(props) {
    super(props);
    this.state = {
      antrianSekarang: '',
      antrianAnda: '',
      statusAntrian: false,
      isAdmin: false
    };
  }
  componentDidMount() {
    this.getDataUser();
    this.getAdmin();
    this.getAntrianSekarang();
  }

  getAntrianSekarang = async () => {
    await database()
      .ref('/antrian/sekarang')
      .on('value', snapshot => {
        this.setState({antrianSekarang: snapshot.val()});
      });
  };

  async getDataUser() {
    const user = auth().currentUser;
    let snapshot = await firestore()
      .collection('antrian')
      .where('userId', '==', user.uid)
      .get();

    let userDetail = (await snapshot).docs.map(doc => doc.data());
    let userData = await userDetail[0];
    this.setState({
      antrianAnda: userData.antrian,
      statusAntrian: userData.isAccepted,
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
      isAdmin: userData.isAdmin
    });
  }

  render() {
    return (
      <View style={styles.containerPage}>
        <HeaderPage titleHeader="Info Antrian" />

        <View style={{alignItems: 'center', marginTop: 80, marginBottom: 40}}>
          <View style={styles.wrapper}>
            <View
              style={{
                paddingHorizontal: 20,
                alignItems: 'center',
                paddingVertical: 45,
              }}>
              <Text style={styles.title}>Antrian Saat Ini</Text>
              <Text style={styles.textContent}>
                {this.state.antrianSekarang}
              </Text>
            </View>
          </View>
        </View>

        <View style={{alignItems: 'center'}}>
          <View style={styles.wrapper}>
            <View
              style={{
                paddingHorizontal: 20,
                alignItems: 'center',
                paddingVertical: 45,
              }}>
              <Text style={styles.title}>Nomor Antrian Anda</Text>
              <Text style={styles.textContent}>
                { !this.state.statusAntrian
                  ? this.state.antrianAnda 
                  : 'Anda tidak dalam antrian'
                }
              </Text>
            </View>
          </View>
        </View>

        {this.state.isAdmin ? 
          <View style={styles.container}>
            <ItemMenuProfil
              iconLeft={<IconDaftarPasien />}
              titleButton="Daftar Periksa Pasien"
              onPress={() =>
                this.props.navigation.navigate('DaftarPasienPeriksa')
              }
            />
          </View>
          : null
        }   
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerPage: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  wrapper: {
    width: 300,
    height: 150,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  title: {
    fontFamily: 'Shippori-Bold',
    fontSize: 18,
    color: '#020E8A',
    marginBottom: 15,
  },
  textContent: {
    fontFamily: 'Shippori-Medium',
    fontSize: 16,
    color: '#1E1C22',
  },
  container: {
    alignItems: 'center',
    marginVertical: 40,
  },
});
