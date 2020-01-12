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
export class JokeScreen extends React.Component {
    render() {
      const {navigation}=this.props;
      return (
        <View style={styles.container}>
          <Text>笑话</Text>
          <Button  title="登录/注册" color="#f194ff"  onPress={()=>{navigation.navigate("varify",{number:"13678994788"})}}/>
        </View>
      );
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    
})