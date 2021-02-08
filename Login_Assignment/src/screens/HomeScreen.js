import React, { useState } from 'react';
import { ListItem, Avatar } from 'react-native-elements';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import users, { userStatus } from "../Users";

const HomeScreen = ({ navigation }) => {
    var usersDetail = []
    //converting Object to array so it can be used in FlatList component.
    for (let userName in users) {
        usersDetail.push(users[userName]);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>Home</Text>
            <View>
                <FlatList
                    keyExtractor={(item) => item.email}
                    data={usersDetail}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => { navigation.navigate('Profile', item) }}>
                                <View style={styles.listContainer}>
                                    <Image
                                        style={styles.listImage}
                                        source={{ uri: item.avatar }}
                                    />
                                    <Text style={styles.listText}>{item.fname} {item.lname}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ecf0e9',
        flex: 1,
    },
    textStyle: {
        fontSize: 60,
        marginBottom: 5,
        alignSelf: 'center',
    },
    listContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#ddf0ed',
        borderBottomColor: '#a7abaa',
        borderWidth: 0.5
    },
    listImage: {
        height: 60,
        width: 60,
        borderRadius: 50,
    },
    listText: {
        marginLeft: 20,
        fontSize: 20,
        alignSelf: 'center',

    }
});

export default HomeScreen;