import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import {LogoLaporan} from '../../assets/assets';
import {HeaderPage} from '../../components/components';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

export default class LaporanDataDokter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDataDokter: [],
    };
  }

  async componentDidMount() {
    this.getDataDokter();
  }

  async getDataDokter() {
    const user = auth().currentUser;
    console.log(`user`, user);
    let snapshot = await firestore()
      .collection('doctor')
      .orderBy('createdAt', 'desc')
      .get();
    console.log(`snapshot`, snapshot);

    let listData = (snapshot).docs.map(doc => doc.data());
    console.log(`listData`, listData);
    this.setState({listDataDokter: listData});
  }

  render() {
    return (
      <View style={styles.containerPage}>
        <HeaderPage titleHeader="Laporan Data Dokter" />

        <View style={{alignItems: 'center'}}>
          <Image source={LogoLaporan} style={styles.logoRiwayat} />

          <View style={styles.container}>
            <View style={styles.containerTitle}>
              <View style={{width: 15}}>
                <Text style={styles.title}>No</Text>
              </View>
              <View style={{width: 85}}>
                <Text style={styles.title}>Nama Dokter</Text>
              </View>
              <View style={{width: 85}}>
                <Text style={styles.title}>Hari Praktek</Text>
              </View>
              <View style={{width: 70}}>
                <Text style={styles.title}>Jam Praktek</Text>
              </View>
            </View>

            <FlatList
              data={this.state.listDataDokter}
              renderItem={({item, index}) => (
                <View style={styles.content} key={index}>
                  <View style={styles.riwayat}>
                    <View style={{width: 15, paddingLeft:7}}>
                      <Text style={styles.dataRiwayat}>{index+1}</Text>
                    </View>
                    <View style={{width: 85}}>
                      <Text style={styles.dataRiwayat}>{item.namaDokter}</Text>
                    </View>
                    <View style={{width: 85}}>
                      <Text style={styles.dataRiwayat}>{item.day}</Text>
                    </View>
                    <View style={{width: 60}}>
                      <Text style={styles.dataRiwayat}>
                        {item.inTime}-{item.outTime}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        </View>

        <View style={styles.containerPenutup}>
          <View>
            <Text style={styles.textTgl}>Depok, {moment().format('LL')}</Text>
            <Text style={styles.textJabatan}>(Bag. Administrasi)</Text>
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
    height: 370,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
  },
  containerTitle: {
    width: 330,
    height: 30,
    backgroundColor: '#B1B7C2',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  title: {
    fontFamily: 'Shippori-ExtraBold',
    fontSize: 11,
    color: '#020E8A',
  },
  content: {
    width: 330,
    borderBottomWidth: 1,
    borderBottomColor: '#707070',
  },
  containerPenutup: {
    alignItems: 'flex-end',
    marginRight: 15,
    marginTop: 20,
  },
  textTgl: {
    marginBottom: 50,
    fontSize: 11,
    fontFamily: 'Shippori-Medium',
    color: '#1E1C22',
  },
  textJabatan: {
    fontSize: 11,
    fontFamily: 'Shippori-Medium',
    color: '#1E1C22',
  },
  content: {
    width: 330,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
