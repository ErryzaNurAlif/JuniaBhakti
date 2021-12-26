import React from 'react';
import { StyleSheet, View} from 'react-native';
import { IconLaporan } from '../../assets/assets';
import { HeaderPage, BottomLaporan } from '../../components/components';

const Laporan = ({ navigation }) =>  {
    return (
        <View style={styles.containerPage}>
            <HeaderPage titleHeader="Laporan Klinik"/>
            <View style={{justifyContent: 'center', flex:1}}>
                <View style={styles.containerBottom}>
                    <BottomLaporan
                        IconLap={<IconLaporan/>}
                        titleLaporan="Data Pasien"
                        onPress={() => navigation.navigate('LaporanDataPasien')}
                    />
                    <BottomLaporan
                        IconLap={<IconLaporan/>}
                        titleLaporan="Data Dokter"
                        onPress={() => navigation.navigate('LaporanDataDokter')}
                    />
                </View>

                <View style={styles.containerBottom}>
                    <BottomLaporan
                        IconLap={<IconLaporan/>}
                        titleLaporan="Berobat Pasien"
                        onPress={() => navigation.navigate('LaporanDataBerobat')}
                    />
                    <BottomLaporan
                        IconLap={<IconLaporan/>}
                        titleLaporan="Data Akun"
                        onPress={() => navigation.navigate('LaporanDataAkun')}
                    />
                </View>
            </View>
        </View>
    );
}

export default Laporan;

const styles = StyleSheet.create({
    containerPage: {
        flex: 1,
        backgroundColor: '#F7F8FA'
    },
    containerBottom: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 20
    }
});

