//import liraries
import React, { Component } from 'react';
import { useState ,useEffect } from "react";

import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";



let balance = '100.000';
let Username = 'Abdelrahman';

// create a component
const HomeScreen = ( {navigation} ) => {
  const [signIN, setsignIN] = useState(true);


  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("LoginScreen")
      })
      .catch((error) => alert(error.message))
  }





  return (
    <SafeAreaView style={styles.container}>
      <View style={ styles.headerView }>
      <Text style = { {marginLeft : 10,marginTop : 10, fontSize : 18
         ,fontSize: 18, fontStyle: 'italic', color: 'rgb(0,0,0)', 
         fontWeight: 'normal',} }>Welcome :  {Username}</Text>
      <TouchableOpacity  
        onPress={handleSignOut}
        style={styles.logOut_btn}>
        <Text style = { { color : 'rgb(238,238,238)' ,  } }>Log Out</Text>
      </TouchableOpacity>
      </View>

      <View style={styles.balance_part}>
        <Text
          style={{
            fontSize: 25, fontStyle: 'italic', color: 'rgba(0,0,0,0.6)', fontWeight: 'normal',
            fontFamily: 'serif', marginLeft: 5, marginTop: 5,
          }}>
          Balance :</Text>

        <Text
          style={{
            fontSize: 50, fontStyle: 'italic', color: 'rgb(0,0,0)', fontWeight: 'normal',
            fontFamily: 'serif', marginLeft: 5, marginTop: 5,
          }}>
          {balance}</Text>
      </View>

      <View style={{ flexDirection: 'row', }}>
        <View style={styles.component_parts}>
          <TouchableOpacity
            onPress={() => alert('Sending money')}>
            <Image source={require('../assets/mobile-money-transfer.png')}
              style={{ marginTop: 25, marginHorizontal: '20%', width: '56%', height: '56%', }} />
            <Text
              style={styles.buttonText}>
              Sending Money</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.component_parts}>
          <TouchableOpacity
            onPress={() => alert('requesting money')}>
            <Image source={require('../assets/hand-money-income-note.png')}
              style={{ marginTop: 20, marginHorizontal: '10%', width: '80%', height: '50%', }} />
            <Text
              style={styles.buttonText}>
              Requesting Money</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flexDirection: 'row', }}>
        <View style={styles.component_parts}>
          <TouchableOpacity
            onPress={() => alert('Investment Certificates')}>
            <Image source={require('../assets/legal-contract-paper.png')}
              style={{ marginTop: 20, marginHorizontal: '17%', width: '66%', height: '50%', }} />
            <Text
              style={styles.buttonText}>
              Investment Certificates</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.component_parts}>
          <TouchableOpacity
            onPress={() => alert('Pay Bills')}>
            <Image source={require('../assets/mobile-phone-bill-paid.png')}
              style={{ marginTop: 25, marginHorizontal: '5%', width: '90%', height: '55%', }} />
            <Text
              style={styles.buttonText}>
              Pay Bills</Text>
          </TouchableOpacity>
        </View>

      </View>





    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0)',
  },

  balance_part: {
    width: '90%',
    height: 130,
    backgroundColor: 'rgba(0,0,0,0.15)',
    marginHorizontal: '5%',
    borderRadius: 10,
  },

  component_parts: {
    marginTop: 30,
    width: '42%',
    height: 180,
    backgroundColor: 'rgba(0,0,0,0.15)',
    marginHorizontal: '4%',
    borderRadius: 30,
    alignItems: 'center',
  },

  logOut_btn: {
    width: 100,
    height: 30,
    backgroundColor : 'rgba(0,0,0,0.24)',
    alignItems : 'center',
    justifyContent :'center',
    borderRadius : 10,
    marginLeft : 37,
    marginTop : 10,
  },

  buttonText: {
    fontSize: 18,
    fontStyle: 'italic',
    color: 'rgba(0,0,0,0.6)',
    fontWeight: 'bold',
    fontFamily: 'serif',
    marginLeft: 5,
    marginTop: 15,
  },

  headerView: {
    width: '90%',
    flexDirection : 'row',
    backgroundColor : 'lightgray',
    marginBottom : 30,
    borderRadius : 10,
    marginHorizontal: '5%',
    height : 50,
  }

});

//make this component available to the app
export default HomeScreen;
