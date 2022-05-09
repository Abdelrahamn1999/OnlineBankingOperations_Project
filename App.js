import React, { useEffect , useState } from 'react';
import { View, Text, StyleSheet , Button } from 'react-native';
import 'react-native-gesture-handler';

// import AsyncStorage from '@react-native-async-storage/async-storage';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import OnboardingScrean from './Screens/OnboardingScreen';
import SplashScreen from './Screens/SplashScreen';
import LoginScreen from './Screens/LoginScreen';
import DetailsScreen from './Screens/DetailsScreen';
import NavigationBAr from './Screens/NavigationBAr';
import MapScreen from "./Screens/MapScreen";
import SettingScreen from "./Screens/SettingScreen";




const AppStack = createStackNavigator();


const App =() => {
  // const [firstLanch , setfirstLanch] =useState (null);

  // useEffect ( () =>{
  //   AsyncStorage.getItem('alreadyLaunched').then( (value) => {
  //       if(value ==null) {
  //         AsyncStorage.setItem('alreadyLaunched' , 'true');
  //         setfirstLanch(true);
  //       }
  //       else {
  //         setfirstLanch(false);
  //       }
  //   });
  // },[]);

  // if (firstLanch ==null) {
  //   return null;
  // }
  // else if (firstLanch ==true) {
  //   return (
  //     <NavigationContainer >
  //       <AppStack.Navigator headerMode = "none" >
  //           <AppStack.Screen name='OnboardingScrean' component={OnboardingScrean} />
  //           <AppStack.Screen name='LogInScreen' component={LogInScreen} />
  //       </AppStack.Navigator>
  //     </NavigationContainer>
  //   );
  // }
  // else {
  //   return  <LogInScreen /> ;

  return (
    <NavigationContainer >
      <AppStack.Navigator screenOptions={{headerShown: false}} >
          <AppStack.Screen name='OnboardingScrean' component={OnboardingScrean} />
          <AppStack.Screen name='SplashScreen' component={SplashScreen} />
          <AppStack.Screen name='LoginScreen' component={LoginScreen} />
          <AppStack.Screen name='NavigationBAr' component={NavigationBAr} />
          <AppStack.Screen name='DetailsScreen' component={DetailsScreen} />
          <AppStack.Screen name='MapScreen' component={MapScreen} />
          <AppStack.Screen name='SettingScreen' component={SettingScreen} />

      </AppStack.Navigator>
    </NavigationContainer>
  );

  }
  
      

      




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App ;