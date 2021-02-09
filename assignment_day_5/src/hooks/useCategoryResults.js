import React, { useState, useEffect } from 'react';
import axios from "axios";
import _ from "lodash";

export default () => {
    //states- for managing categories while searching
    const [data, setData] = useState([]);
    const [fullData, setFullData] = useState([]);
    const [loading, setLoading] = useState(false);
    
    //Implementation of search logic
    const handleSearch = (text) => {
        const formatQuery = text.toLowerCase(); //remove case sensitivity from search
        const filterData = _.filter(fullData,  category => {
            return contains(category, formatQuery); //checking for the search term in category
        })
        setData(filterData);
    }
    const contains = (category, query) => {
        if(category.includes(query)) {
            return true;
        }
        return false;
    }

    // making a get request to fakestore API
    const makeRemoteRequest = async () => {
        setLoading(true);
        try {
            const result = await axios.get("https://fakestoreapi.com/products/categories")
            setData(result.data)
            setFullData(result.data)
            setLoading(false);
        } catch(err) {
            console.log(err)
        }
    }
    //fetching categories from fakestore API on the initial render
    useEffect(() => {
        makeRemoteRequest();
    }, [])

    return [handleSearch, data, loading];
}