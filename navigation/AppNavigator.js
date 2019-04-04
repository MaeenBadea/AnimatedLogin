import React from 'react';
import {StyleSheet , View} from 'react-native'
import { createAppContainer, createSwitchNavigator , createStackNavigator } from 'react-navigation';
import LoginScreen from '../src/screens/LoginScreen'



import HomeScreen from '../src/screens/HomeScreen'


const RootStack = createStackNavigator({

  login: LoginScreen,
  home: HomeScreen,


  },
  {
      navigationOptions: {
      tabBarVisible: false
      },
      swipeEnabled: false,
      lazy: true ,
      headerMode: 'none',
  });  

const App = createAppContainer(RootStack);

export default App;
