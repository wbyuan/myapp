import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
    Button,
    TouchableOpacity
  } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import EditScreen from '../component/edituser/EditScreen'
import UpdateScreen from '../component/edituser/UpdateScreen'
import IntroScreen from '../component/edituser/IntroScreen'
export const EditUserStack = createStackNavigator(
    {
        EditScreen:{
            screen:EditScreen,
            navigationOptions:({navigation})=>({
                title:`${navigation.state.params.title}` //动态获取标题 
            })
        },
        UpdateScreen:{
            screen:UpdateScreen,
            navigationOptions:({navigation})=>({
                title:`${navigation.state.params.title}` //动态获取标题 
            })
        },
        IntroScreen:{
            screen:IntroScreen,
            // navigationOptions:{
            //     title:"修改简介",
            //     headerRight: <Text style={{
            //         marginRight: 12,
            //         textAlign: 'right',
            //         fontSize: 14,
            //         color: '#e60012'
            //     }}>保存</Text>
            // }
        }
    },
    {
      initialRouteName:'EditScreen',//设置初始路由
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#1c2d34',
          height: 46,
          shadowOpacity: 0,
          shadowOffset: {
            height: 0,
          },
          shadowRadius: 0,
          elevation: 0,
        },
        headerTintColor: '#fe728c',
        headerTitleStyle: {
          fontSize: 14,
          textAlign: 'center',
          color: '#6792a3',
          fontWeight: 'normal',
          flex: 1,
          textAlign: 'center'
        },
        headerRight: <View></View>,
      }
    }
)