import * as React from 'react';
import LottieView from 'lottie-react-native';

export default class SantaAnime extends React.Component{
     render(){
         return(
             <LottieView source = {require('../assets/SantaAnime.json')} style={{width:'60%'}}
             autoPlay loop/>
         )
     }
}