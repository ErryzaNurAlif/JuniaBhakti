import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IconAddFoto, IconDropDown, NullFoto, IconJam} from '../../assets/assets';
import {HeaderPage, FormInputPendaftaran, Loading} from '../../components/components';
import {launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';
import firestore from '@react-native-firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import DropDownPicker from 'react-native-dropdown-picker';

export default class FormJadwalDokter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      namaDokter: '',
      startDay: '',
      endDay: '',
      img: '',
      fileInfo: '',
      imgPicker: false,
      inTime: '',
      outTime: '',
      modalTime: false,
      pickingTime: 'inTime',
      listDay: [
        {label: 'Senin', value: 'Senin'},
        {label: 'Selasa', value: 'Selasa'},
        {label: 'Rabu', value: 'Rabu'},
        {label: 'Kamis', value: 'Kamis'},
        {label: 'Jumat', value: 'Jumat'},
        {label: 'Sabtu', value: 'Sabtu'},
        {label: 'Minggu', value: 'Minggu'},
      ],
      hasPhoto: true,
      isLoading: false,
      errStartDay: null,
      errEndDay: null
    };
  }

  onChangeText = (nameState, value,  err) => {
    this.setState({
      [nameState]: value,
      [err]: null,
    });
  };

  saveData = url => {
    this.setState({isLoading:false});
    firestore()
      .collection('doctor')
      .add({
        namaDokter : this.state.namaDokter,
        day: `${this.state.startDay} - ${this.state.endDay} `,
        inTime: this.state.inTime,
        outTime: this.state.outTime,
        foto: url,
        createdAt: new Date(),
      })
      .then(() => {
        this.props.navigation.navigate('JadwalDokter');
        this.toast('Behasil menambahkan data dokter', false);
      })
      .catch(() => {
        this.toast('Ada kesalahan saat menambahkan data dokter', true);
      });
  };

  imgPicker(picker) {
    let options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
      cameraType: 'back',
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

  upload = async () => {
    this.setState({isLoading: true});

    if (this.state.fileInfo !== '') {
      const reference = storage().ref(`${this.state.fileInfo}`); 
      const pathToFile = `${utils.FilePath.TEMP_DIRECTORY}/${this.state.fileInfo}`; 

      try {
        await reference.putFile(pathToFile);

        try {
          const url = await storage()
            .ref(`${this.state.fileInfo}`)
            .getDownloadURL();

          this.saveData(url);
        } catch (error) {
          console.log(`error 1`, error);
          this.toast('Ada kesalahan saat upload poto', true);
        }
        setTimeout(() => {
          this.setState({isLoading: false});
        }, 100);
      } catch (error) {
        console.log(`error`, error);
        this.toast('Ada kesalahan saat upload poto', true);
      }
    }
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

  picker = (title, day) => (
    <View style={{marginBottom: 20}}>
      <Text style={styles.titleInput}>{title}</Text>
      <DropDownPicker
        items={this.state.listDay}
        style={{
          borderColor: '#000', borderWidth: 1.2, paddingVertical: 23, paddingLeft: 105
        }}
        placeholder= 'Pilih Hari'
        placeholderStyle={{
          color : '#707070',
        }}
        itemStyle={{
          justifyContent: 'flex-start', paddingVertical: 10, height:30
        }}
        onChangeItem={item => {
          day == 'start'
            ? this.setState({
                startDay: item.label,
                errStartDay: null,
              })
            : this.setState({
                endDay: item.label,
                errEndDay: null,
              });
        }}
        labelStyle={styles.labelStyle}
        customArrowUp={() => (
          <Image
          source={IconDropDown}
          style={{width: 22, height: 22, transform: [{rotate: '180deg'}]}}
          />
        )}
        customArrowDown={() => (
          <Image
          source={IconDropDown}
          style={{width: 22, height: 22}}
          />
        )}
      />
      {this.state.errStartDay && (
        <Text style={styles.errInput}>{this.state.errStartDay}</Text>
      )}
      {this.state.errEndtDay && (
        <Text style={styles.errInput}>{this.state.errEndDay}</Text>
      )}
    </View>
  );

  timePicker() {
    return (
      <View>
        {this.state.modalTime && (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date()}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={(event, time) => {
              this.state.pickingTime == 'inTime'
                ? this.setState({
                    inTime: `${time.getHours()} : ${time.getMinutes()}`,
                    modalTime: false,
                    errInTime: null,
                })
                : this.setState({
                    outTime: `${time.getHours()} : ${time.getMinutes()}`,
                    modalTime: false,
                    errOutTime: null,
                });
              }
            }
          />
        )}
      </View>
    );
  }

  submitValidation() {
    const {namaDokter,startDay, endDay, inTime, outTime, img} = this.state;
    if (namaDokter == '' || startDay == '' || endDay == '') {
      if (namaDokter == '') {
        this.setState({errNamaDokter: 'Masukkan nama dokter'});
      }
      if (startDay == '') {
        this.setState({errStartDay: 'Masukkan hari awal praktek'});
      }
      if (endDay == '') {
        this.setState({errEndDay: 'Masukkan hari selesai praktek'});
      }
      if (inTime == '') {
        this.setState({errInTime: 'Masukkan jam masuk'});
      }
      if (outTime == '') {
        this.setState({errOutTime: 'Masukkan jam keluar'});
      }
      if (img == '') {
        this.toast('Masukkan Foto Dokter!', true);
      }
    }else {
      this.upload();
    }
  }

  render() {
    const {namaDokter, errNamaDokter, inTime, outTime, errInTime, errOutTime} = this.state;
    return (
      <View style={styles.containerPage}>
        <HeaderPage titleHeader="Input Jadwal Dokter" />

        <View style={styles.content}>
          <View style={styles.profil}>
            <TouchableOpacity
              style={styles.avatarWrapper}
              onPress={() => this.setState({imgPicker: true})}>
              <Image source={this.state.img == '' ? NullFoto : this.state.img} style={styles.avatar} />
              {this.state.hasPhoto ? (
                <IconAddFoto style={styles.addFoto}/>
              ) : null}
            </TouchableOpacity>
          </View>

          <View style={styles.formInput}>
            <FormInputPendaftaran
              title="Nama Dokter"
              placeholder="Masukkan Nama Dokter"
              onChangeText={value => this.onChangeText('namaDokter', value, 'errNamaDokter')}
              nameState={namaDokter}
              value={namaDokter}
              errMessage={errNamaDokter}

            />

            <View View style={{flexDirection: 'row'}}>
              <View style={{flex: 1, marginRight: 5}}>
                {this.picker('Hari Awal Praktek', 'start')}
              </View>
              <View style={{flex: 1, marginLeft: 5}}>
                {this.picker('Hari Selesai Praktek', 'end')}
              </View>
            </View>

            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1, marginRight: 5}}>
                <FormInputPendaftaran
                  title="Jam Masuk"
                  placeholder="Masukkan Jam"
                  editable={false}
                  onPress={() =>
                    this.setState({modalTime: true, pickingTime: 'inTime'})
                  }
                  value={inTime}
                  errMessage={errInTime}
                  iconTime={<IconJam/>}
                />
              </View>
              
              <View style={{flex: 1, marginLeft: 5}}>
                <FormInputPendaftaran
                  title="Jam Keluar"
                  placeholder="Masukkan Jam"
                  editable={false}
                  onPress={() =>
                    this.setState({modalTime: true, pickingTime: 'outTime'})
                  }
                  value={outTime}
                  errMessage={errOutTime}
                  iconTime={<IconJam/>}
                />
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.touchSimpan}
            onPress={() => this.submitValidation()}>
            <Text style={styles.titleTouch}>Simpan</Text>
          </TouchableOpacity>
        </View>
        {this.timePicker()}
        {this.imgPickerModal()}
        {this.state.isLoading ? ( <Loading/> ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerPage: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  content: {
    paddingVertical: 100,
    paddingHorizontal: 35,
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
  formInput: {
    width: '100%',
    marginVertical: 20,
  },
  touchSimpan: {
    width: '100%',
    padding: 15,
    backgroundColor: '#020E8A',
    borderRadius: 10,
    marginBottom: 90,
  },
  titleTouch: {
    color: 'white',
    fontFamily: 'Shippori-SemiBold',
    fontSize: 18,
    textAlign: 'center',
  },
  titleInput: {
    color: '#1E1C22',
    fontFamily: 'Shippori-Medium',
    fontSize: 15,
    marginBottom: 10,
  },
  labelStyle: {
    fontSize: 14,
    textAlign: 'left',
    color: '#000',
    fontFamily: 'Shippori-Medium',
    position: 'absolute', 
    paddingLeft: 3
  },
  errInput: {
    color: 'red',
    fontFamily: 'Shippori-Regular',
    marginTop: 6,
  },
});
