//import liraries
import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Image, View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from 'firebase/firestore/lite';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore/lite';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import emailjs from '@emailjs/browser';

import { useState } from "react";
import { ScrollView } from 'react-native-gesture-handler';

// create a component
const LoanScreen = ({ navigation }) => {

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

    const [AdminID, setAdminID] = useState("");



    let date = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    let hour = new Date().getHours();
    let minute = new Date().getMinutes();
    let second = new Date().getSeconds();
    let transactionName = "Loan";






    let ID = auth.currentUser?.uid;
    const docRef = doc(db, "Users", ID.toString());
    getDoc(docRef).then((doc) => {
        setaccNumber(doc.get('accountNumber'));
        setName(doc.get('name'));
        setEmail(doc.get('email'));
    }).catch(() => console("NO doc"))


    const userRef1 = collection(db, "Admin");
    const q1 = query(userRef1, where("name", "==", "Admin"));
    getDocs(q1).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            setAdminID(doc.id)
            setreciverEmail(doc.get('email'));
            setreciverName(doc.get('name'));
        });
    }).catch(() => console("Invaliiiiid"))


    let templateParams = {
        reciverEmailform:reciverEmail,
        from_name : Name,
        reciverNameform:reciverName,
        messageform : message,
        accNumform:accNumber,
        amountform:amount,
    };

    const sendEmail = (e) => {
        e.preventDefault();
        
            Alert.alert('Successful operation ', '', [
                { text: 'done' }
            ]);

            addDoc(collection(db, `Transaction/${AdminID}/Details`), {
                Date: date + "/" + month + "/ " + year,
                Clock: hour + ":" + minute + ": " + second,
                TransactionName: transactionName,
                To: "Admin",
                Amount: amount,
                From: Email,
                ToAccountNumber: reciverAccountNumber,
                FromAccountNumber: accNumber,
            });


            emailjs.send('service_elou417', 'template_vponx4j', templateParams, '0sr466cufLbI8qQrQ')
            .then((result) => {
                console.log("Successful ", result.text);
            }, (error) => {
                console.log("Failed ", error.text);
            });
       


        // console.log("name = ", templateParams.nameform, 'mess : ', templateParams.messageform, " recname = ", templateParams.reciverNameform, "recEmail = ", templateParams.reciverEmailform);
        // console.log(" recname = ", reciverName, "recaccN = ", reciverAccountNumber);

       navigation.replace("NavigationBAr");
    }



    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor='rgba(0,0,0,0)' />

            <Image source={require('../assets/request.png')}
                style={styles.Imagebackgrounds}
            />

  <ScrollView>
  <View style={styles.inputview0}>
                <Text style={styles.txt}>Name: </Text>
                <Text
                    style={{
                        fontSize: 20,  fontStyle: 'italic', color: 'rgba(0,0,0,0.7)', fontWeight: 'normal',
                        fontFamily: 'serif', marginLeft: 10, marginTop: 5,
                    }}>{Name} </Text>
            </View>

            <View style={styles.inputview0}>
                <Text style={styles.txt}>Accounbt number : </Text>
                <Text
                    style={{
                        fontSize: 20, fontStyle: 'italic', color: 'rgba(0,0,0,0.7)', fontWeight: 'normal',
                        fontFamily: 'serif', marginLeft: 10, marginTop: 5,
                    }}>{accNumber} </Text>
            </View>

            <View style={styles.inputview0}>
                <Text style={styles.txt}>Email : </Text>
                <Text
                    style={{
                        fontSize: 20, fontStyle: 'italic', color: 'rgba(0,0,0,0.7)', fontWeight: 'normal',
                        fontFamily: 'serif', marginLeft: 10, marginTop: 5,
                    }}>{Email} </Text>
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


  </ScrollView>
  <TouchableOpacity
                style={styles.btn}
                onPress={sendEmail} >
                <Text style={styles.btnText} > Send a requset </Text>
                <Ionicons name={'send-outline'} size={20} color={'white'} />
            </TouchableOpacity>
            
            </View>



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
    inputview0: {
        flexDirection: 'row',
        backgroundColor: '#E6D5B8',
        marginHorizontal: '6%',
        marginVertical: 30,
        paddingTop : 10,
        marginBottom: 10,
        height: 60,
        width: '90%',
       
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
        borderColor: '#F0A500',
    },

    inputview2: {
        marginTop: 60,
        backgroundColor: 'rgba(0,0,0,0)',
        height: 150,
        marginLeft: 30,
        width: '85%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderRadius: 40,
        borderWidth: 3,
        borderColor: '#F0A500',
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
        marginBottom:40,
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
        marginBottom : 20,
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
        fontSize:15,
        fontStyle: 'italic',
        color: '#F0A500',
        fontWeight: 'normal',
        fontFamily: 'serif',
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 7,
    },

});

//make this component available to the app
export default LoanScreen;
