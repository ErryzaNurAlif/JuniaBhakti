import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const Loading = () => {
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <ActivityIndicator size="small" color="#020E8A"/>
                <Text style={styles.textLoading}>Memuat...</Text>
            </View>
        </View>
    );
}

export default Loading;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        width: '100%',
        height: '100%',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(122, 122, 122, 0.5)'
    },
    wrapper: {
        width: 130,
        height: 65,
        backgroundColor: 'white',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },
    textLoading: {
        marginTop: 5,
        color: '#020E8A',
        fontSize: 13,
        fontFamily: 'Shippori-Regular'
    }
})