import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import {HeaderPage, ItemMenuProfil} from '../../components/components';
import {IconDokter} from '../../assets/assets';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default class JadwalDokter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctor: [],
      isLoading: false,
      isAdmin: false
    };
  }

  async componentDidMount() {
    this.getDoctorList();
    this.getAdmin();
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

  async getDoctorList() {
    this.setState({isLoading: true});
    //basic get data
    let snapshot = await firestore().collection('doctor').orderBy('createdAt','desc').get();
    let listData = (await snapshot).docs.map(doc => doc.data());
    
    await this.setState({listDoctor: listData, isLoading: false});
  }

  cardDoctor = ({item, index}) => (
    <View style={styles.wrapper} key={index}>
      <View
        style={{
          borderRadius: 35,
          width: 70,
          height: 70,
          marginBottom: 30,
          alignItems: 'center'
        }}>
        <Image source={{uri: item.foto}} style={styles.avatar} />
      </View>

      <Text style={styles.namaDokter}>{item.namaDokter}</Text>

      <View style={styles.wrapperContent}>
        <Text style={styles.titleContent}>Hari</Text>
        <Text style={styles.titleContent}>Jam Pelayanan</Text>
      </View>
      <View style={styles.wrapperContent}>
        <Text style={styles.textContent}>{item.day}</Text>
        <Text style={styles.textContent}>
          {item.inTime} - {item.outTime}
        </Text>
      </View>
    </View>
  );

  renderEmpty = () => {
    return (
      <View>
        <Text>Belum Ada data, silahkan tambah data dulu</Text>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.containerPage}>
        <HeaderPage titleHeader="Jadwal Dokter" />
        <View style={{flex: 1, alignItems: 'center', marginVertical: 20}}>
          <FlatList
            data={this.state.listDoctor}
            renderItem={this.cardDoctor}
            onRefresh={() => this.getDoctorList()} 
            refreshing={this.state.isLoading} 
            ListEmptyComponent={this.renderEmpty}
          />
          
          {this.state.isAdmin ? 
            <View style={styles.container}>
              <ItemMenuProfil
                iconLeft={<IconDokter />}
                titleButton="Input Dokter"
                onPress={() => this.props.navigation.navigate('FormJadwalDokter')}
              />
            </View> 
            : null 
          }
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
  container: {
    alignItems: 'center',
    // marginVertical: 40,
  },
  wrapper: {
    width: 300,
    height: 200,
    backgroundColor: '#EBEEF2',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  namaDokter: {
    fontFamily: 'Shippori-ExtraBold',
    fontSize: 15,
    color: '#1E1C22',
    marginBottom: 15,
  },
  wrapperContent: {
    width: 230,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleContent: {
    fontFamily: 'Shippori-Bold',
    fontSize: 12,
    color: '#1E1C22',
  },
  textContent: {
    fontFamily: 'Shippori-Medium',
    fontSize: 12,
    color: '#1E1C22',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
});
