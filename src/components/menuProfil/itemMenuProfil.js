import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { IconNext } from '../../assets/assets';

const ItemMenuProfil = ({iconLeft, titleButton, onPress}) => {
  return (
    <TouchableOpacity style={styles.containerEdit} onPress={() => onPress()}>
      <View style={styles.containerLeft}>
        {iconLeft}
        <Text style={styles.title}>{titleButton}</Text>
      </View>

      <IconNext />
    </TouchableOpacity>
  );
};

export default ItemMenuProfil;

const styles = StyleSheet.create({
  containerEdit: {
    backgroundColor: '#EBEEF2',
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 10,
    marginTop: 15,
  },
  title: {
    color: '#1E1C22',
    fontFamily: 'Shippori-SemiBold',
    fontSize: 15,
    marginLeft: 20,
  },
  containerLeft: {
    flexDirection: 'row',
  },
});
