//import liraries
import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Image, View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc} from 'firebase/firestore/lite';
import { collection, query, where, getDocs,writeBatch } from 'firebase/firestore/lite';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import emailjs from '@emailjs/browser';

import { useState } from "react";

// create a component
const RequestMoneyScreen = ({ navigation }) => {

//     const batch = writeBatch(db);

    const [accNumber, setaccNumber] = useState("");
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [accNumberValid, setaccNumberValid] = useState("");
    
    const [reciverAccountNumber, setreciverAccountNumber] = useState("");
    const [reciverAccountNumberValid, setreciverAccountNumberValid] = useState("");
    const [reciverName, setreciverName] = useState("");
    const [reciverEmail, setreciverEmail] = useState("abdo112ashraf@gmail.com");
    
    const [message, setmessage] = useState("");
    const [amount, setamount] = useState("");
    
   





    let ID = auth.currentUser?.uid;
    const docRef = doc(db, "Users", ID.toString());
    getDoc(docRef).then((doc) => {
        setaccNumber(doc.get('accountNumber'));
        setName(doc.get('name'));
        setEmail(doc.get('name'));
       }).catch(() => console("NO doc"))




       const userRef = collection(db, "Users");
       const q = query(userRef, where("accountNumber", "==", reciverAccountNumberValid));
       getDocs(q).then((querySnapshot) => {
           querySnapshot.forEach((doc) => {
               setreciverAccountNumber(doc.get('accountNumber'));
               setreciverName(doc.get('name'));
               setreciverEmail(doc.get('email'));
                 });
       }).catch(() => console("Invaliiiiid"))





    let templateParams = {
        nameform: Name,
        messageform: message,
        reciverNameform: reciverName,
        reciverEmailform: reciverEmail,
        amountform : amount,
        accNumform:accNumber
    };

    const sendEmail = (e) => {
        e.preventDefault();
        if (accNumberValid != accNumber) {
            Alert.alert('Warning', "Invalid account number", [
                { text: 'ok' }
            ]);
        }

        else if (reciverAccountNumberValid != reciverAccountNumber) {
            Alert.alert('Warning', "Wrong reciver account number", [
                { text: 'ok' }
            ]);
        }

        
        else if (message == null) {
            Alert.alert('Alert', "Please write a description of your request", [
                { text: 'ok' }
            ]);
        }

               else if (parseInt(amount) >= 50000 && parseInt(amount) < 0 ) {
            Alert.alert('Warning : wrong amount', "The amount should be betwwen 1 to 50k", [
                { text: 'ok' }
            ]);
        }

        else {
            Alert.alert('Successful operation ', '', [
                { text: 'done' }
            ]);

           

            emailjs.send('service_cv6730g', 'template_6ypel4m', templateParams, 'd1xTb_weRsbxDVl2x')
              .then((result) => {
                  console.log("Successful ",result.text);
              }, (error) => {
                  console.log("Failed ",error.text);
              });    
    }
        

  console.log("name = " , templateParams.nameform , 'mess : ',templateParams.messageform, " recname = " , templateParams.reciverNameform ,"recEmail = " , templateParams.reciverEmailform );
  console.log(" recname = " , reciverName ,"recaccN = " , reciverAccountNumber  );

}



    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor='rgba(0,0,0,0)' />

            <Image source={require('../assets/request.png')}
                style={styles.Imagebackgrounds}
            />

            <View style={styles.inputview1}>
                <TextInput
                    style={styles.textinput}
                    placeholder="Enter Your Account number"
                    placeholderTextColor="rgba(0,0,0,0.3)"
                    type="numeric"
                    keyboardType='numeric'
                    onChangeText={(text) => {
                        setaccNumberValid(text);
                    }}
                />
            </View>



            <View style={styles.inputview1}>
                <TextInput
                    style={styles.textinput}
                    placeholder="Enter the amount"
                    placeholderTextColor="rgba(0,0,0,0.3)"
                    type="numeric"
                    keyboardType='numeric'
                    onChangeText={(text) => {
                        setamount(text)
                    }}
                />
            </View>
 
            <View style={styles.inputview1}>
                <TextInput
                    style={styles.textinput}
                    placeholder="Enter the reciver Account number"
                    placeholderTextColor="rgba(0,0,0,0.3)"
                    type="numeric"
                    keyboardType='numeric'
                    onChangeText={(text) => {
                        setreciverAccountNumberValid(text);
                    }}

                />
            </View>


               <View style={styles.inputview2}>
                    <TextInput
                        style={styles.textinput1}
                        placeholder="Write a cooment ... "
                        placeholderTextColor="rgba(0,0,0,0.3)"
                        type="text"
                        onChangeText={(text) => {
                            setmessage(text);
                        }}
                    />
                </View>

                <TouchableOpacity
                    style={styles.btn}
                    onPress={sendEmail} >
                    <Text style={styles.btnText} > Send a requset </Text>
                    <Ionicons name={'send-outline'} size={20} color={'white'} />
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
        marginTop  :30,
        height: 60,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 3,
        borderColor: 'black',
    },

    inputview2: {
        marginTop : 20,
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

    textinput: {
        fontFamily: 'sans-serif',
        fontStyle: 'italic',
        borderColor: "black",
        marginTop: 10,
        marginLeft : 20,
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
        marginLeft : 8,
        borderRadius: 10,
        textAlign: "center",
        color: "black",
        fontSize: 16,
    },

    btnText: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'sans-serif',
        textAlign: 'center',
        marginHorizontal: 8,
    },
    btn: {
        paddingTop: 18,
        flexDirection: 'row',
        marginTop: 20,
        marginLeft: 90,
        backgroundColor: 'black',
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
        color: 'rgba(0,0,0,0.6)',
        fontWeight: 'normal',
        fontFamily: 'serif',
        marginLeft: 10,
        marginTop: 15,
        marginBottom: 7,
    },

});

//make this component available to the app
export default RequestMoneyScreen;
