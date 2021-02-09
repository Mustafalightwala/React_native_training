import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import SearchBar from "../components/SearchBar";
import _ from "lodash";

const CategoryScreen = ({ navigation }) => {
    //images for category
    const images = {
        'electronics': require("../../assets/icons/electronics.png"),
        'jewelery': require("../../assets/icons/jewelery.png"),
        'men clothing': require("../../assets/icons/men.png"),
        'women clothing': require("../../assets/icons/women.png"), 
    }

    //states- for managing categories while searching
    const [data, setData] = useState([]);
    const [fullData, setFullData] = useState([]);
    
    //Implementation of search logic
    const handleSearch = (text) => {
        const formatQuery = text.toLowerCase(); //remove case sensitivity from search
        console.log(formatQuery);
        const filterData = _.filter(fullData,  category => {
            return contains(category, formatQuery); //checking for the search term in category
        })
        console.log(filterData)
        setData(filterData);
    }
    const contains = (category, query) => {
        if(category.includes(query)) {
            return true;
        }
        return false;
    }

    //fetching categories from fakestore API on the initial render
    useEffect(() => {
        fetch('https://fakestoreapi.com/products/categories')
            .then(res=>res.json())
            .then(json=> {
                setData(json)
                setFullData(json)
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    //rendering components
    return(
        <View style={styles.container}>

            {/*Search Bar*/}
            <SearchBar 
                placeholder = 'Search Categories'
                onTermChange={(newTerm)=>{ handleSearch(newTerm) }}
            />
            
            {/*List of Categories*/}

            <FlatList
                keyExtractor={ (item)=>item }
                data={data}
                renderItem = {({ item }) => {
                    return(
                        <TouchableOpacity onPress={() => {navigation.navigate('Product', item)}}>
                            <View style={styles.categoryCard}>
                                    <Image 
                                        style={styles.imageStyle}
                                        source={images[item]}
                                    />
                                    <Text style={styles.titleStyle}>{item[0].toUpperCase()+item.slice(1)}</Text>
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
    categoryContainer: {
        flexDirection:'row',
        justifyContent:'space-around',
        borderWidth: 1,
        borderColor:'black',
        margin: 15,
    },
    categoryCard: {
        marginHorizontal: 10,
        marginBottom: 15,
        flexDirection: 'row',
        elevation: 5,
        shadowOpacity: 1,
        backgroundColor: '#afdbd9',
    },
    titleStyle: {
        marginLeft: 25,
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    imageStyle: {
        alignSelf: 'center',
        marginHorizontal:5,
        shadowOpacity: 1,
    }
});

export default CategoryScreen;