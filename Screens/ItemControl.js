import { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Alert, ScrollView } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { auth, db } from "../firebase";
import { getDoc, doc, getDocs, collection, query, where,deleteField } from 'firebase/firestore/lite';




const ItemControl = ({ navigation }) => {

    const [CurrentUserID, setCurrentUserID] = useState("");

    const [N, setN] = useState("");
    const [P, setP] = useState(" ");
    const [E, setE] = useState(" ");
    const [Addr, setAddr] = useState(" ");
    const [G, setG] = useState(" ");
    const [AccN, setAccN] = useState(" ");
    const [Bal, setBal] = useState(" ");
    const [IDuser, setIDuser] = useState(" ");



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
        });
    }).catch(() => console("Invaliiiiid"))




// const DeleteF=()=>{
//     updateDoc(doc(db, "Users", IDuser), {
//         name : deleteField(),
//         accountNumber : deleteField(),
//         address: deleteField(),
//         balance: deleteField(),
//         email: deleteField(),
//         gender: deleteField(),
//         phone: deleteField(),
//         securityNumber: deleteField(),
//       });
//       alert("User banned");
// }

    const BanUser = () => {
        Alert.alert('Warning : Ban User', `Are you sure you want to ban ${N}`, [
            { text: 'Yes' , onPress : () =>{     
                 updateDoc(doc(db, "Users", IDuser), {
                    name : deleteField(),
                    accountNumber : deleteField(),
                    address: deleteField(),
                    balance: deleteField(),
                    email: deleteField(),
                    gender: deleteField(),
                    phone: deleteField(),
                    securityNumber: deleteField(),
                  });
                  alert("User banned");
             }},
            { text: 'No' ,onPress : () =>{ console.log("no banning") }}
        ]);
    }


    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor='rgba(0,0,0,0)' />
            <View style={{ marginTop: 20, marginLeft: 30, borderBottomColor: 'rgba(0,0,0,0.4)', borderBottomWidth: 1.3, }}>
                <Text style={{ fontSize: 18, color: '#E45826' }}> Info. : </Text>
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

            <View style={{
                flexDirection: 'row', marginBottom: 40,
            }}
            >
                <TouchableOpacity
                    style={styles.EditButton}
                    onPress={ () =>  navigation.navigate("EditUserontrol")}
                >
                    <Text style={styles.EditButtonText} >Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.EditButton}
                    onPress={BanUser}
                >
                    <Text style={styles.EditButtonText}>Ban</Text>
                </TouchableOpacity>

            </View>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0)",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        marginTop: 40,
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
       marginHorizontal: '5%',
        borderRadius: 10,
        backgroundColor : '#E45826'
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
        fontSize: 18,
        fontStyle: 'italic',
        color: '#F0A500',
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

    EditButton: {
        marginHorizontal: 38,
        backgroundColor: '#1B1A17',
        height: 70,
        width: 120,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    EditButtonText: {
        fontSize:25,
        color: '#E6D5B8'
    },
});


export default ItemControl;

