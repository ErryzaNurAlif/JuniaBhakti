import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import {LogoLaporan} from '../../assets/assets';
import {HeaderPageRiwayat} from '../../components/components';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

export default class RiwayatBerobat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDaftarBerobat: [],
      isAdmin: false,
    };
  }

  async componentDidMount() {
    this.getDataUser();
  }

  async getDataUser() {
    this.setState({isLoading: false});
    const user = auth().currentUser;
    console.log(`user Login`, user.email);
    if (user.email == 'admin@gmail.com') {
      await this.getSeluruhDataPasien();
    } else {
      await this.getRiwayatPasien();
    }
  }

  async getRiwayatPasien() {
    const user = auth().currentUser;
    console.log(`user xx`, user);
    let snapshot = await firestore()
      .collection('riwayat_antrian')
      .where('userId', '==', user.uid)
      .get();
    console.log(`snapshot`, snapshot);
    let listData = snapshot.docs.map(doc => doc.data());
    console.log(`listData`, listData);
    this.setState({listDaftarBerobat: listData});
  }

  async getSeluruhDataPasien() {
    this.setState({isAdmin: true});
    const user = auth().currentUser;
    console.log(`user`, user);
    let snapshot = await firestore()
      .collection('riwayat_antrian')
      .orderBy('createdAt', 'desc')
      .get();
    console.log(`snapshot`, snapshot);

    let listData = snapshot.docs.map(doc => doc.data());
    console.log(`listData`, listData);
    this.setState({listDaftarBerobat: listData});
  }

  render() {
    return (
      <View style={styles.containerPage}>
        <HeaderPageRiwayat titleHeader="Riwayat Berobat" />

        <View style={{alignItems: 'center'}}>
          <Image source={LogoLaporan} style={styles.logoRiwayat} />

          <View style={styles.container}>
            <View style={styles.containerTitle}>
              <View style={{width: 15}}>
                <Text style={styles.title}>No</Text>
              </View>
              <View style={{width: 60}}>
                <Text style={styles.title}>Nama</Text>
              </View>
              <View style={{width: 80}}>
                <Text style={styles.title}>Nama Dokter</Text>
              </View>
              <View style={{width: 60}}>
                <Text style={styles.title}>Tanggal</Text>
              </View>
            </View>

            <FlatList
              data={this.state.listDaftarBerobat}
              renderItem={({item, index}) => (
                <View style={styles.content} key={index}>
                  <View style={styles.riwayat}>
                    <View style={{width: 15}}>
                      <Text style={styles.dataRiwayat}>{index+1}</Text>
                    </View>
                    <View style={{width: 60}}>
                      <Text style={styles.dataRiwayat}>{item.pasien}</Text>
                    </View>
                    <View style={{width: 85}}>
                      <Text style={styles.dataRiwayat}>{item.dokter}</Text>
                    </View>
                    <View style={{width: 60}}>   
                      <Text style={styles.dataRiwayat}>
                        {moment(item.createdAt).format('DD-MM-YYYY')}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerPage: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  logoRiwayat: {
    width: 281,
    height: 64,
    marginVertical: 40,
  },
  container: {
    width: 330,
    height: 420,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
  },
  containerTitle: {
    width: 330,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#B1B7C2',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    paddingHorizontal: 5,
  },
  title: {
    fontFamily: 'Shippori-ExtraBold',
    fontSize: 11,
    color: '#020E8A',
  },
  content: {
    width: 330,
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#707070',
  },
  riwayat: {
    width: 320,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dataRiwayat: {
    fontFamily: 'Shippori-Regular',
    fontSize: 12,
    color: '#000',
  },
});
