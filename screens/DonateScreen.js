import * as React from 'react';
import {
    Text,
    View,
    KeyboardAvoidingView,
    TouchableOpacity,
    TextInputs,
    FlatList,StyleSheet} from 'react-native'
import { ListItem } from 'react-native-elements';
import MyHeader from '../components/MyHeader';

export default class DonateScreen extends React.Component {
 constructor(){
     super();
     this.state={
         requestedBooks:[]
     }
 }
 getRequestedbookslist =()=>{
     this.requestref=db.collection('BookRequests')
     .onSnapShot((snapShot)=>{
        var bookLists=snapShot.docs.map(document=>document.data())
        this.setState({
            requestedBooks:bookLists
        })
     })
 }
 componentDidMount() {
this.getRequestedbookslist();
 }
 keyExtractor=(item,index)=>{
     index.toString();
 }
 renderItem=({item,i})=>{
return (
    <ListItem key={i} title={item.bookName} subTitle={item.reason} titleStyle={{color:'black', fontWeigth:'bold'}} rightElement={
        <TouchableOpacity style={styles.button}>
            <Text style={{color:'#ffff'}}> View </Text>
        </TouchableOpacity>
    }
    bottomDivider/>
)
 }
    render(){
        return(
<View>
<MyHeader title="Donate Books"/>
<View style={{flex:1}}> 

{  this.state.requestedBooks.length===0? 
    (
        <View style={styles.subContainer}>
            <Text style={{fontSize:20}}> List of all Requested Books</Text>
        </View>
    )
    :(
        <FlatList keyExtractor={this.keyExtractor}
        data={this.state.requestedBooks}
        renderItem={this.renderItem}></FlatList>
    )}

</View>
</View>
        )
    }
}
const styles = StyleSheet.create({
    subContainer: {
    flex:1,
    fontSize:20,
    justifyContent:'center',
    alignItems:'center'
    },
    button: {
    width:100,
    height:100,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'orange',
    shadowColor:'#000',
    shadowOffset:{width:0,heigth:8}
    }
})