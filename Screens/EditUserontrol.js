//import liraries
import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Image, View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore/lite';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore/lite';

import { StatusBar } from 'expo-status-bar';


import { useState } from "react";
import { ScrollView } from 'react-native-gesture-handler';

// create a component
const EditUserontrol = ({ navigation }) => {

    const [CurrentUserID, setCurrentUserID] = useState("");
    const [secNumber, setsecNumber] = useState("");
    const [N, setN] = useState("");
    const [P, setP] = useState(" ");
    const [E, setE] = useState(" ");
    const [Addr, setAddr] = useState(" ");
    const [G, setG] = useState(" ");
    const [AccN, setAccN] = useState(" ");
    const [Bal, setBal] = useState(" ");
    const [IDuser, setIDuser] = useState(" ");
    //console.log(date, " /", month, " / ", year, "  ", hour, " : ", minute, " : ", second)


    const [Nnew, setNnew] = useState(N);
    const [Pnew, setPnew] = useState(P);
   // const [Enew, setEnew] = useState(E);
    const [Addrnew, setAddrnew] = useState(Addr);
    const [Gnew, setGnew] = useState(G);
    const [AccNnew, setAccNnew] = useState(AccN);
    const [Balnew, setBalnew] = useState(Bal);



    let ID = auth.currentUser?.uid;
    const docRef = doc(db, "Admin", ID.toString());
    getDoc(docRef).then((doc) => {
        setCurrentUserID(doc.get('currentUserControlID'));
        //  console.log('---> ',CurrentUserID ,typeof(CurrentUserID));
    })
        .catch(() => console("NO Admin doc"));



    const userRef = collection(db, "Users");
    const q = query(userRef, where("securityNumber", "==", CurrentUserID));
    getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            setN(doc.get('name'));
            setP(doc.get('phone'));
            setAccN(doc.get('accountNumber'));
            setE(doc.get('email'));
            setG(doc.get('gender'));
            setBal(doc.get('balance'));
            setAddr(doc.get('address'));
            setIDuser(doc.id);
            setsecNumber(doc.get('securityNumber'));
        });
    }).catch(() => console("Invaliiiiid"))






    const EditUser = () => {
        if (Nnew == " ") {
            Alert.alert('Warning', "Invalid Name", [
                { text: 'ok' }
            ]);
        }

        else if (AccNnew == " ") {
            Alert.alert('Warning', "Invalid account number", [
                { text: 'ok' }
            ]);
        }

        else if (Pnew == " ") {
            Alert.alert('Warning', "Invalid phone", [
                { text: 'ok' }
            ]);
        }

        else if (Addrnew == " ") {
            Alert.alert('Warning ', "Invalid Adress", [
                { text: 'ok' }
            ]);
        }

        else if (Gnew == " ") {
            Alert.alert('Warning ', "Invalid Gender", [
                { text: 'ok' }
            ]);
        }

        else if (Balnew == " " && Balnew < 0) {
            Alert.alert('Warning ', "The amount should be more than 1$", [
                { text: 'ok' }
            ]);
        }

        else {
            Alert.alert('Successful Editing ', '', [
                { text: 'done' }
            ]);

            updateDoc(doc(db, "Users", IDuser), {
                name: Nnew,
                accountNumber: AccNnew,
                address: Addrnew,
                balance: Balnew,
                gender: Gnew,
                phone: Pnew,
                });



            // console.log( typeof(reciverBal)  ,reciverBal , typeof(parseInt(reciverBal))  , amount , typeof(parseInt(amount)) );

        }
    }



    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor='rgba(0,0,0,0)' />

            <View style={styles.inputview0}>
                <Text style={styles.txtHeader}>Edit User </Text>
                <Text
                    style={{
                        fontSize: 22, fontStyle: 'italic', color: '#F0A500', fontWeight: 'bold',
                        fontFamily: 'serif', marginTop: 5,
                    }}> {E} </Text>
            </View>


            <ScrollView style={{ width: '100%' }}>
                <View style={{ flexDirection: 'row', marginTop: 40, marginBottom: 20, }}>
                    <Text style={styles.txt}>Name :           </Text>
                    <View style={styles.inputview1}>
                        <TextInput
                            placeholder='Enter the Username'
                            style={styles.textinput}
                            placeholderTextColor="rgba(0,0,0,0.3)"
                            type="text"
                            onChangeText={(text) => {
                                setNnew(text);
                            }}
                        // value = {reciverAccountNumberValid}
                        >
                            <Text> {N}</Text>
                        </TextInput>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 40, marginBottom: 20, }}>
                    <Text style={styles.txt}>Acco. num :   </Text>
                    <View style={styles.inputview1}>
                        <TextInput
                            placeholder='Enter the account number'
                            style={styles.textinput}
                            placeholderTextColor="rgba(0,0,0,0.3)"
                            type="numeric"
                            keyboardType='numeric'
                            onChangeText={(text) => {
                                setAccNnew(text);
                            }}
                        // value = {reciverAccountNumberValid}
                        >
                            <Text> {AccN}</Text>
                        </TextInput>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 40, marginBottom: 20, }}>
                    <Text style={styles.txt}>Phone :          </Text>
                    <View style={styles.inputview1}>
                        <TextInput
                            placeholder='Enter the phone'
                            style={styles.textinput}
                            placeholderTextColor="rgba(0,0,0,0.3)"
                            type="numeric"
                            keyboardType='numeric'
                            onChangeText={(text) => {
                                setPnew(text);
                            }}
                        // value = {reciverAccountNumberValid}
                        >
                            <Text> {P}</Text>
                        </TextInput>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 40, marginBottom: 20, }}>
                    <Text style={styles.txt}>Address :       </Text>
                    <View style={styles.inputview1}>
                        <TextInput
                            placeholder='Enter the Address'
                            style={styles.textinput}
                            placeholderTextColor="rgba(0,0,0,0.3)"
                            type="text"
                            onChangeText={(text) => {
                                setAddrnew(text);
                            }}
                        // value = {reciverAccountNumberValid}
                        >
                            <Text> {Addr}</Text>
                        </TextInput>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 40, marginBottom: 20, }}>
                    <Text style={styles.txt}>Gender :       </Text>
                    <View style={styles.inputview1}>

                        <TextInput
                            placeholder='Enter the gender'
                            style={styles.textinput}
                            placeholderTextColor="rgba(0,0,0,0.3)"
                            type="text"
                            onChangeText={(text) => {
                                setGnew(text);
                            }}
                        // value = {reciverAccountNumberValid}
                        >
                            <Text> {G}</Text>
                        </TextInput>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 40, marginBottom: 20, }}>
                    <Text style={styles.txt}>Balance :      </Text>
                    <View style={styles.inputview1}>
                        <TextInput
                            placeholder='Enter the Balance'
                            style={styles.textinput}
                            placeholderTextColor="rgba(0,0,0,0.3)"
                            type="numeric"
                            keyboardType='numeric'
                            onChangeText={(text) => {
                                setBalnew(text);
                            }}
                        // value = {reciverAccountNumberValid}
                        >
                            <Text> {Bal}</Text>
                        </TextInput>
                    </View>


                </View>
            </ScrollView>

            <TouchableOpacity
                style={styles.btn}
                onPress={EditUser}>
                <Text style={styles.btnText} > Edit  </Text>
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
        marginTop: 40,
    },
    inputview0: {
        flexDirection: 'column',
        backgroundColor: 'rgba(0,0,0,0)',
        marginVertical: 40,
        marginBottom: 30,
        height: 80,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        //  borderWidth: 1,
        borderColor: 'black',
    },
    inputview1: {
        backgroundColor: 'rgba(0,0,0,0)',
        marginLeft: 10,
        marginVertical: 5,
        height: 60,
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#F0A500',
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
        fontSize: 18,
    },

    btnText: {
        color: '#E6D5B8',
        fontSize: 30,
        fontFamily: 'sans-serif',
        textAlign: 'center',
    },
    btn: {
        paddingTop: 10,
        flexDirection: 'row',
        marginTop: 20,
        marginLeft: '25%',
        marginBottom: 40,
        backgroundColor: '#1B1A17',
        height: 70,
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
        fontSize: 16,
        fontStyle: 'italic',
        color: '#E45826',
        fontWeight: 'normal',
        fontFamily: 'serif',
        marginLeft: 15,
        marginTop: 15,
        marginBottom: 7,
    },

    txtHeader: {
        fontSize: 20,
        fontStyle: 'italic',
        color: '#E45826',
        fontWeight: 'normal',
        fontFamily: 'serif',
        marginLeft: 15,
        marginTop: 15,
        marginBottom: 7,
    },

});

//make this component available to the app
export default EditUserontrol;
