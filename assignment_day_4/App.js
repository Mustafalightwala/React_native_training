import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './src/screens/LoginScreen';
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from './src/screens/ProfileScreen';

const navigator = createStackNavigator(
  {
    Login: Login,
    Home: HomeScreen,
    Profile: ProfileScreen,
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      title: 'Demo',
    },
  }
);

export default createAppContainer(navigator);