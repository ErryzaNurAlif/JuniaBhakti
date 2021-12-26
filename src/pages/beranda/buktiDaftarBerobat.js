import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderPage } from '../../components/components.js';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

export default class BuktiDaftarBerobat extends Component{
    constructor(props) {
        super(props);
        this.state = {
            noAntrian: '',
            namaPasien: '',
            namaDokter: '',
            jadwalDokter: '',
            tanggal: '',
        };
    }

    componentDidMount() {
        this.getDataUser();
    }

    async getDataUser() {
        const user = auth().currentUser;
        console.log(`user`, user);
        let snapshot = await firestore()
            .collection('antrian')
            .where('userId', '==', user.uid)
            .get();
            console.log(`snapshot`, snapshot);

        let userDetail = (await snapshot).docs.map(doc => doc.data());
        let userData = await userDetail[0];
        console.log(`userDetail`, userDetail[0]);
        this.setState({
            noAntrian: userData.antrian,
            namaPasien: userData.pasien,
            namaDokter: userData.dokter,
            jadwalDokter: userData.jadwal,
            tanggal: moment(userData.createdAt).format('dddd, DD-MM-YYYY'),
        });
    }

    render(){
        return(
            <View style={styles.containerPage}>
                <HeaderPage titleHeader="Bukti Daftar"/>

                <View style={{alignItems: 'center', marginTop: 100, marginBottom: 40}}>
                    <View style={styles.wrapper}>
                        <View style={{paddingHorizontal: 20}}>
                            <Text style={styles.title}>Pendaftar</Text>
                            <Text style={styles.textContent}>Tanggal : {this.state.tanggal}</Text>
                            <Text style={styles.textContent}>Nomor Antrian : {this.state.noAntrian}</Text>
                            <Text style={styles.textContent}>Nama : {this.state.namaPasien}</Text>
                            <Text style={styles.textContent}>Nama Dokter : {this.state.namaDokter}</Text>
                        </View>
                    </View>
                </View>

                <View style={{marginLeft: 25}}>
                    <Text style={styles.textNote}>Note:</Text>
                    <Text style={styles.textNote}>Mohon anda screenshoot</Text>
                    <Text style={styles.textNote}>Simpan bukti daftar</Text>
                    <Text style={styles.textNote}>Tunjukan bukti antrian kepada petugas.</Text>
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
    wrapper: {
        width: 310,
        height: 260,
        backgroundColor: 'white',
        borderRadius: 10
    },
    title: {
        marginTop: 30,
        marginBottom: 30,
        textAlign: 'center',
        fontFamily: 'Shippori-Bold',
        fontSize: 16,
        color: '#1E1C22'
    },
    textContent: {
        fontFamily: 'Shippori-Regular',
        fontSize: 14,
        color: '#4D4D4D',
        paddingVertical : 4
    },
    textNote: {
        fontFamily: 'Shippori-Regular',
        fontSize: 14,
        color: '#020E8A'
    }
});