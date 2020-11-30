import * as React from 'react';
import {Text,View,KeyboardAvoidingView,TouchableOpacity,TextInput, Alert} from 'react-native'
import db from '../config'
import firebase from 'firebase'
import MyHeader from '../components/MyHeader'
export default class RequestScreen extends React.Component {
constructor(){
   super();
    this.state={
        Description:'',
        userId:'',
        bookName:'',
        reasonTorequest:'',

    }
}
createUniqueID =()=>{
return Math.random().toString(36).subString(7)

}   
 addRequest =(bookName,request)=>{
var UserID= this.state.userId
var uniqueId= this.createUniqueID();
db.collection('BookRequests').add({
    userId:UserID,
    UniqueID:uniqueId,
    bookName:bookName,
    reason:request
})
this.setState({
    bookName:'',
    reasonTorequest:''
})
Alert.alert("Book Requested Successfully")
}
    render(){
        return(
<View style={{flex:1}}>
<MyHeader title="Request Book"/>
<KeyboardAvoidingView>
    <TextInput style={styles.formatTextInput} placeholder="Enter Book Name"
    onChangeText={(text)=>{
this.setState({
    bookName:text
})
    }}/>
    <TextInput style={[styles.formatTextInput , {height:300}]} multiline numberOfLines={8} placeholder="Why Do You Need The Book?"
        onChangeText={(text)=>{
            this.setState({
                Description:text
            })
                }}/>
                <TouchableOpacity style={styles.button} onPress={()=>{

                }}>
                    <Text> Request </Text>
                </TouchableOpacity>
</KeyboardAvoidingView>
</View>
        )
    }
}