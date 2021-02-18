import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../constants/colors';

const Button = ({text, onTouch}) => {
  return (
    <TouchableOpacity onPress={onTouch}>
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: colors.buttonBackgroundColor,
    padding: 10,
    margin: 5,
    width: 200,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '800',
  },
});

export default Button;
