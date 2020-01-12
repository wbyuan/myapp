import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { LoginScreen } from "../component/LoginScreen"
import { VarifyScreen } from "../component/VarifyScreen"
export const LoginStack = createStackNavigator(
    {
        login:{
            screen:LoginScreen,
            navigationOptions:{
                title:"登录/注册"
            }
        },
        varify:{
            screen:VarifyScreen
        }
    },
    {
        initialRouteName:"login",
        defaultNavigationOptions: {
            // header: null
            headerStyle: {
                backgroundColor: '#1c2d34',
                height: 48,
                shadowOpacity: 0,
                shadowOffset: {
                  height: 0,
                },
                shadowRadius: 0,
                elevation: 0,
            },
            headerTintColor: '#00b17b',
            headerTitleStyle: {
                fontSize: 16,
                textAlign: 'center',
                color: '#6792a3',
                fontWeight: 'normal',
                flex: 1,
                textAlign:'center'
            },
        }
    }
)