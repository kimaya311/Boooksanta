
import * as React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import SantaAnime from './components/santa'
import{createAppContainer,createSwitchNavigator} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import WelcomeScreen from './screens/WelcomeScreen';
import RequestScreen from './screens/RequestScreen';
import DonateScreen from './screens/DonateScreen';
export default class App extends React.Component {
 render(){
  return (
    <View style={styles.container}>
       <AppContainer/>
    </View>
  );
 }
}
const tabNavigator=createBottomTabNavigator({
  Request:{screen:RequestScreen ,navigationOptions:{tabBarIcon: <Image source={require('./assets/request-book.png')} style={{width:20 , height:20}}/> ,tabBarLabel:'Book Requests'}},
  Donate:{screen:DonateScreen , navigationOptions: {tabBarIcon: <Image source={require('./assets/request-list.png')} style={{width:20 , height:20}}/> ,tabBarLabel:'Donate Books'}}},

  );
  const SwitchNavigator = createSwitchNavigator({
    WelcomeScreen:{screen:WelcomeScreen},
    tabNavigator:{screen:tabNavigator}
  })
const AppContainer=createAppContainer(SwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
