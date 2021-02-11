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
import axios from 'axios';
import _ from 'lodash';
import SearchBar from '../components/SearchBar';
import * as actions from '../actions/index';
import {connect} from 'react-redux';

class Product extends Component {
  constructor () {
    super ();
    this.category = null;
  }

  async componentDidMount () {
    this.props.Loading ();
    const result = await axios.get (
      'https://fakestoreapi.com/products/category/' + this.category
    );
    this.props.Fetch (result.data);
  }

  render () {
    const {navigation, data, fullData, loading} = this.props;
    this.category = navigation.getParam ('category');

    const handleSearch = text => {
      const formatQuery = text.toLowerCase ();
      const filterData = _.filter (fullData, product => {
        return contains (product, formatQuery);
      });
      this.props.SearchResult (filterData);
    };
    const contains = ({title}, query) => {
      const updatedTitle = title.toLowerCase ();
      if (updatedTitle.includes (query)) {
        return true;
      }
      return false;
    };

    return (
      <View style={styles.container}>

        {/*Search Bar*/}
        <SearchBar
          placeholder={'Search in ' + this.category}
          onTermChange={newTerm => handleSearch (newTerm)}
        />

        {/*List of Products*/}
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
              keyExtractor={item => item.id.toString ()}
              data={data}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate ('Detail', item);
                    }}
                  >
                    <View style={styles.categoryCard}>
                      <Image
                        style={styles.imageStyle}
                        source={{uri: item.image}}
                      />
                      <View style={styles.infoViewStyle}>
                        <Text style={styles.titleStyle}>{item.title}</Text>
                        <Text style={styles.infoStyle}>
                          Price: ${item.price}
                        </Text>
                      </View>
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
    backgroundColor: 'white',
  },
  categoryCard: {
    marginBottom: 1,
    borderBottomWidth: 1, 
    backgroundColor: '#f8f8f8',
  },
  infoViewStyle: {
    alignItems: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderTopColor: '#000',
    justifyContent: 'space-around',
    flex: 1,
    elevation: 5,
    shadowOpacity: 1,
    shadowOffset: {
      height: -10,
      width: 0,
    },
    shadowColor: 'black',
  },
  titleStyle: {
    marginLeft: 10,
    paddingRight: 10,
    alignSelf: 'flex-start',
    backgroundColor: '#f9f9f9',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoStyle: {
    marginLeft: 15,
    alignSelf: 'flex-start',
    fontSize: 20,
    backgroundColor: '#f9f9f9',
    fontWeight: '800',
  },
  imageStyle: {
    alignSelf: 'center',
    marginVertical: 15,
    padding: 5,
    height: 100,
    width: 100,
    resizeMode: 'contain',
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

export default connect (mapStateToProps, actions) (withNavigation (Product));
