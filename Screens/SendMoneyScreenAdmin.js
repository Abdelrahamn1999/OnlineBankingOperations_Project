//import liraries
import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Image, View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore/lite';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore/lite';
import emailjs from '@emailjs/browser';

import { StatusBar } from 'expo-status-bar';


import { useState } from "react";
import { ScrollView } from 'react-native-gesture-handler';

// create a component
const SendMoneyScreenAdmin = ({ navigation }) => {


    const [recivername, setrecivername] = useState("");
    const [mass, setmass] = useState("");

    const [Adminemail, setAdminemail] = useState("");
    const [reciveremail, setreciveremail] = useState("0000");

    const [reciverAccountNumber, setreciverAccountNumber] = useState("000");
    const [reciverAccountNumberValid, setreciverAccountNumberValid] = useState("0000");

    const [amount, setamount] = useState("0000");
    const [Bal, setBal] = useState("000");
    const [reciverBal, setreciverBal] = useState("000");
    const [reciverID, setreciverID] = useState("");

    //console.log(date, " /", month, " / ", year, "  ", hour, " : ", minute, " : ", second)


    let ID = auth.currentUser?.uid;
    const docRef = doc(db, "Admin", ID.toString());
    getDoc(docRef).then((doc) => {
        setAdminemail(doc.get('email'));

    }).catch(() => console("NO doc"))


    // const userRef = collection(db, "Users");
    // const q = query(userRef, where("accountNumber", "==", reciverAccountNumberValid));
    // getDocs(q).then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         setreciverAccountNumber(doc.get('accountNumber'));
    //         setreciverBal(doc.get('balance'));
    //         setreciverID(doc.id)
    //         setreciveremail(doc.get('email'));
    //         setrecivername(doc.get('name'));
    //         setBal(doc.get('balance'));
    //         console.log(reciverAccountNumber)
    //     });
    // }).catch(() => console("Invaliiiiid"))

    const userRef = collection(db, "Users");
    const q = query(userRef, where("accountNumber", "==", reciverAccountNumberValid));
    getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            setreciverAccountNumber(doc.get('accountNumber'));
                    setreciverBal(doc.get('balance'));
                    setreciverID(doc.id)
                    setreciveremail(doc.get('email'));
                    setrecivername(doc.get('name'));
                    setBal(doc.get('balance'));
                    console.log(reciverAccountNumber)
        });
    }).catch(() => console("Invaliiiiid"))



    let templateParams = {
        nameform: Adminemail,
        amountform: amount,
        accNumform: reciverAccountNumber,
        reciverNameform: recivername,
        reciverEmailform: reciveremail,
        messageform: mass,
    };




    const Verfication = (e) => {
        e.preventDefault();
        // if (accNumberValid != accNumber) {
        //     Alert.alert('Warning', "Invalid account number", [
        //         { text: 'ok' }
        //     ]);
        // }

        if (reciverAccountNumberValid != reciverAccountNumber) {
            Alert.alert('Warning', "Wrong reciver account number", [
                { text: 'ok' }
            ]);
              }

        // else if (securityNumberValid != securityNumber) {
        //     Alert.alert('Warning', "Invalid security key", [
        //         { text: 'ok' }
        //     ]);
        // }

        else if (parseInt(amount) >= 50000 && parseInt(amount) < 0) {
            Alert.alert('Warning : wrong amount', "The amount should be betwwen 1 to 50k", [
                { text: 'ok' }
            ]);
        }

        else {
            Alert.alert('Successful operation ', '', [
                { text: 'done' }
            ]);


            updateDoc(doc(db, "Users", reciverID.toString()), {
                balance: (parseInt(reciverBal) + parseInt(amount)).toString()
            });


            emailjs.send('service_l8re8bz', 'template_6ypel4m', templateParams, 'd1xTb_weRsbxDVl2x')
                .then((result) => {
                    console.log("Successful ", result.text);
                }, (error) => {
                    console.log("Failed ", error.text);
                });
            navigation.replace("NavigationBArAdmin");
        };

        // console.log( typeof(reciverBal)  ,reciverBal , typeof(parseInt(reciverBal))  , amount , typeof(parseInt(amount)) );

    }






    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor='rgba(0,0,0,0)' />

            <Image source={require('../assets/Sendmoney.png')}
                style={styles.Imagebackgrounds}
            />

            <View style={styles.inputview0}>
                <Text style={styles.txt}>Admin : </Text>
                <Text
                    style={{
                        fontSize: 20, fontStyle: 'italic', color: 'rgba(0,0,0,0.7)', fontWeight: 'normal',
                        fontFamily: 'serif', marginLeft: 10, marginTop: 5,
                    }}>{Adminemail} </Text>
            </View>


            <ScrollView style={{ width: '100%' }}>

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
                    // value = {reciverAccountNumberValid}
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
                <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 15, }} >
                    <Text style={{ fontSize: 20, fontWeight: 'bold' ,color:'#E45826' }}> Hint : </Text>
                    <Text style={{ fontSize: 15, marginTop: 5,color:'#E45826' }}>  The amount should not exceed $100k </Text>
                </View>



                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 60, }}>
                    <View style={styles.inputview2}>
                        <TextInput
                            style={styles.textinput1}
                            placeholder="Write a cooment ... "
                            placeholderTextColor="rgba(0,0,0,0.3)"
                            type="text"
                            onChangeText={(text) => {
                                setmass(text);
                            }}
                        />
                    </View>
                </View>
            </ScrollView>

            <TouchableOpacity
                style={styles.btn}
                onPress={Verfication} >
                <Text style={styles.btnText} > Send money </Text>
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
        marginHorizontal: '5%',
        marginTop: 30,
        marginBottom: 40,
        height: 60,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
  
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

    inputview1: {
        backgroundColor: 'rgba(0,0,0,0)',
        marginHorizontal: '10%',
        marginVertical: 30,
        marginBottom: 0,
        height: 60,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 3,
        borderColor: '#F0A500',
    },

    inputview2: {

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
        margin: 10,
        flex: 1,
        padding: 2,
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
        marginBottom: 20,
        marginLeft: '30%',
        backgroundColor: 'black',
        height: 58,
        width: '35%',
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
        fontSize: 13,
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
export default SendMoneyScreenAdmin;
