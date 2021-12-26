import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { 
    IconBeranda, IconBerandaAktif, IconRiwayat, IconRiwayatAktif, IconAkun, IconAkunAktif 
} from '../../assets/assets';

const TabItem = ({isFocused, onPress, onLongPress, label}) => {
    const Icon = () => {
        if (label === 'Beranda') return isFocused ? <IconBerandaAktif/> : <IconBeranda/>  ;
        if (label === 'RiwayatBerobat') return isFocused ?  <IconRiwayatAktif/> : <IconRiwayat/>;
        if (label === 'Profil') return isFocused ? <IconAkunAktif/> : <IconAkun/>  ;

        return <IconBerandaAktif/>
    }
    return (
        <TouchableOpacity
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.container}>
            <Icon/>
        </TouchableOpacity>
    )
}

export default TabItem;

const styles = StyleSheet.create({
    container: { 
        flex: 1,
        alignItems: 'center',
        paddingTop: 16,
        paddingBottom: 10,
        position: 'relative'
    }
})
