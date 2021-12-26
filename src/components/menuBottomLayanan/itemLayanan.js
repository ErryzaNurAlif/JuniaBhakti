import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const ItemLayanan = ({IconLayanan, titleLayanan, onPress}) => {
    return (
        <TouchableOpacity style={styles.containerLayanan} onPress={onPress}>
            {IconLayanan}
            <Text style={styles.titleItemLayanan}>{titleLayanan}</Text>
        </TouchableOpacity>
    )
}

export default ItemLayanan;

const styles = StyleSheet.create({
    containerLayanan: {
        width: 100,
        height: 100,
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleItemLayanan: {
        fontFamily: 'Shippori-Bold',
        fontSize: 12,
        color: '#020E8A',
        marginTop: 7
    }

})
