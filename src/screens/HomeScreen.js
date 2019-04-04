import React from 'react';
import { StyleSheet,Animated ,Dimensions , Image , Text,Easing ,TouchableOpacity,   View } from 'react-native';
import SplashScreen from '../components/Splash';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,

} from 'react-native-responsive-screen';


const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
import { WebBrowser  , Constants} from 'expo';


const TWITTER = 1;
const LINKEDIN = 2;
const GITHUB = 3;
const profileCardHeight = 80;

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
      startFadingProfile: false,
      mode: null,
  }
  
  componentWillMount(){
    this.setState({mode: 'LOGOUT'});
    this.animSplashTop = new Animated.Value(0)
  }

  componentDidMount(){
     this.animateSplashTop(1)
  }
  animateSplashTop = (to)=>{
     
      Animated.timing(this.animSplashTop , {
          toValue: to,
          duration: 500
          }).start(()=>{
              if(to==0){
                this.setState({mode: 'LOGOUT'});
                this.setState({startFadingProfile: true});

              }
          
          });
      
  }

  handleLinkPress = (link)=>{
    switch(link){
      case TWITTER:
      WebBrowser.openBrowserAsync(
        "https://twitter.com/maeen_badea"
      );
      break;
      case LINKEDIN:
      WebBrowser.openBrowserAsync(
        "https://www.linkedin.com/in/maeen-alikarrar"
      );
      break;
      case GITHUB:
      WebBrowser.openBrowserAsync(
        "https://github.com/MaeenBadea"
        );
      break;
      default:
      break;
    }
  }





  render() {
    const splashTop = this.animSplashTop.interpolate({
      inputRange: [0,1 ],
      outputRange: [ -HEIGHT, -(2*HEIGHT-profileCardHeight-Constants.statusBarHeight) ]
    })
    return (
      <View style={styles.container}>
           

        <View styles= {[styles.homescreenContainer ]}>

          <View style={[styles.subContainer]}>
            <TouchableOpacity style = {[styles.button, {backgroundColor: '#00acee'}]}
                                                                  onPress= {()=>this.handleLinkPress(TWITTER)}>
                <Image style = {styles.icon} source={require('../../assets/images/twitter.png')}></Image>
                <Text  style = {styles.buttonText}>check my Twitter account</Text>
            </TouchableOpacity>

            <TouchableOpacity style = {[styles.button, {backgroundColor: '#4875B4'}]} 
                                                          onPress= {()=>this.handleLinkPress(LINKEDIN)}>
                <Image style = {styles.icon} source={require('../../assets/images/linkedin.png')}></Image>
                <Text  style = {styles.buttonText}>check my Linkedin account</Text>
            </TouchableOpacity>

            <TouchableOpacity style = {[styles.button, {backgroundColor: 'black'}]}
                                                          onPress= {()=>this.handleLinkPress(GITHUB)}>
                <Image style = {styles.icon} source={require('../../assets/images/github.png')}></Image>
                <Text  style = {styles.buttonText}>check my Github account</Text>
            </TouchableOpacity>

            <TouchableOpacity style = {styles.logoutButton} onPress ={()=>this.animateSplashTop(0)}>
                <Text style = {styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>

         

        </View>
        {/*
        <SplashScreen height=  {HEIGHT} top ={splashTop}
                                        mode = {this.state.mode} startFading={this.state.startFadingProfile}/>
                                        
              this is how the splash looked at first , but for some weird reason the startFading prop wasn't 
              being fed to AccountHeader hence the fadeout animation couldn't start,,, although i checked t-
              -he values in splashScreen                         
                                        
                                        */}
        {!this.state.startFadingProfile&&<SplashScreen height=  {HEIGHT} top ={splashTop}
                         navigation= {this.props.navigation} mode = {this.state.mode} startFading={false}/>}
         {this.state.startFadingProfile&&<SplashScreen height=  {HEIGHT} top ={splashTop}
                         navigation= {this.props.navigation} mode = {this.state.mode} startFading={true}/>}                     
      
      </View>
    );
  }

 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  homescreenContainer:{
    flex:1,
    width: WIDTH, 
    height: HEIGHT,
    position: 'absolute',
  },
  subContainer:{
    height: HEIGHT,
    justifyContent: 'center',
    alignItems:'center'

  },
  button:{
    flexDirection:'row',
    margin: 4,
    width: wp('85%'),
    elevation: 5,
    borderRadius: 3,
    alignItems:'center'

  },
  icon:{
    width: 32,
    height:32,
    marginRight: 5, 
    marginLeft:5

  },
  buttonText:{
    fontSize:20,
    fontWeight: 'bold',
    padding: 5,
    color: 'white'
  },

  logoutButton:{
    borderWidth: 5 ,
    borderRadius: 10,
    borderColor: '#0077B5',
    elevation: 1,
    justifyContent: 'center',
    alignItems:'center',
    marginTop: 50,
  },
  logoutText:{
      fontSize:30,
      fontWeight: 'bold',
      padding: 5,
  }
});
