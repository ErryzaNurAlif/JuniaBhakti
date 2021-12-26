import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function FormInputPendaftaran(props) {
  if (props.placeholder == 'Masukkan Alamat') {
    return (
      <View style={{marginBottom: 20}}>
        <Text style={styles.titleInput}>{props.title}</Text>
        <TextInput
          style={styles.itemInputAddress}
          numberOfLines={4}
          multiline={true}
          nameState={props.nameState}
          {...props}
        />
        {props.errMessage && (
          <Text style={styles.errInput}>{props.errMessage}</Text>
        )}
      </View>
    );
  } else if (props.iconDate !== undefined) {
    return (
      <View style={{marginBottom: 20}}>
        <Text style={styles.titleInput}>{props.title}</Text>
        <View style={styles.containerInput}>
          <TextInput
            style={styles.itemInputDate}
            nameState={props.nameState}
            {...props}
          />
          <TouchableOpacity
            style={styles.btnDate}
            onPress={() => props.onPress()}>
            {props.iconDate}
          </TouchableOpacity>
        </View>
        {props.errMessage && (
          <Text style={styles.errInput}>{props.errMessage}</Text>
        )}
      </View>
    );
  } else if (props.iconTime !== undefined) {
    return (
      <View style={{marginBottom: 20}}>
        <Text style={styles.titleInput}>{props.title}</Text>
        <View style={styles.containerInput}>
          <TextInput
            style={styles.itemInputDate}
            nameState={props.nameState}
            {...props}
          />
          <TouchableOpacity
            style={styles.btnDate}
            onPress={() => props.onPress()}>
            {props.iconTime}
          </TouchableOpacity>
        </View>
        {props.errMessage && (
          <Text style={styles.errInput}>{props.errMessage}</Text>
        )}
      </View>
    );
  } else {
    return (
      <View style={{marginBottom: 20}}>
        <Text style={styles.titleInput}>{props.title}</Text>
        <TextInput
          style={styles.itemInput}
          nameState={props.nameState}
          {...props}
        />
        {props.errMessage && (
          <Text style={styles.errInput}>{props.errMessage}</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleInput: {
    color: '#1E1C22',
    fontFamily: 'Shippori-Medium',
    fontSize: 15,
    marginBottom: 7,
  },
  containerInput: {
    flexDirection: 'row',
  },
  itemInput: {
    borderColor: '#000',
    borderWidth: 1.2,
    borderRadius: 5,
    backgroundColor: 'white',
    paddingLeft: 10,
    color: '#1E1C22',
    fontFamily: 'Shippori-Regular',
    fontSize: 13,
  },
  itemInputDate: {
    width: '100%',
    borderColor: '#000',
    borderWidth: 1.2,
    borderRadius: 5,
    backgroundColor: 'white',
    paddingLeft: 10,
    color: '#1E1C22',
    fontFamily: 'Shippori-Regular',
    fontSize: 13,
  },
  btnDate: {
    position: 'absolute',
    right: 10,
    top: 8,
  },
  itemInputAddress: {
    textAlignVertical: 'top',
    borderColor: '#000',
    borderWidth: 1.2,
    borderRadius: 5,
    backgroundColor: 'white',
    paddingLeft: 10,
    color: '#1E1C22',
    fontFamily: 'Shippori-Regular',
    fontSize: 13,
  },
  errInput: {
    color: 'red',
    fontFamily: 'Shippori-Regular',
    marginTop: 6,
  },
});
