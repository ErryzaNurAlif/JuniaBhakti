import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import auth from '@react-native-firebase/auth';

const Logout = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <ActivityIndicator size="small" color="#020E8A" />
        <Text style={styles.textLoading}>Keluar ...</Text>
      </View>
    </View>
  );
};

export default Logout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(122, 122, 122, 0.2)',
  },
  wrapper: {
    width: 130,
    height: 65,
    backgroundColor: 'white',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  textLoading: {
    marginTop: 5,
    color: '#020E8A',
    fontSize: 13,
    fontFamily: 'Shippori-Regular',
  },
});
