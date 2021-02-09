import React, { useState, useEffect } from 'react';
import axios from "axios";
import _ from "lodash";

export default (category) => {
    const [data, setData] = useState([]);
    const [fullData, setFullData] = useState([]);
    const [loading, setLoading] = useState(false);

    //Implementation of search logic
    const handleSearch = (text) => {
        const formatQuery = text.toLowerCase();
        console.log(formatQuery);
        const filterData = _.filter(fullData, product => {
            return contains(product, formatQuery);
        })
        setData(filterData);
    }
    const contains = ({ title }, query) => {
        const updatedTitle = title.toLowerCase();
        if (updatedTitle.includes(query)) {
            return true;
        }
        return false;
    }

    // making a get request to fakestore API
    const makeRemoteRequest = async () => {
        setLoading(true);
        try {
            const result = await axios.get("https://fakestoreapi.com/products/category/" + category)
            setData(result.data)
            setFullData(result.data)
            setLoading(false)
        } catch(err) {
            console.log(err)
        }
    }

    //fetching products of a specific category from fakestore API on the initial render
    useEffect(() => {
        makeRemoteRequest()
    }, [])

    return [handleSearch, data, loading];
}