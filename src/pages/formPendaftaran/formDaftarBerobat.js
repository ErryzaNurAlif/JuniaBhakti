import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {HeaderPage, FormInputPendaftaran, Loading} from '../../components/components';
import {IconDropDown} from '../../assets/assets';
import DropDownPicker from 'react-native-dropdown-picker';
import {showMessage} from 'react-native-flash-message';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


export default class FormDaftarBerobat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pasien: '',
      errPasien: null,
      listDokter: [],
      dokter: '',
      errDokter: null,
      userId: '',
      isAccepted: false,
      isLoading: false
    };
  }

  async componentDidMount() {
    this.getDoctorList();
    this.getDataUser();
  }

  async getDoctorList() {
    let snapshot = await firestore().collection('doctor').get();
    let listData = (snapshot).docs.map(doc => doc.data());
    listData.map(data => {
      data.label = data.namaDokter;
      data.value = data.namaDokter;
    });
    this.setState({listDokter: listData});
  }

  toast = (message, error) => {
    showMessage({
      message: message,
      type: 'default',
      backgroundColor: error ? '#E06379' : '#42AD62' ,
      fontSize: 13,
      color: 'white',
    });
  };

  submitValidation() {
    const {pasien, dokter} = this.state;
  
    if (dokter == '' || pasien == '') {
      if (pasien == '') {
        this.setState({errPasien: 'Isi Nama Pasien dulu'});
      }
      if (dokter == '') {
        this.setState({errDokter: 'Pilih Dokter dulu'});
      }
    } else {
      this.submiting();
    }
  }

  async getDataUser() {
    const user = auth().currentUser;
    let snapshot = await firestore()
      .collection('users')
      .where('userId', '==', user.uid)
      .get();

    let userDetail = (snapshot).docs.map(doc => doc.data());
    let userData = userDetail[0];
    let nama = userData.nama;
    console.log(`userData`, userData.nama);
    this.setState({
      userId: user.uid,
      pasien: nama,
    });
  }

  async submiting() {
    this.setState({isLoading: true});
    const {pasien, dokter, errPasien, errDokter, userId} = this.state;
    let noAntri;
    let snapshot = await firestore()
      .collection('antrian')
      .orderBy('createdAt', 'desc')
      .get();

    let listData = (snapshot).docs.map(doc => doc.data());

    if (listData.length == 0) {
      noAntri = 1;
    } else {
      noAntri = listData[0].antrian + 1;
    }
    console.log(`listData.length`, listData.length);
    console.log(
      `listData.find`,
      listData.find(data => data.userId == userId),
    );
    if (errPasien == null && errDokter == null) {
      if (
        listData.find(data => data.userId == userId) == undefined
      ) {
        await firestore()
          .collection('antrian')
          .add({
            pasien: pasien,
            dokter: dokter.value,
            jadwal: `${dokter.inTime} - ${dokter.outTime}`,
            antrian: noAntri,
            createdAt: new Date(),
            userId: userId,
            isAccepted: false
          })
          .then(() => {
            this.setState({isLoading: false});
            this.createRiwayat(noAntri);
            this.props.navigation.navigate('Beranda');
          })
          .catch(error => {
            console.log(`error`, error);
            this.toast('Ada kesalahan', true);
            this.setState({isLoading: false});
          });
      } else {
        this.toast('Anda sudah mendaftar, tidak dapat daftar kembali!', true);
        this.setState({isLoading: false});
      }
    }
  }

  async createRiwayat(noAntri) {
    const {pasien, dokter, userId} = this.state;

    await firestore()
      .collection('riwayat_antrian')
      .add({
        pasien: pasien,
        dokter: dokter.value,
        jadwal: `${dokter.inTime} - ${dokter.outTime}`,
        antrian: noAntri,
        createdAt: new Date(),
        userId: userId,
      })
    .then(() => {
      this.toast('Anda berhasil mendaftar berobat', false);
    })
    .catch(error => {
      console.log(`error`, error);
      this.toast('Ada kesalahan', true);
    });
  }

  onChangeText = (nameState, value, err) => {
    this.setState({
      [nameState]: value,
      [err]: null,
    });
  };
  
  picker = () => (
    <View style={{marginBottom: 20}}>
      <Text style={styles.titleInput}>Nama Dokter</Text>
      <DropDownPicker
        placeholder={
          this.state.dokter == ''
            ? 'Pilih Dokter'
            : `${this.state.dokter}`
        }
        placeholderStyle={{
          position: 'absolute',
          color : '#707070',
        }}
        items={this.state.listDokter}
        style={{
          borderColor: '#000',
          borderWidth: 1.2,
          paddingVertical: 24.5,
          paddingLeft:275,
        }}
        itemStyle={{
          justifyContent: 'flex-start',
          paddingVertical: 10,
          marginBottom: 10
        }}
        onChangeItem={item =>
          this.setState({
            dokter: item,
            errDokter: null,
          })
        }
        labelStyle={styles.labelStyle}
        customArrowUp={() => (
          <Image
            source={IconDropDown}
            style={{width: 22, height: 22, marginRight: 5,  transform: [{rotate: '180deg'}]}}
          />
        )}
        customArrowDown={() => (
          <Image
            source={IconDropDown}
            style={{width: 22, height: 22, marginRight: 5}}
          />
        )}
      />
      {this.state.errDokter && (
        <Text style={styles.errInput}>{this.state.errDokter}</Text>
      )}
    </View>
  );

  render() {
    console.log(this.state.listDokter);
    const {pasien, dokter, errDokter, errPasien} = this.state;
    return (
      <View style={styles.containerPage}>
        <HeaderPage titleHeader="Daftar Berobat" />
        <View style={{paddingHorizontal: 20, marginTop:60}}>

          <FormInputPendaftaran
            title="Nama Pasien"
            placeholder="Masukkan Nama"
            nameState={pasien}
            onChangeText={value =>
              this.onChangeText('pasien', value, 'errPasien')
            }
            value={pasien}
            errMessage={errPasien}
            editable={false}
          />

          {this.picker()}

          <FormInputPendaftaran
            title= "Jadwal"
            placeholder={
              dokter == ''
                ? 'Jadwal Dokter'
                : `${dokter.inTime} - ${dokter.outTime}`
            }
            editable={false}
            errMessage={errDokter}
          />
          
          <TouchableOpacity
            style={styles.touchDaftar}
            onPress={() => this.submitValidation()}>
            <Text style={styles.titleTouch}>Daftar</Text>
          </TouchableOpacity>
        </View>
        {this.state.isLoading ? <Loading/> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleInput: {
    color: '#1E1C22',
    fontFamily: 'Shippori-Medium',
    fontSize: 15,
    marginBottom: 10,
  },
  containerPage: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  titlePage: {
    color: '#020E8A',
    fontFamily: 'Shippori-SemiBold',
    fontSize: 15,
    width: '65%',
    marginVertical: 40,
  },
  touchDaftar: {
    padding: 17,
    backgroundColor: '#020E8A',
    borderRadius: 10,
    marginTop: 20,
  },
  titleTouch: {
    color: 'white',
    fontFamily: 'Shippori-SemiBold',
    fontSize: 18,
    textAlign: 'center',
  },
  errInput: {
    color: 'red',
    fontFamily: 'Shippori-Regular',
    marginTop: 6,
  },
  labelStyle: {
    fontSize: 14,
    textAlign: 'left',
    color: '#707070',
    fontFamily: 'Shippori-Regular',
    position: 'absolute',
  },
});
