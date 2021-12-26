import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HeaderPageRiwayat = ({titleHeader}) =>  {
    return (
        <View style={styles.containerHeader}>
            <View style={styles.containerTitle}>
                <Text style={styles.title}>{titleHeader}</Text>
            </View>
        </View>
    );
}

export default HeaderPageRiwayat;

const styles = StyleSheet.create({
    containerHeader:{
        backgroundColor: '#020E8A',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 23,
        paddingVertical: 19,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    containerTitle:{
        width: '100%',
        alignItems: 'center'
    },
    title:{
        color: 'white',
        fontFamily: 'Shippori-Bold',
        fontSize: 18
    }

})