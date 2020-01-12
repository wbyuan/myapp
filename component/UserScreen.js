import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import StorageOpt  from "../datastorage/StorageOpt"
import Toast from 'react-native-root-toast'
//const StorageOpt = require("../datastorage/StorageOpt ")
export class UserScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data:"",
      loaded: false,
      fetched:false,
      noLogin:false,
      assessToken:"",
      
    }
    this.fetchData = this.fetchData.bind(this)
    this.linkEditHome = this.linkEditHome.bind(this)
  }
  componentDidMount() {
    //读取用户本地存储信息
    let _that= this;
    StorageOpt.loaddata("loginState", function (data) {
      if(data!==""){
        _that.setState({
          assessToken: data.assessToken
        })
        _that.fetchData(data)
      }else{
        _that.setState({
          noLogin: true
        })
      }
    })
  }
  fetchData(data){
    //查询用户详细信息

    const uri ="http://192.168.1.100:3000/users/findUserByToken?assessToken=" + data.assessToken
    fetch(uri)
      .then((response) => response.json())
      .then((responseJson) =>{
        console.log(responseJson.user)
        if(responseJson.success){
          this.setState({
            data:responseJson.user,
            fetched:true,
            loaded:true
          })
        }else{
          this.setState({
            loaded:true,
            fetched:false,
          })
        }
      })
      .catch(error=>{
        console.log(error)
    })
  }
  render() {
    if (this.state.noLogin) {
      //未登录
      return this.rendLoginView()
    }else{
      return this.rendUserView()
    }
   
  }
  linkEditHome(){
    const { navigation } = this.props;
    navigation.navigate("EditScreen",{assessToken:this.state.assessToken,title:"编辑资料"})
  }
  rendLoginView() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
            <View style={styles.noLogin}>
              <Text style={styles.title}>欢迎来xx搞笑视频</Text>
              <TouchableOpacity
                style={styles.LoginButton}
                // underlayColor="#fe728c"
                onPress={() => { navigation.navigate("LoginStack") }}>
                <Text style={styles.btnText}>登录/注册</Text>
              </TouchableOpacity>
            </View>
        </View>
      </View>

    );
  }
  failingView(){
    return(
      <View style={{ flex: 1,justifyContent:'center',alignItems:'center',backgroundColor:'#f0f0f0'}}>
        <TouchableOpacity>
          <Icon name="ios-information-circle" size="24" style={{color:"red"}}/>
          <Text style={{color:"#666"}}>加载失败!点击重试</Text>
        </TouchableOpacity>
      </View>
    )
    
  }
  rendUserView(){
    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.UserWrap}>
              <View style={styles.InfoArea}>
                <View style={styles.img}>
                  <Image source={{uri:this.state.data.avatarUrl}} style={{width: 67, height: 67,borderRadius:70}}/>
                </View>
                <View style={styles.info}>
                  <Text style={styles.username}>{this.state.data.nickName}</Text>
                  <Text style={styles.motto}>{this.state.data.intro}</Text>
                  <View style={styles.EditUser}>
                    <TouchableOpacity
                      style={styles.EditButton}
                      onPress={this.linkEditHome}>
                      <Text style={styles.EditText}>编辑资料</Text>
                    </TouchableOpacity>
                </View>
                </View>
                
              </View>
              <View style={styles.InfoFt}>
                <View style={styles.inneritem}>
                  <Text style={styles.number}>0</Text>
                  <Text style={styles.small}>关注</Text>
                </View>
                <View style={styles.line}>
                  
                </View>
                <View style={styles.inneritem}>
                  <Text style={styles.number}>10</Text>
                  <Text style={styles.small}>关注</Text>
                </View>
                <View style={styles.line}>
                  
                </View>
                <View style={styles.inneritem}>
                  <Text style={styles.number}>100</Text>
                  <Text style={styles.small}>关注</Text>
                </View>
              </View>
            </View>
          </View>
      </View>
    )
  }
  loadingView(){
    return (
      <View style={{ flex: 1,justifyContent:'center',alignItems:'center',backgroundColor:'#fff'}}>
        <ActivityIndicator size="large" color="#fe728c" />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row"
  },
  header: {
    flex:1,
    height:150,
  },
  noLogin: {
    height: 150,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 16,
    marginBottom: 25,
  },
  LoginButton: {
    width: 100,
    height: 36,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fe728c"

  },
  btnText: {
    color: '#fff',
    fontSize: 14,
    backgroundColor: 'transparent'
  },
  UserWrap:{
    height:150,
    backgroundColor: "#000",
  },
  InfoArea: {
    flex:1,
    paddingVertical: 10,
    paddingHorizontal: 25,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  img: {
    width: 70,
    height: 70,
    borderColor: "#fff",
    borderWidth: 3,
    marginRight: 10,
    borderRadius: 80,
    justifyContent:"center",
    alignItems:"center"
  },
  info: {
    flex:1,
    marginLeft: 20,
    justifyContent: "center",
  },
  username: {
    color: "#fff",
    fontSize: 16,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  motto:{
    height:20,
    color:"#999",
    fontSize:12,
    overflow:"hidden",
    marginVertical: 5,
  },
  EditUser:{
    height:22
  },
  EditButton:{
    width:80,
    height:20,
    borderWidth:1,
    borderRadius:15,
    borderColor:"#fe728c",
    justifyContent: "center",
    alignItems: "center"
  },
  EditText:{
    color:"#fe728c",
    fontSize:11,
  },
  InfoFt:{
    height:40,
    flexDirection:"row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  line: {
    width: 1,
    height: 16,
    backgroundColor:"#eee",
  },
  inner: {
    flex:1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  inneritem: {
    flex: 1,
    height: 40,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  number: {
    color: "#fff",
    fontSize: 13,
  },
  small: {
    color: "#999",
    fontSize: 12,
  },
  
})