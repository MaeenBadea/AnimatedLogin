import React from 'react';
import { StyleSheet, Text,Animated , Dimensions ,  View } from 'react-native';
import AccountHeader from './AccountHeader'

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export default class Splash extends React.Component {

  componentWillMount(){
    this.animLoaderPosition = new Animated.Value(0);
  }

 
  animateLoader = ()=>{
   

    const RIGHT = 60;
    const LEFT = 5;
    this.animLoaderPosition.setValue(LEFT);
    Animated.sequence([
        Animated.timing(this.animLoaderPosition , {
          toValue: RIGHT, 
          duration: 700,
        }),
        Animated.timing(this.animLoaderPosition , {
          toValue: LEFT, 
          duration:700
        })
    ]).start(()=>this.animateLoader());

  }

  componentDidMount(){
     if(this.props.mode=='LOGIN'){this.animateLoader(); }
  }

  renderBottomComponent=()=>{
    let temp;
    const {mode , navigation ,startFading} = this.props;
    switch(mode){
        
        case "LOGIN":
            temp =   
                    <View style = {styles.loader}>
                        <Text style={styles.loaderText}>Getting Data</Text>
                        <Animated.View  style = {[styles.line , {transform: [{translateX:this.animLoaderPosition}]}]}/>
                
                    </View>
                ;
        break;

        case 'LOGOUT':

            temp = <AccountHeader navigation ={navigation} startFading = {startFading}/>

            
        break;
        default:
        
            temp = null;
        break;

    }
    return temp;
    
  }
  render() {

    return (
      <Animated.View  style={[styles.container , {height: this.props.height , top: this.props.top} ]}>

        <View style = {styles.subContainer}>
   
            <View style={styles.iconView}>
                <Text style ={styles.firstName}>Maeen</Text>
                <View style = {styles.secNameContainer}>
                    <Text style= {styles.secName}>Ali Karrar</Text>
                </View>

            </View>
        </View>
        <View style= {styles.subContainer}>
            {this.renderBottomComponent()}
        </View>

      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    backgroundColor: '#00acee',
    alignItems: 'center',
    justifyContent:'center',
    elevation: 5,

  },
  subContainer:{
    flex:1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
 
  iconView:{
    flexDirection: 'row',
    borderRadius:5,
    borderWidth:4,
    borderColor: 'white',
  },
  firstName:{
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginRight: 5,
    marginLeft: 5,
  },
  secNameContainer:{
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secName:{
    color: '#00acee',
    fontSize: 25,
    fontWeight: 'bold',
    marginRight: 5,
    marginLeft: 5,
  },


  loader:{
    flex:1, 
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  loaderText:{
    color: 'white',
    fontWeight: 'bold'
  },
  line:{
    backgroundColor:'white',
    marginTop: 10,
    width: 25,
    height: 3,
  },

});
