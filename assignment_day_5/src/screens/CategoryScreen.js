import React, { Component } from 'react';
import Category from "../components/Category";
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from '../reducers/index';

class CategoryScreen extends Component {
    render() {
        return (
            <Provider store={createStore(reducers)} >
                <Category />
            </Provider>
        );
    }
}

export default CategoryScreen;