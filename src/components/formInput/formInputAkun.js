import React from 'react';
import {StyleSheet, View, TextInput, Text} from 'react-native';

export default function formInputAkun(props) {
  return (
    <View style={styles.containerInputAkun}>
      {props.IconInput}
      <TextInput
        style={styles.inputAkun}
        nameState={props.nameState}
        {...props}
      />
      {props.errMessage && (
        <Text style={styles.errInput}>{props.errMessage}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerInputAkun: {
    backgroundColor: '#EBEEF2',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 30,
  },
  inputAkun: {
    width: '89.5%',
    marginLeft: 10,
    fontFamily: 'Shippori-Regular',
    fontSize: 13,
    color: '#000',
  },
  errInput: {
    color: 'red',
    fontFamily: 'Shippori-Regular',
    position: 'absolute',
    top: 52
  },
});
