import React, { Component } from 'react';
import Product from '../components/Product';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from '../reducers/index';

class ProductScreen extends Component {
    render() {
        return (
            <Provider store={createStore(reducers)}>
                <Product />
            </Provider>
        );
    }
}

export default ProductScreen;