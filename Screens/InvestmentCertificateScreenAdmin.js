//import liraries
import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Image, View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from 'firebase/firestore/lite';
import { collection, query, where, getDocs, writeBatch } from 'firebase/firestore/lite';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import emailjs from '@emailjs/browser';
import { RadioButton ,Switch } from 'react-native-paper';

import { useState } from "react";

// create a component
const InvestmentCertificateScreenAdmin = ({ navigation }) => {



    const [AdminID, setAdminID] = useState("");
    const [accNumberAdmin, setaccNumberAdmin] = useState("");
    const [value, setValue] = React.useState("10");
    const [EmailUser, setEmailUser] = useState("");


    const [Amountuser, setAmountuser] = useState("");
    const [bondNumberUser, setbondNumberUser] = useState("");

    const [AdminEmail, setAdminEmail] = useState("");
    const [NameUser, setNameUser] = useState("");
    const [ACCNumberUser, setACCNumberUser] = useState("");
  
  


    let ID = auth.currentUser?.uid;
    const docRef = doc(db, "Admin", ID.toString());
    getDoc(docRef).then((doc) => {
        setaccNumberAdmin(doc.get('accountNumber'));
        setAdminEmail(doc.get('email'))
        setAdminID(doc.id)
    }).catch(() => console("NO doc"))



    const userRef1 =collection(db, `Transaction/${auth.currentUser.uid}/Details`);
    const q1 = query(userRef1, where("To", "==", "Admin"));
    getDocs(q1).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            setAmountuser(doc.get('Amount'))
            setbondNumberUser(doc.get('bondNumber'))
            setNameUser(doc.get('Name'))
            setEmailUser(doc.get('From'))
            setACCNumberUser(doc.get('FromAccountNumber'))
        });
    }).catch(() => console("Invaliiiiid"))


    let templateParams = {
        emailform: EmailUser,
        nameform: NameUser,
        accNumform: ACCNumberUser,
        bondform: bondNumberUser,
        amountform : Amountuser,
    };

    const sendEmail = (e) => {
        e.preventDefault();
              
            Alert.alert('Successful operation ', '', [
                { text: 'done' }
            ]);



            emailjs.send('service_elou417', 'template_5k3wsou', templateParams, '0sr466cufLbI8qQrQ')
                .then((result) => {
                    console.log("Successful ", result.text);
                }, (error) => {
                    console.log("Failed ", error.text);
                });
    


     //   console.log("name = ", templateParams.nameform, 'mess : ', templateParams.messageform, " recname = ", templateParams.reciverNameform, "recEmail = ", templateParams.reciverEmailform);
    //    console.log(" recname = ", reciverName, "recaccN = ", reciverAccountNumber);

    }



    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor='rgba(0,0,0,0)' />



            <View style={styles.inputview3}>
                <Text style={styles.txt}>Admin: </Text>
                <Text
                    style={{
                        fontSize: 28, fontStyle: 'italic', color: 'rgb(0,0,0)', fontWeight: 'normal',
                        fontFamily: 'serif', marginLeft: 20, marginTop: 5,
                    }}>{AdminEmail} </Text>
            </View>
            <View style={styles.inputview3}>
                <Text style={styles.txt}>User : </Text>
                <Text
                    style={{
                        fontSize: 28, fontStyle: 'italic', color: 'rgb(0,0,0)', fontWeight: 'normal',
                        fontFamily: 'serif', marginLeft: 20, marginTop: 5,
                    }}>{EmailUser} </Text>
            </View>
            <View style={styles.inputview3}>
                <Text style={styles.txt}>Amount : </Text>
                <Text
                    style={{
                        fontSize: 28, fontStyle: 'italic', color: 'rgb(0,0,0)', fontWeight: 'normal',
                        fontFamily: 'serif', marginLeft: 20, marginTop: 5,
                    }}>{Amountuser} </Text>
            </View>



            <TouchableOpacity
                style={styles.btn}
                onPress={sendEmail} >
                <Text style={styles.btnText} > Make a certificate </Text>
                <Ionicons name={'send-outline'} size={20} color={'#E6D5B8'} />
            </TouchableOpacity></View>



    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0)",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        marginTop: 60,
    },
    inputview1: {
        backgroundColor: 'rgba(0,0,0,0)',
        marginHorizontal: '10%',
        marginBottom: 10,
        marginTop: 30,
        height: 60,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 3,
        borderColor: 'black',
    },

    inputview2: {
        marginTop: 20,
        backgroundColor: 'rgba(0,0,0,0)',
        height: 150,
        marginLeft: 30,
        width: '85%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderRadius: 40,
        borderWidth: 3,
        borderColor: 'black',
    },

    inputview3: {
        backgroundColor: 'rgba(0,0,0,0)',
        marginHorizontal: 20,
        marginTop: 50,
        marginBottom : 50,
        height: 50,
        width: '90%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',

    },
    inputview4: {
        backgroundColor: 'rgba(0,0,0,0)',
        marginHorizontal: 20,
        marginTop: 50,
        marginBottom : 50,
        height: 50,
        width: '90%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',

   
    },

    textinput: {
        fontFamily: 'sans-serif',
        fontStyle: 'italic',
        borderColor: "black",
        marginTop: 10,
        marginLeft: 20,
        borderRadius: 10,
        textAlign: "center",
        color: "black",
        fontSize: 16,
    },

    textinput1: {
        fontFamily: 'sans-serif',
        fontStyle: 'italic',
        borderColor: "black",
        marginTop: 10,
        marginLeft: 8,
        borderRadius: 10,
        textAlign: "center",
        color: "black",
        fontSize: 16,
    },

    btnText: {
        color: '#E6D5B8',
        fontSize: 18,
        fontFamily: 'sans-serif',
        textAlign: 'center',
        marginHorizontal: 8,
    },
    btn: {
        paddingTop: 18,
        flexDirection: 'row',
        marginTop: 100,
        marginLeft: 90,
        backgroundColor: '#1B1A17',
        height: 58,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderRadius: 20,
    },
    Imagebackgrounds: {
        marginTop: 5,
        marginHorizontal: '35%',
        height: 175,
        width: 175,
    },

    balance_part: {
        flexDirection: 'row',
        marginTop: 30,
        width: '80%',
        height: 60,
        backgroundColor: 'rgba(0,0,0,0.15)',
        marginHorizontal: '10%',
        borderRadius: 10,

    },

    txt: {
        fontSize: 20,
        fontStyle: 'italic',
        color: '#E45826',
        fontWeight: 'normal',
        fontFamily: 'serif',
        marginLeft: 10,
        marginTop: 15,
        marginBottom: 7,
    },

});

//make this component available to the app
export default InvestmentCertificateScreenAdmin;
