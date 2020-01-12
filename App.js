/**
 * Sample React Native App
 */
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { LoginStack } from './navigator/LoginStack'
import { TabNavigator } from "./navigator/AppTabNavigator"
import { LoadingStack } from "./navigator/LoadingStack"
//import { EditUserStack } from './navigator/EditUserStack'
//总路由
const AppNavigator = createStackNavigator(
  {
    LoginStack: {
      screen: LoginStack
    },
    TabNavigator: {
      screen: TabNavigator,
    },
    Loading: {
      screen: LoadingStack
    },
    // EditUser:{
    //   screen:EditUserStack,
    //   navigationOptions:{
    //       header:null
    //   }
    // }
  },
  {
    initialRouteName:"TabNavigator",
    defaultNavigationOptions: {
      header: null
    }
  }
)
export default createAppContainer(AppNavigator);