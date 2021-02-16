import React from 'react';
import {View, Text, StyleSheet, Modal, ActivityIndicator} from 'react-native';
import colors from '../constants/colors';

const Dialog = ({visibility}) => {
  return (
    <Modal visible={visibility}>
      <View style={styles.outerDialog}>
        <View style={styles.dialog}>
          <Text style={styles.dialogTitle}>Loading...</Text>
          <ActivityIndicator size="large" color={colors.loaderColor} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  outerDialog: {
    flex: 1,
    backgroundColor: '#00000020',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '80%',
  },
  dialogTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
});

export default Dialog;
