import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Button, TextInput, Image, } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { ScrollView } from "react-native-gesture-handler";
import {  auth, db } from "../firebase";
import { doc, getDoc } from 'firebase/firestore/lite';
import { useState } from "react";




// let balance = '';
// let n = " ";
// let email = '';
// let address = '';
// let gender = '';
// let accountNumber = '';
// let phone = '';





const AccountScreen = ({ navigation }) => {

    const [N, setN] = useState(" ");
    const [P, setP] = useState(" ");
    const [E, setE] = useState(" ");
    const [Addr, setAddr] = useState(" ");
    const [G, setG] = useState(" ");
    const [AccN, setAccN] = useState(" ");
    const [Bal, setBal] = useState(" ");
    
    

    const handlename = (v) => {
        setN(v);
      };

      let ID = auth.currentUser?.uid ; 
      const docRef =doc(db, "Users", ID.toString() ) ;
      getDoc(docRef) .then ((doc) => {
    //    console.log(" document data:", doc.data() ,"......", doc.get('name') , '........',typeof(ID) ,typeof(ID.toString()) ,ID.toString() );
        setN(doc.get('name'));
        setP(doc.get('phone'));
        setAccN(doc.get('accountNumber'));
        setE(doc.get('email'));
        setG(doc.get('gender'));
        setBal(doc.get('balance'));
        setAddr(doc.get('address'));
      })
      .catch(() => console("NO doc")) 

    //   const {
    //       accountNumber,
    //       address,
    //       balance,
    //       email,
    //       gender,
    //       name,
    //       phone            
    //     } = docSnap.data();

        
    //      console.log("name :", name);
    // //       handlename();


   

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor='rgba(0,0,0,0)' />
            <View style={{ marginTop: 20, marginLeft: 30, borderBottomColor: 'rgba(0,0,0,0.4)', borderBottomWidth: 1.3, }}>
                <Text style={{ fontSize: 18, color: 'rgba(0,0,0,0.4))' }}> Info. : </Text>
            </View>
            <ScrollView style={{ width: '100%', marginTop: 40, marginBottom: 30, }}>

                <View style={styles.inputview0}>
                    <Text style={styles.txt}>Name : </Text>
                    <Text
                        style={{
                            fontSize: 28, fontStyle: 'italic', color: 'rgb(0,0,0)', fontWeight: 'normal',
                            fontFamily: 'serif', marginLeft: 20, marginTop: 5,
                        }}> {N} </Text>
                </View>
                <View style={styles.border} ></View>


                <View style={styles.inputview1}>
                    <Text style={styles.txt}>Email : </Text>
                    <Text
                        style={{
                            fontSize: 28, fontStyle: 'italic', color: 'rgb(0,0,0)', fontWeight: 'normal',
                            fontFamily: 'serif', marginLeft: 20, marginTop: 5,
                        }}>{E} </Text>
                </View>
                <View style={styles.border} ></View>


                <View style={styles.inputview1}>
                    <Text style={styles.txt}>Phone : </Text>
                    <Text
                        style={{
                            fontSize: 28, fontStyle: 'italic', color: 'rgb(0,0,0)', fontWeight: 'normal',
                            fontFamily: 'serif', marginLeft: 20, marginTop: 5,
                        }}>{P} </Text>
                </View>
                <View style={styles.border} ></View>


                <View style={styles.inputview1}>
                    <Text style={styles.txt}>Accounbt number : </Text>
                    <Text
                        style={{
                            fontSize: 28, fontStyle: 'italic', color: 'rgb(0,0,0)', fontWeight: 'normal',
                            fontFamily: 'serif', marginLeft: 20, marginTop: 5,
                        }}>{AccN} </Text>
                </View>
                <View style={styles.border} ></View>


                <View style={styles.inputview1}>
                    <Text style={styles.txt}>Gender : </Text>
                    <Text
                        style={{
                            fontSize: 28, fontStyle: 'italic', color: 'rgb(0,0,0)', fontWeight: 'normal',
                            fontFamily: 'serif', marginLeft: 20, marginTop: 5,
                        }}>{G} </Text>
                </View>
                <View style={styles.border} ></View>


                <View style={styles.inputview1}>
                    <Text style={styles.txt}>Address : </Text>
                    <Text
                        style={{
                            fontSize: 28, fontStyle: 'italic', color: 'rgb(0,0,0)', fontWeight: 'normal',
                            fontFamily: 'serif', marginLeft: 20, marginTop: 5,
                        }}>{Addr} </Text>
                </View>
                <View style={styles.border} ></View>


                <View style={styles.balance_part}>
                    <Text
                        style={styles.txt}>
                        Balance :</Text>

                    <Text
                        style={{
                            fontSize: 50, fontStyle: 'italic', color: 'rgb(0,0,0)', fontWeight: 'normal',
                            fontFamily: 'serif', marginLeft: 15, marginTop: 5,
                        }}>
                        {Bal} $</Text>
                </View>

            </ScrollView>

            {/* <TouchableOpacity
                style={{
                    marginLeft: 20, marginTop: 5, marginBottom: 50,
                }}
                onPress={GetData}>
                <Text>GetData</Text>
            </TouchableOpacity> */}


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0)",
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    inputview1: {

        backgroundColor: 'rgba(0,0,0,0)',
        marginHorizontal: 20,
        marginTop: 50,
        height: 50,
        width: '90%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',

    },

    inputview0: {

        backgroundColor: 'rgba(0,0,0,0)',
        marginHorizontal: 20,
        height: 50,
        width: '90%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',

    },


    border: {
        marginTop: 40,
        borderRadius: 40,
        borderWidth: 0.5,
        borderColor: 'black',
        width: '90%',
        marginHorizontal: '5%'
    },
    balance_part: {
        marginTop: 50,
        width: '90%',
        height: 110,
        backgroundColor: 'rgba(0,0,0,0.15)',
        marginHorizontal: '5%',
        borderRadius: 10,
    },
    FieldTXT: {
        fontSize: 20,
        fontStyle: 'italic',
        color: 'rgb(0,0,0)',
        fontWeight: 'normal',
        fontFamily: 'serif',
        marginLeft: 5,
        marginTop: 5,
        paddingRight: 40,
        paddingLeft: 25,
        fontSize: 25,
        marginBottom: 10,
    },
    txt: {
        fontSize: 15,
        fontStyle: 'italic',
        color: 'rgba(0,0,0,0.6)',
        fontWeight: 'normal',
        fontFamily: 'serif',
        marginLeft: 5,
        marginTop: 5,
        paddingRight: 40,
        paddingLeft: 25,
        marginBottom: 7,
    },
    FieldTXTBalance: {
        fontSize: 50,
        fontStyle: 'italic',
        color: 'rgb(0,0,0)',
        fontWeight: 'normal',
        fontFamily: 'serif',
        marginLeft: 5,
        marginTop: 5,
        paddingRight: 40,
        paddingLeft: 25,
        fontSize: 25,
        marginBottom: 10,
    },
});


export default AccountScreen;
