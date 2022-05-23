//import liraries
import React, { Component } from 'react';
import { useState, useEffect } from "react";

import { View, Text, StyleSheet, Image, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { db } from "../firebase";
import { doc, getDocs, collection ,updateDoc } from 'firebase/firestore/lite';



// create a component
const UsersAdminScreen = ({ navigation }) => {
  const [DataMaster, setDataMaster] = useState([]);
  const [DataFilter, setDataFilter] = useState([]);
  const [search, setsearch] = useState(" ");

  const [itemname, setitemname] = useState("0000");

  const userRef = collection(db, `Users`);
  useEffect(() => {

    getDocs(userRef).then((querySnapshot) => {
      const newElement = [];
      querySnapshot.forEach((doc) => {
        const { name, accountNumber, address, balance, email, gender, phone, securityNumber  } = doc.data()
        newElement.push({
          id: doc.id,
          name,
          accountNumber,
          address,
          balance,
          email,
          gender,
          phone,
          securityNumber ,
        })
      })
      setDataFilter(newElement);
      setDataMaster(newElement);
    }).catch(() => { console.log("No Doc") });

  }, []);


  const searchFilter = (text) => {
    if (text) {
      const newData = DataMaster.filter((item) => {
        const itemData = item.name ? item.name : "";
        const textData = text;
        return itemData.indexOf(textData) > -1;
      })
      setDataFilter(newData);
      setsearch(text);
    }
    else {
      setDataFilter(DataMaster);
      setsearch(text);
    }
  }





  return (
    <View style={styles.container}>

      <View style={styles.inputview2}>
        <TextInput
          style={styles.textinput}
          placeholder="Search user ..."
          placeholderTextColor="rgba(0,0,0,0.3)"
          type="Text"
          onChangeText={(text) => {
            searchFilter(text);
          }}
        />
      </View>

      <FlatList
        style={{ height: 200 }}
        data={DataFilter}
        numColumns={1}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={ () => {
              let ID = auth.currentUser?.uid;
              updateDoc(doc(db, "Admin", ID.toString()), {
                currentUserControlID: item.securityNumber
              });
              navigation.navigate("ItemControl");
            }}
            >
            <View style={styles.UserView} >
              <Image source={require('../assets/login-icon-3042.png')}
                style={{ marginTop: 5, marginRight: 5, marginLeft: 10, width: 70, height: 70, }} />
              <Text style={styles.UserViewText}> {item.name}</Text>
            </View>

          </TouchableOpacity>
        )} />


    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 50,
    backgroundColor: '#ffffff'
  },
  UserView: {
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor: '#E6D5B8',
    width: '90%',
    height: 80,
    marginBottom: 20,
    borderRadius: 20,
  },

  UserViewAdd: {
    flexDirection: 'row',
    alignItems:'flex-start',
    justifyContent:'center',
    marginHorizontal: '25%',
    backgroundColor: 'red',
    width: '50%',
    height: 70,
    marginBottom: 20,
    borderRadius: 20,
  },

  UserViewText: {
    marginTop: 25,
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontFamily: 'serif'
  },

  inputview2: {
    backgroundColor: 'rgba(0,0,0,0)',
    marginTop :30,
    height: 60,
    marginBottom: 30,
    paddingLeft: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#F0A500',
},




});

//make this component available to the app
export default UsersAdminScreen;
