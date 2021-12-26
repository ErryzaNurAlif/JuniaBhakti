import React, {Component} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {
  LogoBeranda,
  IconProfilKlinik,
  IconAlamatKlinik,
  IconJadwalDokter,
  IconDaftarAntrian,
  IconBuktiDaftar,
  IconInfoAntrian,
} from '../../assets/assets';
import {ItemLayanan} from '../../components/components';
import auth from '@react-native-firebase/auth';

export class Beranda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    this.getDataUser();
  }

  async getDataUser() {
    this.setState({isLoading: false});
    const user = await auth().currentUser;
    console.log(`user beranda`, user);
    if (user !== null) {
      this.setState({isLoading: false});
    } else return null;
  }

  render() {
    return (
      <View style={styles.containerBeranda}>
        <View style={styles.imageLogo}>
          <Image source={LogoBeranda} style={styles.logoBeranda} />
        </View>

        <View style={{marginTop: 25}}>
          <Text style={styles.titleWrapper}>Layanan</Text>
          <View>
            <View style={styles.content}>
              <ItemLayanan
                IconLayanan={<IconProfilKlinik />}
                titleLayanan="Profil Klinik"
                onPress={() => this.props.navigation.navigate('ProfilKlinik')}
              />
              <ItemLayanan
                IconLayanan={<IconAlamatKlinik />}
                titleLayanan="Alamat Klinik"
                onPress={() => this.props.navigation.navigate('AlamatKlinik')}
              />
              <ItemLayanan
                IconLayanan={<IconJadwalDokter />}
                titleLayanan="Jadwal Dokter"
                onPress={() => this.props.navigation.navigate('JadwalDokter')}
              />
            </View>

            <View style={styles.content}>
              <ItemLayanan
                IconLayanan={<IconDaftarAntrian />}
                titleLayanan="Daftar Berobat"
                onPress={() =>
                  this.props.navigation.navigate('FormDaftarBerobat')
                }
              />
              <ItemLayanan
                IconLayanan={<IconBuktiDaftar />}
                titleLayanan="Bukti Daftar"
                onPress={() =>
                  this.props.navigation.navigate('BuktiDaftarBerobat')
                }
              />
              <ItemLayanan
                IconLayanan={<IconInfoAntrian />}
                titleLayanan="Info Antrian"
                onPress={() => this.props.navigation.navigate('InfoAntrian')}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default Beranda;

const styles = StyleSheet.create({
  containerBeranda: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  imageLogo: {
    marginTop: 90,
    marginBottom: 50,
    alignItems: 'center',
  },
  logoBeranda: {
    width: 118,
    height: 79,
  },
  titleWrapper: {
    fontFamily: 'Shippori-ExtraBold',
    fontSize: 18,
    color: '#1E1C22',
    marginLeft: 15,
    marginBottom: 10,
  },
  content: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
});
