import React, { useState } from 'react';
import { ShadowPropTypesIOS } from 'react-native';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import users, { userStatus } from "../Users";

const Login = ({ navigation }) => {

    const [uname, setUserName] = useState('');
    const [pswrd, setPassword] = useState('');

    //Authentication Login
    const btnClick = () => {
        if (uname in users) {
            if (users[uname].pswrd == pswrd) {
                userStatus.login = true;
                userStatus.uname = uname;
                navigation.navigate('Home');
            }
            else {
                Alert.alert('Incorrect Password');
            }
        }
        else {
            Alert.alert('Incorrect username');
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>Login</Text>
            {/*Username Field */}
            <TextInput
                style={styles.inputStyle}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Username"
                secureTextEntry={false}
                onChangeText={(val) => setUserName(val)}
            />

            {/*Password Field */}
            <TextInput
                style={styles.inputStyle}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(val) => setPassword(val)}
            />

            <TouchableOpacity style={styles.btnContainer} onPress={btnClick}>
                <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 20,
        margin: 20,
        marginVertical: 50,
    },
    textStyle: {
        fontSize: 40,
        marginBottom: 40,
        alignSelf: 'center',
    },
    inputStyle: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 5,
        height: 40,
        marginVertical: 5,
        marginHorizontal: 15,
        fontSize: 18
    },
    btnContainer: {
        backgroundColor: '#8fc2bd',
        margin: 10,
        marginTop: 40,
        borderRadius: 50,
        alignItems: 'center',
        alignSelf: 'center',
        padding: 10,
        width: 200
    },
    btnText: {
        fontSize: 20,
        fontWeight: 'bold',
    }
});

export default Login;