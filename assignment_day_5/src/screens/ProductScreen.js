import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import SearchBar from "../components/SearchBar";
import useProductResults from "../hooks/useProductResults";

const ProductScreen = ({ navigation }) => {
    const category = navigation.state.params;

    // A Reusable hook that can be used to handle search and remote request to the api.
    const [handleSearch, data, loading] =  useProductResults(category);

    return (
        <View style={styles.container}>

            {/*Search Bar*/}
            <SearchBar
                placeholder={"Search in " + category}
                onTermChange={(newTerm) => handleSearch(newTerm)}
            />

            {/*List of Products*/}
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
        resizeMode: 'contain',
        marginHorizontal: 5,
        shadowOpacity: 1,
    },
    infoViewStyle: {
        alignItems: 'flex-start',
        flex: 1,
    }
});

export default ProductScreen;