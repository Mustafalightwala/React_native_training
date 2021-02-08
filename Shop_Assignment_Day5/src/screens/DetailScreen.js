import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView} from 'react-native';

const DetailScreen = ({ navigation }) => {
    const productDetail = navigation.state.params;

    return (
        <ScrollView style={styles.container}>
            {/* Product Image*/}
            <View style={styles.imageContainer}>
                <Image style={styles.imageStyle} source={{uri: productDetail.image}} />
            </View>

            {/*Product Name*/}            
            <View style={styles.titleContainer}>
                <Text style={styles.header}>{productDetail.title}</Text>
                <Text style={styles.body}>In {productDetail.category}</Text>
                {/* <Text style={styles.rating}>Rating: {productDetail.rating}/5</Text> */}
            </View>

            {/*Product details with price*/}
            <View style={styles.detailContainer}>
                <Text style={styles.header}>Product Description</Text>
                <Text style={styles.body}>{productDetail.description}</Text>
                <Text style={styles.price}>Price: ${productDetail.price}</Text>
            </View>
            
            {/*Buy Now button*/}
            <TouchableOpacity >
                <View style={styles.btnContainer}>
                        <Text style={styles.btnTextStyle}>Buy Now</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
    );
};

//Styles for components
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    imageContainer:{
        height: 400,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageStyle: {
        height: 200,
        width: 200,
        resizeMode: 'contain',
        borderRadius: 5,
    },
    titleContainer: {
        paddingBottom: 20,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 10,
        margin:10,
    },
    detailContainer:{
        paddingBottom: 20,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 10,
        margin:10,
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    body: {
        fontSize:16,
        marginHorizontal: 10,
    },
    rating: {
        fontSize: 18,
        borderWidth:2,
        padding: 10,
        borderColor: 'black',
        borderRadius: 10,
        backgroundColor: '#afdbd9',
        marginTop:10,
        marginHorizontal: 5,
        fontWeight: 'bold'
    },
    price:{
        fontSize: 18,
        borderWidth:2,
        paddingHorizontal: 10,
        borderColor: 'black',
        borderRadius: 10,
        marginHorizontal: 10,
        marginTop: 25,
        marginBottom:10,
        fontWeight: 'bold'
    },
    btnContainer: {
        borderRadius:10,
        backgroundColor: '#afdbd9',
        marginHorizontal: 10,
        justifyContent: 'center',
        borderWidth: 2,
        height:50,
    },
    btnTextStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
    }
});

export default DetailScreen;