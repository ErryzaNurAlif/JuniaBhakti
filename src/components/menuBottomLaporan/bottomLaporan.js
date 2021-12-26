import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const BottomLaporan = ({IconLap, titleLaporan, onPress}) => {
    return (
        <TouchableOpacity style={styles.containerLaporan} onPress={onPress}>
            {IconLap}
            <Text style={styles.titleLap}>Laporan</Text>
            <Text style={styles.titleSubLap}>{titleLaporan}</Text>
        </TouchableOpacity>
    )
}

export default BottomLaporan;

const styles = StyleSheet.create({
    containerLaporan: {
        width: 150,
        height: 150,
        borderRadius: 5,
        backgroundColor: '#EBEEF2',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleLap: {
        fontFamily: 'Shippori-Bold',
        fontSize: 15,
        color: '#1E1C22',
        marginTop: 5
    },
    titleSubLap: {
        fontFamily: 'Shippori-Medium',
        fontSize: 12,
        color: '#1E1C22',
    }

})
