import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import SearchBar from "../components/SearchBar";
import _ from "lodash";

const ProductScreen = ({ navigation }) => {
    const category = navigation.state.params;

    //states- for managing categories while searching
    const [data, setData] = useState([]);
    const [fullData, setFullData] = useState([]);

    //Implementation of search logic
    const handleSearch = (text) => {
        const formatQuery = text.toLowerCase();
        console.log(formatQuery);
        const filterData = _.filter(fullData, product => {
            return contains(product, formatQuery);
        })
        console.log(filterData)
        setData(filterData);
    }
    const contains = ({ title }, query) => {
        const updatedTitle = title.toLowerCase();
        console.log(updatedTitle);
        if (updatedTitle.includes(query)) {
            return true;
        }
        return false;
    }

    //fetching products of a specific category from fakestore API on the initial render
    useEffect(() => {
        console.log("useEffect called");
        console.log(category);
        fetch('https://fakestoreapi.com/products/category/' + category)
            .then(res => res.json())
            .then(json => {
                setData(json)
                setFullData(json)
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    return (
        <View style={styles.container}>

            {/*Search Bar*/}
            <SearchBar
                placeholder={"Search in " + category}
                onTermChange={(newTerm) => handleSearch(newTerm)}
            />

            {/*List of Products*/}
            <FlatList
                keyExtractor={(item) => item.id.toString()}
                data={data}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={{ elevation: 10 }} onPress={() => { navigation.navigate('Detail', item) }}>
                            <View style={styles.categoryCard}>
                                <Image
                                    style={styles.imageStyle}
                                    source={{ uri: item.image }}
                                />
                                <View style={styles.infoViewStyle}>
                                    <Text style={styles.titleStyle}>{item.title}</Text>
                                    <Text style={styles.infoStyle}>Price: ${item.price}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};

//Styles for components
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    categoryCard: {
        marginBottom: 1,
        flexDirection: 'row',
        backgroundColor: '#afdbd9',
        height: 100,
    },
    titleStyle: {
        marginLeft: 10,
        paddingRight: 10,
        alignSelf: 'flex-start',
        fontSize: 18,
        fontWeight: 'bold',
    },
    infoStyle: {
        marginLeft: 15,
        alignSelf: 'flex-start',
        fontSize: 18,
    },
    imageStyle: {
        alignSelf: 'center',
        borderRadius: 5,
        padding: 5,
        height: 80,
        width: 80,
        marginHorizontal: 5,
        shadowOpacity: 1,
    },
    infoViewStyle: {
        alignItems: 'flex-start',
        flex: 1,
    }
});

export default ProductScreen;