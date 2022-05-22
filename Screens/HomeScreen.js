//import liraries
import React, { Component } from 'react';
import { useState, useEffect } from "react";

import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { db } from "../firebase";
import { doc, getDoc } from 'firebase/firestore/lite';



let balance = '100.000';

// create a component
const HomeScreen = ({ navigation }) => {
  const [signIN, setsignIN] = useState(true);
  const [N, setN] = useState(" ");
  const [Bal, setBal] = useState(" ");



  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("LoginScreen")
      })
      .catch((error) => alert(error.message))
  }


  let ID = auth.currentUser?.uid;
  const docRef = doc(db, "Users", ID.toString());
  getDoc(docRef).then((doc) => {
    setN(doc.get('name'));
    setBal(doc.get('balance'));
  })
    .catch(() => { console.log("NO doc") })





  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity 
        onPress={handleSignOut}
        style={styles.logOut_btn}>
        <Text style={{ color: '#E6D5B8', }}>Log Out</Text>
      </TouchableOpacity>

      <View style={styles.headerView}>
        <Text style={{
          marginLeft: 10, marginTop: 10, fontSize: 18
          , fontSize: 18, fontStyle: 'italic', color: '#E6D5B8',
          fontWeight: 'normal',
        }}>Welcome :
          <Text style={{ fontSize: 20, fontStyle: 'italic', color: '#E6D5B8', fontWeight: 'bold', }}>
            {N} </Text></Text>

      </View>

      <ScrollView style={ {marginBottom : 25,} }>
      
     

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
          {Bal} $</Text>
      </View>

      <View style={{ flexDirection: 'row', }}>
        <View style={styles.component_parts}>
          <TouchableOpacity
            onPress={() => navigation.navigate("SendMoneyScreen")}>
            <Image source={require('../assets/mobile-money-transfer.png')}
              style={{ marginTop: 25, marginHorizontal: '20%', width: '56%', height: '56%', }} />
            <Text
              style={styles.buttonText}>
              Sending Money</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.component_parts}>
          <TouchableOpacity
            onPress={() => navigation.navigate("RequestMoneyScreen")}>
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
            onPress={() => navigation.navigate("InvestmentCertificateScreen")} >
            <Image source={require('../assets/legal-contract-paper.png')}
              style={{ marginTop: 20, marginHorizontal: '17%', width: '66%', height: '50%', }} />
            <Text
              style={styles.buttonText}>
              Investment Certificates</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.component_parts}>
          <TouchableOpacity
            onPress={() => navigation.navigate("LoanScreen")}>
            <Image source={require('../assets/mobile-phone-bill-paid.png')}
              style={{ marginTop: 22, marginHorizontal: '16%', width: '70%', height: '50%', }} />
            <Text
              style={styles.buttonText}>
              Requesting a loan</Text>
          </TouchableOpacity>
        </View>

      </View>


      </ScrollView>

    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'white',

  },

  balance_part: {
    width: '90%',
    height: 130,
    backgroundColor: '#F0A500',
    marginHorizontal: '5%',
    borderRadius: 10,
  },

  component_parts: {
    marginTop: 30,
    width: '42%',
    height: 180,
    backgroundColor: '#F0A500',
    marginHorizontal: '4%',
    borderRadius: 30,
    alignItems: 'center',
  },

  logOut_btn: {
    width: 120,
    height: 50,
    backgroundColor: '#1B1A17',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginLeft: '65%',
    marginBottom: 30,
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
    flexDirection: 'row',
    backgroundColor: '#E45826',
    marginBottom: 30,
    borderRadius: 10,
    marginHorizontal: '5%',
    height: 50,
  }

});

//make this component available to the app
export default HomeScreen;
