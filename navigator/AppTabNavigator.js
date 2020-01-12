import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { HomeScreen } from '../component/HomeScreen'
import { VideoScreen } from '../component/VideoScreen'
import { AddScreen } from '../component/AddScreen'
import { JokeScreen } from '../component/JokeScreen'
import { UserScreen } from '../component/UserScreen'
import { EditUserStack } from '../navigator/EditUserStack'
//首页路由
const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "Home"
  }
)
//视频路由
const VideoStack = createStackNavigator(
  {
    Video: {
      screen: VideoScreen,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "Video"
  }
)

//录视频路由
const AddStack = createStackNavigator(
  {
    Add: {
      screen: AddScreen,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: 'Add'
  }
)
//笑话路由
const JokeStack = createStackNavigator(
  {
    Joke: {
      screen: JokeScreen,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: 'Joke'
  }
)
//我的路由
const UserStack = createStackNavigator(
  {
    User: {
      screen: UserScreen,
      navigationOptions:{
        header: null,
      }
    },
    Edit: {
      screen: EditUserStack,
      navigationOptions:{
        header: null,
      }
    }
  },
  {
    initialRouteName: "User",
  }
)
//创建BottomTabNavigator
export const TabNavigator = createBottomTabNavigator(
  {
    HomeStack: {
      screen: HomeStack,
      navigationOptions: ({ navigation }) => ({
        title: '首页',//页面标题
        tabBarLabel: '首页',//导航栏该项标题
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name={'ios-bicycle'}
            size={22}
            style={{ color: tintColor }}
          />
        ),
        header: null
      })
    },
    VideoStack: {
      screen: VideoStack,
      navigationOptions: ({ navigation }) => ({
        title: '视频',//页面标题
        tabBarLabel: '视频',//导航栏该项标题
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name={'ios-videocam'}
            size={20}
            style={{ color: tintColor }}
          />
        ),
        header: null
      })
    },
    AddStack: {
      screen: AddStack,
      navigationOptions: ({ navigation }) => ({
        title: '+',//页面标题
        tabBarLabel: '+',//导航栏该项标题
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name={'ios-add'}
            size={20}
            style={{ color: tintColor }}
          />
        ),
        header: null
      })
    },
    JokeStack: {
      screen: JokeStack,
      navigationOptions: ({ navigation }) => ({
        title: '笑话',//页面标题
        tabBarLabel: '笑话',//导航栏该项标题
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name={'md-happy'}
            size={20}
            style={{ color: tintColor }}
          />
        ),
        header: null
      })
    },
    UserStack: {
      screen: UserStack,
      navigationOptions: ({ navigation }) => ({
        title: '我的',//页面标题
        tabBarLabel: '我的',//导航栏该项标题
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name={'md-contact'}
            size={20}
            style={{ color: tintColor }}
          />
        ),
        header: null
      })
    }
  },
  {
    //TabNavigator参数
    tabBarOptions: {
      //当前选中的文本和图标颜色
      activeTintColor: '#fe728c',
      // 当前未选中的文本和图标颜色
      inactiveTintColor: '#666',
      //是否显示图标,默认是false
      showIcon: true,
      //是否显示文本
      showLabel: true,
      //是否将文本转换为大小，默认是true
      upperCaseLabel: false,
      //material design中的波纹颜色(仅支持Android >= 5.0)
      pressColor: '#788493',
      //按下tab bar时的不透明度(仅支持iOS和Android < 5.0).
      pressOpacity: 0.8,
      //tab bar的样式
      style: {
        backgroundColor: '#fff',
        paddingBottom: 1,
        borderTopWidth: 0.2,
        paddingTop: 1,
        borderTopColor: '#ccc',
      },
      //tab bar的文本样式
      labelStyle: {
        fontSize: 13,
        margin: 1
      },
      //tab 页指示符的样式 (tab页下面的一条线).
      indicatorStyle: { height: 0 }
    },
    //tab bar 的位置可选值： 'top' or 'bottom'
    tabBarPosition: 'bottom',
    //是否允许滑动切换tab页
    swipeEnabled: true, //是否在切换tab页时使用动画
    animationEnabled: false,
    //是否懒加载
    lazy: true,
    //返回按钮是否会导致tab切换到初始tab页？ 如果是，则设置为initialRoute，否则为none。 缺省为initialRoute。
    backBehavior: 'none'
  }
);