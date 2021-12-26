import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {IconBack} from '../../assets/assets';
import {useNavigation} from '@react-navigation/native';

const HeaderPage = props => {
  const Navigation = useNavigation();

  return (
    <View style={styles.containerHeader}>
      <TouchableOpacity
        style={styles.touchBack}
        onPress={() =>
          props.customBack == undefined
            ? Navigation.goBack()
            : props.customBack()
        }>
        <IconBack />
      </TouchableOpacity>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>{props.titleHeader}</Text>
      </View>
    </View>
  );
};

export default HeaderPage;

const styles = StyleSheet.create({
  containerHeader: {
    backgroundColor: '#020E8A',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 23,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  touchBack: {
    paddingVertical: 23,
    paddingRight: 20,
  },
  containerTitle: {
    width: '77%',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontFamily: 'Shippori-Bold',
    fontSize: 18,
  },
});
