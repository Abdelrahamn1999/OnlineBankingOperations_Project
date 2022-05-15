//import liraries
import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Image, View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc} from 'firebase/firestore/lite';
import { collection, query, where, getDocs,writeBatch } from 'firebase/firestore/lite';

import { StatusBar } from 'expo-status-bar';


import { useState } from "react";

// create a component
const SendMoneyScreen = ({ navigation }) => {

    const batch = writeBatch(db);

    const [accNumber, setaccNumber] = useState("");
    const [accNumberValid, setaccNumberValid] = useState("0000");

    const [securityNumber, setsecurityNumber] = useState("");
    const [securityNumberValid, setsecurityNumberValid] = useState("0000");

    const [reciverAccountNumber, setreciverAccountNumber] = useState("000");
    const [reciverAccountNumberValid, setreciverAccountNumberValid] = useState("0000");

    const [amount, setamount] = useState("0000");
    const [Bal, setBal] = useState("000");
    const [reciverBal, setreciverBal] = useState("000");
const [reciverID ,setreciverID]=useState("");






    let ID = auth.currentUser?.uid;
    const docRef = doc(db, "Users", ID.toString());
    getDoc(docRef).then((doc) => {
        setaccNumber(doc.get('accountNumber'));
        setsecurityNumber(doc.get('securityNumber'));
        setBal(doc.get('balance'));
    }).catch(() => console("NO doc"))


    const userRef = collection(db, "Users");
    const q = query(userRef, where("accountNumber", "==", reciverAccountNumberValid));
    getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            setreciverAccountNumber(doc.get('accountNumber'));
            setreciverBal(doc.get('balance'));
            setreciverID(doc.id)
        });
    }).catch(() => console("Invaliiiiid"))







    const Verfication = () => {
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

        else if (securityNumberValid != securityNumber) {
            Alert.alert('Warning', "Invalid security key", [
                { text: 'ok' }
            ]);
        }

        else if (parseInt(amount) >= 50000 && parseInt(amount) < 0 ) {
            Alert.alert('Warning : wrong amount', "The amount should be betwwen 1 to 50k", [
                { text: 'ok' }
            ]);
        }

        else if (parseInt(amount) >= parseInt(Bal)) {
            Alert.alert('Warning : wrong amount', "The amount should be less than your balance", [
                { text: 'ok' }
            ]);
        }

        else {
            Alert.alert('Successful operation ', '', [
                { text: 'done' }
            ]);

            updateDoc(doc(db, "Users", ID.toString()), {
                balance: (parseInt(Bal) - parseInt(amount)).toString()
            });

            updateDoc(doc(db, "Users", reciverID.toString()), {
                balance: (parseInt(reciverBal) + parseInt(amount)).toString()
            });


           // console.log( typeof(reciverBal)  ,reciverBal , typeof(parseInt(reciverBal))  , amount , typeof(parseInt(amount)) );
            navigation.replace("NavigationBAr");
        }


    }



    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor='rgba(0,0,0,0)' />

            <Image source={require('../assets/Sendmoney.png')}
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
            <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 15, }} >
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}> Hint : </Text>
                <Text style={{ fontSize: 15, marginTop: 5, }}>  The amount should not exceed $100k </Text>
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


            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 60, }}>
                <View style={styles.inputview2}>
                    <TextInput
                        style={styles.textinput}
                        placeholder="Enter Your Secutity Key"
                        placeholderTextColor="rgba(0,0,0,0.3)"
                        type="password"
                        secureTextEntry={true}
                        onChangeText={(text) => {
                            setsecurityNumberValid(text);
                        }}
                    />
                </View>

                <TouchableOpacity
                    style={styles.btn}
                    onPress={Verfication}>
                    <Text style={styles.btnText} > Send </Text>
                    <Ionicons name={'send-outline'} size={20} color={'white'} />
                </TouchableOpacity></View>

            <View style={styles.balance_part}>
                <Text
                    style={styles.txt}>
                    Balance :</Text>

                <Text
                    style={{
                        fontSize: 40, fontStyle: 'italic', color: 'rgb(0,0,0)', fontWeight: 'normal',
                        fontFamily: 'serif', marginLeft: 10,
                    }}>
                    {Bal} $</Text>
            </View>

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
    inputview1: {
        backgroundColor: 'rgba(0,0,0,0)',
        marginHorizontal: '10%',
        marginVertical: 50,
        marginBottom: 0,
        height: 60,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 3,
        borderColor: 'black',
    },

    inputview2: {
        backgroundColor: 'rgba(0,0,0,0)',
        height: 65,
        marginLeft: 30,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        borderWidth: 3,
        borderColor: 'black',
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
        marginTop: 0,
        marginLeft: 10,
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
export default SendMoneyScreen;
