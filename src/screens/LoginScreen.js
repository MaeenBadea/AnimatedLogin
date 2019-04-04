import React from 'react';
import { StyleSheet,Animated ,Dimensions , Text,Easing ,TouchableOpacity,   View } from 'react-native';
import SplashScreen from '../components/Splash';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  
  } from 'react-native-responsive-screen';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const BUTTON_CONTAINER_HEIGHT = wp('40%');
const SPLASH_BOTTOM = HEIGHT -BUTTON_CONTAINER_HEIGHT;
 

export default class LoginScreen extends React.Component {

    state= {
        tryingToLogin: false,
    }

    constructor(){
        super();
        this.splashHeight = new Animated.Value(HEIGHT);
      }
    
      componentDidMount(){
        this.animate(SPLASH_BOTTOM)
      }
      animate = (val)=>{
    
      
        Animated.timing(this.splashHeight , {
            toValue: val,
            duration: 1000,
            easing: Easing.linear
        }).start(); 
      }
    onPressButton=(loginType)=>{
        //animate to end of screen
        this.animate(HEIGHT);
        //start loader anim
        this.setState({tryingToLogin: true});
        //move to the Home screen
        setTimeout(()=>{        this.props.navigation.navigate('home' , {loginType}
        )  
        this.setState({tryingToLogin: false})

} , 1500);

  
    }

    render() {
      const mode = this.state.tryingToLogin?"LOGIN":null;
      return(
        <View style = {styles.container}>

            <SplashScreen mode = {mode} height ={this.splashHeight}/>

            <Animated.View style= {[styles.buttonsContainer , {top: this.splashHeight}]}>
                 <TouchableOpacity style = {styles.socialButton} onPress ={()=>this.onPressButton("Facebook")} >
                    <Text style = {styles.socialText}>Login with Facebook</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style = {styles.socialButton} onPress ={()=>this.onPressButton("Google")}>
                    <Text style = {styles.socialText}>Login with Google</Text>
                </TouchableOpacity>
            </Animated.View>

        </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    buttonsContainer:{
        height: BUTTON_CONTAINER_HEIGHT,
        width: WIDTH ,
        backgroundColor: 'white',
        position: 'absolute' ,
        justifyContent: 'space-around' ,
        alignItems: 'center'
    },
    socialButton:{
        width: wp('85%'),
        borderWidth: 4 ,
        borderRadius: 8,
        borderColor: '#4875B4',
        elevation: 1,
        justifyContent: 'center',
        alignItems:'center'
    },
    socialText:{
        fontSize:25,
        fontWeight: 'bold',
        padding: 5,
    }

});