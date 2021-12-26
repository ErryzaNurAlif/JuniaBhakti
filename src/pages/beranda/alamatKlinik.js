import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import { HeaderPage } from '../../components/components';

const AlamatKlinik = () => {
    return (
        <View style={styles.containerPage}>
            <HeaderPage titleHeader="Alamat Klinik"/>

            <View style={styles.containerContent}>
                <Text style={styles.headerContent}>Alamat Kami</Text>
                <Text style={styles.infoKontak}>Jl. Utan Jaya No.8, Pd. Jaya, Kec. Cipayung, Kota Depok, Jawa Barat 16921</Text>
                <Text style={styles.infoKontak}>(021) 87987773</Text>
            </View>
        </View>
    );
}

export default AlamatKlinik;

const styles = StyleSheet.create({
    containerPage:{
        flex: 1,
        backgroundColor: '#F7F8FA'
    },
    containerContent:{
        alignItems: 'center',
        marginTop: 150,
        paddingHorizontal: 23
    },
    headerContent:{
        color: '#1E1C22',
        fontFamily: 'Shippori-ExtraBold',
        fontSize: 22,
        marginBottom: 30
    },
    infoKontak:{
        color: '#4D4D4D',
        fontFamily: 'Shippori-Regular',
        fontSize: 13,
        textAlign: 'center',
        marginBottom: 15
    }
})