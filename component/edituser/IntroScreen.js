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
import Icon from 'react-native-vector-icons/Ionicons';
import Textarea from 'react-native-textarea';
import Toast from 'react-native-root-toast';
export default class IntroScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
      headerTitle:"修改简介",
      headerRight:<TouchableOpacity  onPress = {navigation.getParam("updateUserIntro")}>
        <Text style={{
          marginRight: 15,
          textAlign: 'right',
          fontSize: 14,
          color: '#e60012'
        }}>保存</Text>
      </TouchableOpacity>
    });
    constructor(props){
      super(props)
      this.state = {
        intro:"",
        assessToken:"",
        _disabled:true
      }
      this.updateUserIntro = this.updateUserIntro.bind(this)
    }
    componentDidMount = () => {
      this.props.navigation.setParams({updateUserIntro:this.updateUserIntro})
      let intro = this.props.navigation.state.params.intro
      let assessToken = this.props.navigation.state.params.assessToken
      this.setState({
        intro:intro,
        assessToken:assessToken
      })
    };
    onChange(value){
      if(value!==""){
        this.setState({
          intro:value,
          _disabled:false
        })
      }else{
        this.setState({
          _disabled:true
        })
      }
      
    }
    updateUserIntro(){
      console.log(this.state.intro)
      let uri = "http://192.168.1.100:3000/users/updateUserIntro"
      let data = {
        intro:this.state.intro,
        assessToken:this.state.assessToken
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
        if(responseJson.success){
          //修改成功返回通知组件刷新
          const {navigation} = this.props
          navigation.navigate("EditScreen",{assessToken:this.state.assessToken})
        }
      }))
      .catch(error=>{
        Toast.show("修改失败")
        console.error(error); 
      })
    }
    
    render() {
      return (
        <View style={styles.container}>
          <View style={styles.intro}>
            <Text style={styles.label}>个人简介</Text>
            <Textarea
              containerStyle={styles.textareaContainer}
              style={styles.textarea}
              onChangeText={(value)=>this.onChange(value)}
              defaultValue={this.state.intro}
              maxLength={100}
              placeholder={"说点什么吧！"}
              placeholderTextColor={'#c7c7c7'}
              underlineColorAndroid={'transparent'}
            />
          </View>
        </View>
      );
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    intro:{
      padding: 15,
    },
    label:{
      color:"#666",
      marginBottom:10,
    },
    textareaContainer: {
      height: 150,
      padding: 5,
      backgroundColor: '#fff',
    },
    textarea: {
      textAlignVertical: 'top',  // hack android
      height: 170,
      fontSize: 14,
      color: '#333',
    },
})