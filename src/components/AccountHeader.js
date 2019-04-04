import React from 'react';
import { StyleSheet,Animated ,View } from 'react-native';

import { StackActions, NavigationActions } from 'react-navigation';



const NAME = 'Maeen AliKarrar'; 
const EMAIL = "maeenexample@gmail.com";
export default class ProfileHeader extends React.Component {

  constructor(){
    super(); 
  }

  componentWillMount(){
      this.opacityAnim = new Animated.Value(1);
      this.spinAnim = new Animated.Value(0);
      this.iconShiftAnim = new Animated.Value(0);

  }
  componentDidMount(){
    if(this.props.startFading) this.animate();

  }

  animate= ()=>{

  

    const duration = 1000;
    Animated.parallel([
        Animated.timing(this.opacityAnim , {
            toValue: 0,
            duration
        }),
        Animated.timing(this.spinAnim, {
            toValue:1,
            duration
        }),
        Animated.timing(this.iconShiftAnim , {
            toValue: 100,
            duration
        })

    ]).start(()=>{
        /*
        *
        delete user data from AsyncStorage
        *
        */
      

       const resetAction = StackActions.reset({
         index: 0,
         actions: [NavigationActions.navigate({ routeName: 'login' })],
       });
       this.props.navigation.dispatch(resetAction)    });


  }
  render() {
      const spinAnim = this.spinAnim.interpolate({
        inputRange: [0,1],
        outputRange: ['0deg' , '360deg']
      });

      
    return (
      <View style = {styles.container}>
        <Animated.Image style = {[styles.image , {opacity: this.opacityAnim}]}
                                         source= {require('../../assets/images/me.png')}></Animated.Image>
        <View style = {[styles.details ,]}>
            <Animated.Text style= {[styles.name, {opacity: this.opacityAnim} ]}>{NAME}</Animated.Text>
            <Animated.Text style = {[styles.email, {opacity: this.opacityAnim} ]}>{EMAIL}</Animated.Text>
        </View>

        <Animated.Image source = {require('../../assets/images/settings.png')}
                            style = {[styles.icon , {opacity: this.opacityAnim ,left: this.iconShiftAnim,
                                                transform: [{rotate: spinAnim} ]}]}>
                
        </Animated.Image>
        
      </View>
    );
  }
}

const imageSize = 60;
const styles = StyleSheet.create({
    container: {
        height: 80,
        flexDirection: 'row',
        backgroundColor: '#00acee',
        alignItems: 'center'
    },
    image :{
        width: imageSize,
        height:imageSize,
        resizeMode: 'cover', 
        borderRadius: imageSize/2,

    },
    details:{
        flex: 1,
        marginLeft: 20,
        height: imageSize,
        justifyContent: 'space-around', 

    },
    name: {
        fontSize: 20, 
        color: 'white',
        fontWeight: 'bold', 
    },
    email:{
        color: 'white',
        fontSize: 12,

    },
    icon:{
        width: 32,
        height:32,
        marginRight: 20, 
    }

})
