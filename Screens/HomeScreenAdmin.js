//import liraries
import React, { Component } from 'react';
import { useState ,useEffect } from "react";

import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import {  db } from "../firebase";
import { doc, getDoc } from 'firebase/firestore/lite';



let balance = '100.000';

// create a component
const HomeScreenAdmin = ( {navigation} ) => {
  const [signIN, setsignIN] = useState(true);
  const [N, setN] = useState(" ");
  // const [Bal, setBal] = useState(" ");



  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("LoginScreen")
      })
      .catch((error) => alert(error.message))
  }

  const ID = auth.currentUser.uid;
  const docRef =doc(db, "Admin", ID.toString()) ;
  getDoc(docRef) .then ((doc) => {
    setN(doc.get('name'));
    
   // setBal(doc.get('balance'));
  })
  .catch(() => {console.log("NO doc")}) 





  return (
    <SafeAreaView style={styles.container}>
      <View style={ styles.headerView }>
      <Text style = { {marginLeft : 10,marginTop : 10, fontSize : 18
         ,fontSize: 18, fontStyle: 'italic', color: '#E45826', 
         fontWeight: 'normal',} }>Welcome :  
         <Text style = { {fontSize: 20, fontStyle: 'italic', color: 'rgb(0,0,0)', fontWeight: 'bold',} }> 
          {N} </Text>
           </Text>


      <TouchableOpacity  
        onPress={handleSignOut}
        style={styles.logOut_btn}>
        <Text style = { { color : '#E6D5B8' ,  } }>Log Out</Text>
      </TouchableOpacity>
      </View>

      {/* <View style={styles.balance_part}>
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
          {Bal} $</Text>
      </View> */}

      
        <View style={styles.component_parts}>
          <TouchableOpacity
            onPress={() => navigation.navigate("UsersAdminScreen")}
            style = {{flexDirection : 'row'}}>
            <Image source={require('../assets/login-icon-3042.png')}
              style={{ marginTop: 15, marginLeft: 15,marginRight: 25, width: 70, height: 70, }} />
            <Text
              style={styles.buttonText}>
              Users Control</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.component_parts}>
          <TouchableOpacity
            onPress={() => navigation.navigate("InvestmentCertificateScreenAdmin")}
            style = {{flexDirection : 'row'}}>
            <Image source={require('../assets/legal-contract-paper.png')}
              style={{ marginTop: 15, marginLeft: 15,marginRight: 25, width: 60, height: 65, }} />
            <Text
              style={styles.buttonText}>
              Inv. Certificate </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.component_parts}>
          <TouchableOpacity
            onPress={() => navigation.navigate("SendMoneyScreenAdmin")}
            style = {{flexDirection : 'row'}}>
            <Image source={require('../assets/mobile-money-transfer.png')}
              style={{ marginTop: 15, marginLeft: 15,marginRight: 25, width: 70, height: 70, }} />
            <Text
              style={styles.buttonText}>
              Sending money </Text>
          </TouchableOpacity>
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

  // balance_part: {
  //   width: '90%',
  //   height: 130,
  //   backgroundColor: 'rgba(0,0,0,0.15)',
  //   marginHorizontal: '5%',
  //   borderRadius: 10,
  // },

  component_parts: {
    width: '80%',
    flexDirection : 'row',
    backgroundColor : '#E6D5B8',
    marginBottom : 30,
    borderRadius : 10,
    marginHorizontal: '10%',
    height : 100,
    
  },

  logOut_btn: {
    width: 100,
    height: 30,
    backgroundColor : '#1B1A17',
    alignItems : 'center',
    justifyContent :'center',
    borderRadius : 10,
    marginLeft : 90,
    marginTop : 10,
  },

  buttonText: {
    fontSize: 25,
    fontStyle: 'italic',
    color: '#E45826',
    fontWeight: 'bold',
    fontFamily: 'serif',
    marginLeft: 5,
    marginTop: 30,
  },

  headerView: {
    width: '90%',
    flexDirection : 'row',
    backgroundColor : '#E6D5B8',
    marginBottom : 30,
    borderRadius : 10,
    marginHorizontal: '5%',
    height : 50,
  }

});

//make this component available to the app
export default HomeScreenAdmin;
