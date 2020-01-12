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
//倒计时
import CountDownButton from '../plugin/CountDownButton'
//普通弹框 
import Toast from 'react-native-root-toast'
import StorageOpt  from "../datastorage/StorageOpt"
export class VarifyScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      number:"",
      varifyCode:"",
      _disabled:true,
      countting:true,
      vc:""
    }
    this._onChangeText = this._onChangeText.bind(this)
    this._loginSubmit = this._loginSubmit.bind(this)
  };
  _onChangeText(text){
    console.log(this.state.vc)
    if(text!==""){
      this.setState({
        _disabled:false,
        varifyCode:text
      })
    }else{
      this.setState({
        _disabled:true
      })
    }
  }
 
  componentDidMount(){
    //接收路由传值
    let num = this.props.navigation.state.params.number
    this.setState({
      number:num
    })
    if(num!==""){
      this.setState({
        countting:false
      })
    }
  };
   //获取登录注册验证码
   _sendVarify(){
    let uri = "192.168.1.100:3000/signup/"
    fetch(uri,{
      method:'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: "number=" + this.state.number
    }).
    then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.success ==true){
        //提示发送成功
        Toast.show("验证码发送成功！")
        //保存验证码
        this.setState({
          varifyCode:responseJson.varifyCode
        })
      }
    })
    .catch((error) => {
      Toast.show("验证码发送失败！")
      console.error(error);
    });
  }
  //验证登录/注册
  _loginSubmit(){
    this.setState({
      _disabled:true
    })
    let uri = "http://192.168.1.100:3000/varify/"
    let data= {
      number:this.state.number,
      varifyCode:this.state.varifyCode
    }
    fetch(uri,{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((responseJson => {
      this.setState({
        _disabled:false
      })
      console.log(responseJson)
      if(responseJson.success){
        //把用户信息存储在本地
        let _data = {
          assessToken:responseJson.assessToken,
          expires:null
        }
        StorageOpt.save("loginState",_data)
        const {navigation} = this.props;
        navigation.navigate("User")
      }
    }))
    .catch(error=>{
      Toast.show("验证失败！")
      console.error(error); 
    })
  }
  static navigationOptions = {
    headerTitle:'输入验证码',
    // headerBackTitle:'返回', //静态设置页面返回按钮文字
  };
  render() {
    return (
      <View style={styles.container}>
          <View style={styles.item}>
            <Text style={styles.label}>验证码已发送至 <Text style={styles.number}>{this.state.number}</Text></Text>
          </View>
          <View style={styles.item}>
            <TextInput style={styles.verify} placeholder="请输入验证码" onChangeText={(text)=>this._onChangeText(text)} maxLength={11}/>
          </View>
          <View style={styles.item}> 
            <CountDownButton enable={this.state.number.length}
              style={{width: 150,justifyContent: "flex-start",}}
              textStyle={{color: '#666',fontSize:14}}
              timerCount={60}
              timerTitle={'重新获取'}
              timerActiveTitle={['请在（','s）后重试']}
              onClick={(shouldStartCountting)=>{
                // shouldStartCountting是一个回调函数，根据调用接口的情况在适当的时候调用它来决定是否开始倒计时
                //随机模拟发送验证码成功或失败
                //const requestSucc = Math.random() + 0.5 > 1; 
                shouldStartCountting(this.state.countting)
            },this._sendVarify}/>
          </View>
          <View style={styles.item}>
              <Button style = {styles.btnLogin} 
                disabled={this.state._disabled} title="确定" 
                onPress={this._loginSubmit}
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
      marginBottom:20,
    },
    verify:{
      height:45,
      color:"#222",
      borderBottomColor:"#000",
      borderBottomWidth:1,
    },
    please:{
      fontSize:16,
    },
    label:{
      fontSize:13,
      color:"#999",
    },
    number:{
      fontSize:14,
      color:"#333",
    },
    verifyNumber:{
      marginBottom: 20,
    },
    row: {
      padding: 7,
      backgroundColor: 'red',
      borderRadius: 7,
    },
    tip: {
      fontSize: 20,
    },
    cd: {
      textAlign: 'center',
      color: 'white',
      fontSize: 20,
    },
    btnLogin:{
      height:50,
      backgroundColor:"#f60"
    },
})