import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageScreen from '../screens/ImageScreen';
import LoadingScreen from '../screens/LoadingScreen';
import colors from '../constants/colors';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Image') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Loading') {
            iconName = focused ? 'reload-circle' : 'reload-circle-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        labelStyle: styles.labelStyle,
        activeTintColor: colors.activeTintColor,
        inactiveTintColor: colors.inactiveTintColor,
      }}>
      <Tab.Screen name="Image" component={ImageScreen} />
      <Tab.Screen name="Loading" component={LoadingScreen} />
    </Tab.Navigator>
  );
}

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 13,
  },
});

export default MainNavigation;
