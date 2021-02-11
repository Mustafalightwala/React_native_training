import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import axios from 'axios';
import _ from 'lodash';
import SearchBar from '../components/SearchBar';
import * as actions from '../actions/index';

class Category extends Component {
  async componentDidMount () {
    this.props.Loading ();
    const result = await axios.get (
      'https://fakestoreapi.com/products/categories'
    );
    this.props.Fetch (result.data);
  }

  render () {
    const {data, fullData, loading} = this.props;

    const handleSearch = text => {
      const formatQuery = text.toLowerCase (); //remove case sensitivity from search
      const filterData = _.filter (fullData, category => {
        return contains (category, formatQuery); //checking for the search term in category
      });
      this.props.SearchResult (filterData);
    };
    const contains = (category, query) => {
      if (category.includes (query)) {
        return true;
      }
      return false;
    };

    //images for category
    const images = {
      electronics: require ('../../assets/icons/electronics.png'),
      jewelery: require ('../../assets/icons/jewelery.png'),
      'men clothing': require ('../../assets/icons/men.png'),
      'women clothing': require ('../../assets/icons/women.png'),
    };

    //rendering components
    return (
      <View style={styles.container}>

        {/*Search Bar*/}
        <SearchBar
          placeholder="Search Categories"
          onTermChange={newTerm => {
            handleSearch (newTerm);
          }}
        />

        {/*List of Categories*/}
        {loading
          ? //loading indicator when no data is present to display
            <ActivityIndicator
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}
              color="#008000"
              animating
              size="large"
            />
          : <FlatList
              keyExtractor={item => item}
              data={data}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate ('Product', {
                        category: item,
                      });
                    }}
                  >
                    <View style={styles.categoryCard}>
                      <View style={styles.imageContainer}>
                        <Image
                          style={styles.imageStyle}
                          source={images[item]}
                        />
                      </View>

                      <Text style={styles.titleStyle}>
                        {item[0].toUpperCase () + item.slice (1)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />}

      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  categoryCard: {
    marginHorizontal: 10,
    marginBottom: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000000',
    shadowOffset: {height: 2, width:0},
    shadowOpacity: 0.9,
    shadowRadius:3,
    elevation:3,
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
  },
});

const mapStateToProps = state => {
  return {
    data: state.productReducer.data,
    fullData: state.productReducer.fullData,
    loading: state.productReducer.loading,
  };
};

export default connect (mapStateToProps, actions) (withNavigation (Category));
