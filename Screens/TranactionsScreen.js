//import liraries
//import liraries
import React, { Component } from 'react';
import { useState, useEffect } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Table, Row, Rows } from 'react-native-table-component';

import { View, Text, StyleSheet, Image, Pressable, TextInput ,Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { db } from "../firebase";
import { doc, getDoc, setDoc, getDocs, collection, addDoc, query, where } from 'firebase/firestore/lite';
// create a component0
const TransactionsScreen = () => {

    const [DataMaster, setDataMaster] = useState([]);
    const [DataFilter, setDataFilter] = useState([]);
    const [search, setsearch] = useState(" ");








    let HeadTable = ['Trans.', 'To', 'From', 'Amount', 'Date'];


    const userRef = collection(db, `Transaction/${auth.currentUser.uid}/Details`);
    useEffect(() => {

        getDocs(userRef).then((querySnapshot) => {
            const newElement = [];
            querySnapshot.forEach((doc) => {
                const { TransactionName, Amount, FromAccountNumber, ToAccountNumber, Date, Clock ,From ,To} = doc.data()
                newElement.push({
                    id: doc.id,
                    TransactionName,
                    Amount,
                    FromAccountNumber,
                    ToAccountNumber,
                    Date,
                    Clock , 
                    From,
                    To,
                })
            })
            setDataFilter(newElement);
            setDataMaster(newElement);
        }).catch(() => { console.log("No Doc") });



    }, []);

    const searchFilter = (text) => {
        if (text) {
            const newData = DataMaster.filter((item) => {
                const itemData = item.TransactionName ? item.TransactionName : "";
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
                    placeholder="Search here ..."
                    placeholderTextColor="rgba(0,0,0,0.3)"
                    type="Text"
                    onChangeText={(text) => {
                        searchFilter(text);
                    }}
                />
            </View>

            <Table borderStyle={{ borderWidth: 1, borderColor: 'black' }}>
                <Row data={HeadTable} style={{ backgroundColor: '#1B1A17' }} textStyle={{ color: '#F0A500', height: 50, marginLeft: 10, marginTop: 10, }} />
            </Table>

            <FlatList
                style={{ height: 200 }}
                data={DataFilter}
                numColumns={1}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => { 
                            Alert.alert( `Operation is "${item.TransactionName}" ` , `\n\nSender  -> ${item.From} \n\nSender account number -> ${item.FromAccountNumber} \n\nReciver -> ${item.To} \n\nReciver account number -> ${item.ToAccountNumber} \n\nAmount -> ${item.Amount} \n\nDate -> ${item.Date} \n\nClock -> ${item.Clock}`, [
                                { text: 'ok' }
                            ]);
                         }}>
                        <View style={{ alignItems: "center", flexDirection: 'row', borderBottomWidth: 1, height: 60 }} >
                            <Text style={{ fontSize: 15, width: '18%', margin: 3, color :'#E45826' }} >{item.TransactionName}</Text>
                            <View style={{ borderWidth: 1, borderColor: 'black', height: '100%' }}></View>

                            <Text style={{ fontSize: 15, width: '19%', margin: 2, paddingLeft: 5, color :'#E45826'}}>{item.To}</Text>
                            <View style={{ borderWidth: 1, borderColor: 'black', height: '100%' }}></View>

                            <Text style={{ fontSize: 15, width: '18%', margin: 2, paddingLeft: 5,color :'#E45826' }}>{item.From}</Text>
                            <View style={{ borderWidth: 1, borderColor: 'black', height: '100%' }}></View>

                            <Text style={{ fontSize: 15, width: '17%', marginLeft: 10 ,color :'#E45826'}}>{item.Amount}</Text>
                            <View style={{ borderWidth: 1, borderColor: 'black', height: '100%' }}></View>

                            <Text style={{ fontSize: 15, width: '18%', marginLeft: 7 ,color :'#E45826'}}>{item.Date}</Text>
                        </View>
                    </TouchableOpacity>
                )} />

            {/* <TouchableOpacity onPress={Verfication} >
            <Text>HHH</Text>
        </TouchableOpacity> */}
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingTop: 20,
        backgroundColor: '#ffffff'
    },
    inputview2: {
        backgroundColor: 'rgba(0,0,0,0)',
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
export default TransactionsScreen;
