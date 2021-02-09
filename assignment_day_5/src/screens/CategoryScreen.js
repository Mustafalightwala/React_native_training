import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import SearchBar from "../components/SearchBar";
import usecategoryResults from "../hooks/useCategoryResults"

const CategoryScreen = ({ navigation }) => {
    //images for category
    const images = {
        'electronics': require("../../assets/icons/electronics.png"),
        'jewelery': require("../../assets/icons/jewelery.png"),
        'men clothing': require("../../assets/icons/men.png"),
        'women clothing': require("../../assets/icons/women.png"),
    }

    // A Reusable hook that can be used to handle search and remote request to the api.
    const [handleSearch, data, loading] = usecategoryResults();

    //rendering components
    return (
        <View style={styles.container}>

            {/*Search Bar*/}
            <SearchBar
                placeholder='Search Categories'
                onTermChange={(newTerm) => { handleSearch(newTerm) }}
            />

            {/*List of Categories*/}
            {
                (loading) ?
                (//loading indicator when no data is present to display
                    <ActivityIndicator style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1,
                    }}
                        color="#008000"
                        animating
                        size="large"
                    />
                )
                :
                (
                    <FlatList
                        keyExtractor={(item) => item}
                        data={data}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity onPress={() => { navigation.navigate('Product', item) }}>
                                    <View style={styles.categoryCard}>
                                        <Image
                                            style={styles.imageStyle}
                                            source={images[item]}
                                        />
                                        <Text style={styles.titleStyle}>{item[0].toUpperCase() + item.slice(1)}</Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        }}
                    />
                )
            }

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
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 1,
        borderColor: 'black',
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
        marginHorizontal: 5,
        shadowOpacity: 1,
    }
});

export default CategoryScreen;