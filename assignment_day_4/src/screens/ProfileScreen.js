import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProfileScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>Profile</Text>
            <View style={styles.profileView}>
                {/*Profile Image */}
                <Image
                    source={{ uri: navigation.getParam('avatar') }}
                    style={styles.imageStyle}
                />

                {/*User's Name */}
                <Text style={styles.profileText}>
                    {navigation.getParam('fname')} {navigation.getParam('lname')}
                </Text>

                {/*User's e-mail */}
                <Text style={styles.emailText}>
                    {navigation.getParam('email')}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#b5c4c9',
        flex: 1,
    },
    textStyle: {
        color: 'black',
        fontSize: 60,
        marginBottom: 50,
        alignSelf: 'center',
    },
    imageStyle: {
        height: 200,
        width: 200,
        borderRadius: 150,
        borderColor: 'blue',
    },
    profileView: {
        flex: 1,
        alignItems: 'center',
    },
    profileText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    emailText: {
        fontSize: 20
    },
});

export default ProfileScreen;