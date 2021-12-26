import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { HeaderPage } from '../../components/components';

const ProfilKlinik = () => {
    return (
        <View style={styles.containerPage}>
            <HeaderPage titleHeader="Profil Klinik"/>

            <View style={styles.containerContent}>
                <Text style={styles.headerContent}>Tentang Kami</Text>
                <Text style={styles.infoProfil}>
                    Klinik Junia Bhakti adalah salah satu klinik kesehatan yang ada di kota Depok dan berlokasi di tempat strategis. 
                    Klinik Junia Bhakti didirikan oleh Bapak Haji Sayuti, dan mulai beroperasi sejak tahun 1990.
                </Text>
            </View>
        </View>
    );
}

export default ProfilKlinik;

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
    infoProfil:{
        width: '90%',
        color: '#4D4D4D',
        fontFamily: 'Shippori-Regular',
        fontSize: 13,
        textAlign: 'center',
        marginBottom: 15
    }
})