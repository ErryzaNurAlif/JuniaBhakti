import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {IconCard, IconCeklis} from '../../assets/assets';
import {HeaderPage, Loading} from '../../components/components';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import database from '@react-native-firebase/database';
import {showMessage} from 'react-native-flash-message';

export default class DaftarPasienPeriksa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listAntrian: [],
      isLoading: false,
    };
  }
  componentDidMount() {
    this.getDataAntrian();
    this.updateAntrian();
  }

  updateAntrian = async params => {
    this.setState({isLoading: false});
    await database().ref('/antrian').update({sekarang: params});
  };

  async getDataAntrian() {
    let array = [];
    this.setState({isLoading: false});

    await firestore()
      .collection('antrian')
      .where('isAccepted', '==', false)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          array.push({id: documentSnapshot.id, data: documentSnapshot.data()});
        });
      })
      .catch(error => console.log(`error`, error));

    array.sort(function (a, b) {
      return a.data.antrian - b.data.antrian;
    });

    this.setState({
      listAntrian: array,
    });

    let nomer = array[0].data.antrian;
    await this.updateAntrian(nomer);
  }

  checkList = id => {
    this.setState({isLoading: true});
    firestore()
      .collection('antrian')
      .doc(id)
      .update({
        isAccepted: true,
      })
      .then(() => {
        this.getDataAntrian();
        this.toast('Pasien telah diperiksa!', false);
      })
      .catch(error => {
        console.log(`error update`, error);
        this.toast('Ada Kesalahan', true);
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

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#F7F8FA'}}>
        <HeaderPage titleHeader="Daftar Pasien Periksa" />
        <View style={styles.containerCard}>
          <FlatList
            data={this.state.listAntrian}
            renderItem={({item, index}) => (
              <View style={styles.containerItemCard}>
                <View style={styles.containerItemText}>

                  <IconCard />

                  <View>
                    <Text style={styles.title}>No. Antrian</Text>
                    <Text style={styles.title}>Nama dokter</Text>
                    <Text style={styles.title}>Nama pasien</Text>
                    <Text style={styles.title}>Tangal Periksa</Text>
                  </View>

                  <View key={index}>
                    <Text style={styles.title}> : {item.data.antrian}</Text>
                    <Text style={styles.title}> : {item.data.dokter}</Text>
                    <Text style={styles.title}> : {item.data.pasien}</Text>
                    <Text style={styles.title}> :
                        {moment(item.data.createdAt.toDate()).format(
                        'dddd, DD-MM-YYYY',)
                        }
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.iconCeklis}
                    onPress={() => this.checkList(item.id)}>
                    <IconCeklis />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
        
        {this.state.isLoading ? (<Loading/>) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerCard: {
    flex:1,
    alignItems: 'center',
    marginVertical: 20,
  },
  containerItemCard: {
    width: 330,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#EBEEF2',
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  containerItemText: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Shippori-Medium',
    fontSize: 12,
    color: '#6F6F6F',
    marginBottom: 5,
  },
  iconCeklis: {
    
  },
});
