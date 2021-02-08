import { createAppContainer, NavigationContext, StackRouter } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import CategoryScreen from "./src/screens/CategoryScreen";
import ProductScreen from "./src/screens/ProductScreen";
import DetailScreen from "./src/screens/DetailScreen";

const screens = {
  Category: {
    screen: CategoryScreen,
    navigationOptions: {
      title: 'Categories',
      headerStyle: {
        backgroundColor: '#afdbd9',
        borderRadius: 20,
      }
    }
  },
  Product: {
    screen: ProductScreen,
    navigationOptions: {
      title: 'Products',
      headerStyle: {
        backgroundColor: '#afdbd9',
        borderRadius: 20,
      }
    }
  },
  Detail: {
    screen: DetailScreen,
    navigationOptions: {
      title: 'Product Details',
      headerStyle: {
        backgroundColor: '#afdbd9',
        borderRadius: 20,
      }
      
    }
  },
}


const navigator = createStackNavigator(screens);

export default createAppContainer(navigator);