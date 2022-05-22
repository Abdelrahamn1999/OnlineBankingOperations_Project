import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import 'react-native-gesture-handler';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import OnboardingScrean from './Screens/OnboardingScreen';
import SplashScreen from './Screens/SplashScreen';
import LoginScreen from './Screens/LoginScreen';
import DetailsScreen from './Screens/DetailsScreen';
import NavigationBAr from './Screens/NavigationBAr';
import MapScreen from "./Screens/MapScreen";
import SettingScreen from "./Screens/SettingScreen";
import SendMoneyScreen from './Screens/SendMoneyScreen';
import InvestmentCertificateScreen from './Screens/InvestmentCertificateScreen';
import RequestMoneyScreen from './Screens/RequestMoneyScreen';
import ForgetPasswordScreen from './Screens/ForgetPasswordScreen';
import TransactionsScreen from './Screens/TranactionsScreen';
import NavigationBArAdmin from './Screens/NavigationBArAdmin';
import UsersAdminScreen from './Screens/UsersAdminScreen';
import ItemControl from './Screens/ItemControl';
import EditUserontrol from './Screens/EditUserontrol';
import AddingUser from './Screens/AddingUser';
import AddingInfo from './Screens/AddingInfo';
import InvestmentCertificateScreenAdmin from './Screens/InvestmentCertificateScreenAdmin';
import LoanScreen from './Screens/LoanScreen';
import SendMoneyScreenAdmin from './Screens/SendMoneyScreenAdmin';




const AppStack = createStackNavigator();


const App = () => {
 const [firstLanch , setfirstLanch] =useState (null);

  useEffect ( () =>{
    AsyncStorage.getItem('alreadyLaunched').then( (value) => {
        if(value ==null) {
          AsyncStorage.setItem('alreadyLaunched' , 'true');
          setfirstLanch(true);
        }
        else {
          setfirstLanch(false);
       }
    });
  },[]);

  if (firstLanch ==null) {
    return null;
  }
  else if (firstLanch ==true) {
       return (
          <NavigationContainer >
      <AppStack.Navigator screenOptions={{ headerShown: false }} >
        <AppStack.Screen name='OnboardingScrean' component={OnboardingScrean} />
          <AppStack.Screen name='SplashScreen' component={SplashScreen} />
          <AppStack.Screen name='LoginScreen' component={LoginScreen} />
          <AppStack.Screen name='ForgetPasswordScreen' component={ForgetPasswordScreen} />
          <AppStack.Screen name='NavigationBAr' component={NavigationBAr} />
          <AppStack.Screen name='NavigationBArAdmin' component={NavigationBArAdmin} />
          <AppStack.Screen name='DetailsScreen' component={DetailsScreen} />
          <AppStack.Screen name='MapScreen' component={MapScreen} />
          <AppStack.Screen name='SettingScreen' component={SettingScreen} />
          <AppStack.Screen name='SendMoneyScreen' component={SendMoneyScreen} />
          <AppStack.Screen name='RequestMoneyScreen' component={RequestMoneyScreen} />
          <AppStack.Screen name='InvestmentCertificateScreen' component={InvestmentCertificateScreen} />
          <AppStack.Screen name='InvestmentCertificateScreenAdmin' component={InvestmentCertificateScreenAdmin} />
          <AppStack.Screen name='TransactionsScreen' component={TransactionsScreen} />   
          <AppStack.Screen name='UsersAdminScreen' component={UsersAdminScreen} /> 
          <AppStack.Screen name='ItemControl' component={ItemControl} />   
          <AppStack.Screen name='EditUserontrol' component={EditUserontrol} />   
          <AppStack.Screen name='AddingUser' component={AddingUser} /> 
          <AppStack.Screen name='AddingInfo' component={AddingInfo} /> 
          <AppStack.Screen name='LoanScreen' component={LoanScreen} /> 
          <AppStack.Screen name='SendMoneyScreenAdmin' component={SendMoneyScreenAdmin} /> 

      </AppStack.Navigator>
    </NavigationContainer>
    );
  }
  else {
     return (
      <NavigationContainer >
        <AppStack.Navigator screenOptions={{ headerShown: false }} >
        <AppStack.Screen name='LoginScreen' component={LoginScreen} />
          <AppStack.Screen name='ForgetPasswordScreen' component={ForgetPasswordScreen} />
          <AppStack.Screen name='NavigationBAr' component={NavigationBAr} />
          <AppStack.Screen name='NavigationBArAdmin' component={NavigationBArAdmin} />
          <AppStack.Screen name='DetailsScreen' component={DetailsScreen} />
          <AppStack.Screen name='MapScreen' component={MapScreen} />
          <AppStack.Screen name='SettingScreen' component={SettingScreen} />
          <AppStack.Screen name='SendMoneyScreen' component={SendMoneyScreen} />
          <AppStack.Screen name='RequestMoneyScreen' component={RequestMoneyScreen} />
          <AppStack.Screen name='InvestmentCertificateScreen' component={InvestmentCertificateScreen} />
          <AppStack.Screen name='InvestmentCertificateScreenAdmin' component={InvestmentCertificateScreenAdmin} />
          <AppStack.Screen name='TransactionsScreen' component={TransactionsScreen} />   
          <AppStack.Screen name='UsersAdminScreen' component={UsersAdminScreen} /> 
          <AppStack.Screen name='ItemControl' component={ItemControl} />   
          <AppStack.Screen name='EditUserontrol' component={EditUserontrol} />   
          <AppStack.Screen name='AddingUser' component={AddingUser} /> 
          <AppStack.Screen name='AddingInfo' component={AddingInfo} /> 
          <AppStack.Screen name='LoanScreen' component={LoanScreen} /> 
          <AppStack.Screen name='SendMoneyScreenAdmin' component={SendMoneyScreenAdmin} /> 
  
        </AppStack.Navigator>
      </NavigationContainer>
  ); 
}

  // return (
  //   <NavigationContainer >
  //     <AppStack.Navigator screenOptions={{ headerShown: false }} >
  //       <AppStack.Screen name='OnboardingScrean' component={OnboardingScrean} />
  //         <AppStack.Screen name='SplashScreen' component={SplashScreen} />
  //         <AppStack.Screen name='LoginScreen' component={LoginScreen} />
  //         <AppStack.Screen name='ForgetPasswordScreen' component={ForgetPasswordScreen} />
  //         <AppStack.Screen name='NavigationBAr' component={NavigationBAr} />
  //         <AppStack.Screen name='NavigationBArAdmin' component={NavigationBArAdmin} />
  //         <AppStack.Screen name='DetailsScreen' component={DetailsScreen} />
  //         <AppStack.Screen name='MapScreen' component={MapScreen} />
  //         <AppStack.Screen name='SettingScreen' component={SettingScreen} />
  //         <AppStack.Screen name='SendMoneyScreen' component={SendMoneyScreen} />
  //         <AppStack.Screen name='RequestMoneyScreen' component={RequestMoneyScreen} />
  //         <AppStack.Screen name='InvestmentCertificateScreen' component={InvestmentCertificateScreen} />
  //         <AppStack.Screen name='InvestmentCertificateScreenAdmin' component={InvestmentCertificateScreenAdmin} />
  //         <AppStack.Screen name='TransactionsScreen' component={TransactionsScreen} />   
  //         <AppStack.Screen name='UsersAdminScreen' component={UsersAdminScreen} /> 
  //         <AppStack.Screen name='ItemControl' component={ItemControl} />   
  //         <AppStack.Screen name='EditUserontrol' component={EditUserontrol} />   
  //         <AppStack.Screen name='AddingUser' component={AddingUser} /> 
  //         <AppStack.Screen name='AddingInfo' component={AddingInfo} /> 
  //         <AppStack.Screen name='LoanScreen' component={LoanScreen} /> 
  //         <AppStack.Screen name='SendMoneyScreenAdmin' component={SendMoneyScreenAdmin} /> 

  //     </AppStack.Navigator>
  //   </NavigationContainer>
  // );

  
    }







const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;