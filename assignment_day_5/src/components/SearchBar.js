import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const SearchBar = ({ placeholder, onTermChange }) => {
    return (
        <View style={styles.background}>
            {/*Search Icon */}
            <Feather style={styles.iconStyle} name="search" />
            {/*Search Input Field */}
            <TextInput
                style={styles.inputStyle}
                placeholder={placeholder}
                autoCorrect={false}
                onChangeText={onTermChange}
            />
        </View>
    );
};

//Styles for components
const styles = StyleSheet.create({
    background: {
        marginTop: 15,
        backgroundColor: '#F0EEEE',
        height: 50,
        borderRadius: 20,
        marginHorizontal: 15,
        marginBottom: 10,
        flexDirection: 'row',
    },
    inputStyle: {
        fontSize: 18,
        paddingRight: 10,
        flex: 1,
    },
    iconStyle: {
        fontSize: 35,
        alignSelf: 'center',
        marginHorizontal: 5,
    },
});

export default SearchBar;
