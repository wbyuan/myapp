import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
} from 'react-native';
import Toast from 'react-native-root-toast'
export class LoginScreen extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        number:"",
        _disabled:true
      }
      this._onChangeText = this._onChangeText.bind(this)
      this._getVerify = this._getVerify.bind(this)

    }
    _onChangeText(inputData){
      this.setState({
        number:inputData
      })
      if(inputData!==""){
        this.setState({
          _disabled:false
        })
      }else{
        this.setState({
          _disabled:true
        })
      }
    }
    _getVerify(){
      let uri = 'http://192.168.1.100:3000/signup/'
      fetch(uri,{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({number:this.state.number})
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.success){
          //发送成功跳转验证
          const { navigation } = this.props;
          navigation.navigate("varify",{number:this.state.number})
        }else{
          Toast.show("验证码发送失败！")
        }
      })
      .catch((error) => {
        Toast.show("验证码发送失败！")
        console.error(error); 
      });
    }
    render() {
      const { navigation } = this.props
      return (
        <View style={styles.container}>
          <View style={styles.item}>
            <TextInput style={styles.number} placeholder="手机号码" onChangeText={this._onChangeText} maxLength={11}/>
          </View>
          <View style={styles.item}>
            <Button style = {styles.btnLogin} 
              disabled={this.state._disabled} title="获取验证码" 
              onPress={this._getVerify}
            />
          </View>         
        </View>
      );
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        flexDirection:"column",
        marginHorizontal:35,
        marginVertical:35,
    },
    item:{
      marginBottom: 30,
    },
    number:{
      height:45,
      color:"#222",
      borderBottomColor:"#000",
      borderBottomWidth:1,
    },
    btnLogin:{
      height:50,
      backgroundColor:"#f60"
    },
})