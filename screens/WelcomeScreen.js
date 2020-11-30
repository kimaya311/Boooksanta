import * as React from 'react';
import{TouchableOpacity,
    KeyboardAvoidingView,
    View,StyleSheet,
    TextInput,Text,
    Alert,
    Modal,
    ScrollView} from 'react-native';
import db from '../config';
import firebase from 'firebase'
export default class WelcomeScreen extends React.Component{
 constructor(){
     super();
     this.state={
         emailID:'',
         password:'',
         isModalVisible:false,
         FirstName:'',
         MiddleName:'',
         LastName:'',
         Contact:null,
         Address:'',
         confirmedPassword:''
     }
 }
 signup =(emailID,password,confirmedPassword)=>{
    if(password !== confirmedPassword){
        return Alert.alert('Check your password')
    }else {
    firebase.auth().createUserWithEmailAndPassword(emailID, password)
    .then((response) => {
     return Alert.alert("User ID added successfully")
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage)
      return Alert.alert(errorMessage)
    });
    db.collection('Users').add(
        {FirstName:this.state.FirstName,
        MiddleName:this.state.MiddleName,
        LastName:this.state.LastName,
        Contact:this.state.Contact,
        Address:this.state.Address}
    )
    }  
 }

 login =(emailID,password)=>{
    firebase.auth().signInWithEmailAndPassword(emailID, password)
    .then((response) => {
        this.props.navigation.navigate('Donate');
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      return Alert.alert(errorMessage)
    });
 }
 showModal =()=>{
return (
         <Modal
         animationType="fade"
         transparent={true}
         visible={this.state.isModalVisible}>
            <View style={styles.modalContainer}>
                <ScrollView style={{width:'100%'}}>
                    <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
                      <Text style={styles.modalTitle}> Registeration </Text>
                        <TextInput style={styles.formTextInput} placeholder={'FirstName'} maxLength={8}
                         onChangeText={(text)=>{
                            this.setState({
                            FirstName:text
                            })
                        }}/>
                        <TextInput style={styles.formTextInput} placeholder={'MiddleName'} maxLength={8}
                         onChangeText={(text)=>{
                            this.setState({
                            MiddleName:text
                            })
                        }}/>
                        <TextInput style={styles.formTextInput} placeholder={'LastName'} maxLength={8}
                         onChangeText={(text)=>{
                            this.setState({
                            LastName:text
                            })
                        }}/>
                        <TextInput style={styles.formTextInput} placeholder={'Contact'} maxLength={10} 
                        keyboardType={'numeric'}
                        onChangeText={(text)=>{
                            this.setState({
                                Contact:text
                            })
                        }}/>
                        <TextInput style={styles.formTextInput} placeholder={'Address'} maxLength={8}
                        onChangeText={(text)=>{
                            this.setState({
                                Address:text
                            })
                        }}/>
                        <TextInput style={styles.formTextInput} placeholder={'EmailID'} 
                        keyboardType={'email.address'}
                        onChangeText={(text)=>{
                            this.setState({
                                emailID:text
                            })
                        }}/>
                        <TextInput style={styles.formTextInput} placeholder={'Password'} maxLength={8}
                        secureTextEntry={true}
                        onChangeText={(text)=>{
                            this.setState({
                                password:text
                            })
                        }}/>
                        <TextInput style={styles.formTextInput} placeholder={'Confirm Password'} maxLength={8}
                        secureTextEntry={true}
                        onChangeText={(text)=>{
                            this.setState({
                                confirmedPassword:text
                            })
                        }}/>
                            <View style={styles.modalButton}>
                                <TouchableOpacity style={styles.registerButton} onPress={()=>{
                                    this.signup(this.state.emailID,this.state.password,this.state.confirmedPassword);
                                }}>
                                    <Text style={styles.registerButtonText}>  Register </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.modalButton}>
                                <TouchableOpacity style={styles.registerButton} onPress={()=>{
                                    this.setState({
                                        isModalVisible:false
                                    })
                                }}>
                                    <Text style={styles.registerButtonText}>  Cancel </Text>
                                </TouchableOpacity>
                            </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
         </Modal>
)}
 render(){
    return(
     <View>
         <View style={{justifyContent:'center',alignItems:'center'}}>
             {this.showModal()}
         </View>
            <View> 
               <Text style={{textAlign:'center',fontSize:20}}> BOOK SANTA </Text>
            </View>
            <View>
                <TextInput style={styles.loginBox} placeholder="UserName" keyboardType='email-address'
                    onChangeText={(text)=>{
                        this.setState({
                                emailID:text
                            })
                        }}/>
                        <TextInput style={styles.loginBox} placeholder='Enter password' secureTextEntry={true} 
                        onChangeText={(text)=>{
                            this.setState({
                                password:text
                            })
                        }}/>
            </View>
            <View>
                        <TouchableOpacity style={styles.loginButton} onPress={()=>{
                            this.login(this.state.emailID,this.state.password)
                        }}>
                            <Text>  LOGIN  </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.SignButton} onPress={()=>{
                            this.setState({
                                isModalVisible:true
                            })
                        }}>
                            <Text>  SIGN UP  </Text>
                        </TouchableOpacity>
            </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
     flex:1,
     backgroundColor:'#F8BE85',
     alignItems: 'center',
     justifyContent: 'center'
   },
   profileContainer:{
     flex:1,
     justifyContent:'center',
     alignItems:'center',
   },
   title :{
     fontSize:65,
     fontWeight:'300',
     paddingBottom:30,
     color : '#ff3d00'
   },
   loginBox:{
     width: 300,
     height: 40,
     borderBottomWidth: 1.5,
     borderColor : '#ff8a65',
     fontSize: 20,
     margin:10,
     paddingLeft:10
   },
   KeyboardAvoidingView:{
     flex:1,
     justifyContent:'center',
     alignItems:'center'
   },
   modalTitle :{
     justifyContent:'center',
     alignSelf:'center',
     fontSize:30,
     color:'#ff5722',
     margin:50
   },
   modalContainer:{
     flex:1,
     borderRadius:20,
     justifyContent:'center',
     alignItems:'center',
     backgroundColor:"#ffff",
     marginRight:30,
     marginLeft : 30,
     marginTop:80,
     marginBottom:80,
   },
   formTextInput:{
     width:"75%",
     height:35,
     alignSelf:'center',
     borderColor:'#ffab91',
     borderRadius:10,
     borderWidth:1,
     marginTop:20,
     padding:10
   },
   registerButton:{
     width:200,
     height:40,
     alignItems:'center',
     justifyContent:'center',
     borderWidth:1,
     borderRadius:10,
     marginTop:30
   },
   registerButtonText:{
     color:'#ff5722',
     fontSize:15,
     fontWeight:'bold'
   },
   cancelButton:{
     width:200,
     height:30,
     justifyContent:'center',
     alignItems:'center',
     marginTop:5,
   },
  
   button:{
     width:300,
     height:50,
     justifyContent:'center',
     alignItems:'center',
     borderRadius:25,
     backgroundColor:"#ff9800",
     shadowColor: "#000",
     shadowOffset: {
        width: 0,
        height: 8,
     },
     shadowOpacity: 0.30,
     shadowRadius: 10.32,
     elevation: 16,
     padding: 10
   },
   buttonText:{
     color:'#ffff',
     fontWeight:'200',
     fontSize:20
   }
  })