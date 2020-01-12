import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { WebView } from 'react-native-webview';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs'; 
export class HomeScreen extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            source :"Platform.OS == 'ios') ? require('../html/nearby.html') : { uri:'file:///android_asset/html/nearby.html'}"
        }
    }
    render() {
        return (
        <View style={styles.container}>
            <WebView 
                // style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}
                // // source = { Platform.OS === 'ios' ?require('../html/nearby.html'):{ uri:'file:///android_asset/aa.html'}}
                // //source={require('../html/nearby.html')}
                // source={{uri:'http://192.168.1.100:3000/nearby'}}
                // originWhitelist={['*']}
                // // source={{html: '<!DOCTYPE html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0,user-scalable=no"></head><body><span>测试</span></body></html>'}}
                // renderLoading="{true}"
                // androiddomStorageEnabled={false}
            />
        </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
      flexDirection: 'row',
    },
    item: {
      textAlign: 'center',
      paddingHorizontal:15
    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    highlight: {
      fontWeight: '700',
    },
  });
  
  