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
export default class UpdateScreen extends React.Component {
    constructor(props){
      super(props)
      this.state = {
       
      }
    }
    componentDidMount = () => {
     
    };
    
    render() {
      return (
        <View style={styles.container}>
            <Text>修改昵称</Text>
        </View>
      );
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
    },
   
})