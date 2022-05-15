import { useState ,useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, TextInput,Alert } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { auth ,db } from "../firebase";
import { sendPasswordResetEmail  } from "firebase/auth";
import { collection, query, where, getDocs,writeBatch } from 'firebase/firestore/lite';







const ForgetPasswordScreen = ( {navigation} ) => {

    const [accNumber, setaccNumber] = useState("");
    const [accNumberValid, setaccNumberValid] = useState("0000");

    const [Email, setEmail] = useState("");

    const [securityNumber, setsecurityNumber] = useState("");
    const [securityNumberValid, setsecurityNumberValid] = useState("0000");

    

    const userRef = collection(db, "Users");
    const q = query(userRef, where("accountNumber", "==", accNumberValid));
    getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            setaccNumber(doc.get('accountNumber'));
            setsecurityNumber(doc.get('securityNumber'));
            setEmail(doc.get('email'));
              });
    }).catch(() => console("Invaliiiiid"))
   

    const handlepasswordforgotten = (email) => {
        sendPasswordResetEmail(auth ,email);
     }
     

     const Verfication = () => {
        if (accNumberValid != accNumber) {
            Alert.alert('Warning', "Invalid account number", [
                { text: 'ok' }
            ]);
        }

       else if (securityNumberValid != securityNumber) {
            Alert.alert('Warning', "Invalid security key", [
                { text: 'ok' }
            ]);
        }

       else {
            Alert.alert('Done ', 'open your mail to reset the password', [
                { text: 'done' }
            ]);

            sendPasswordResetEmail(
                auth, Email)
                .then(()=> {
                  console.log("Email has been sent")
                })
                .catch((error)=> {
                    console.log("Error sending" ,error.text)
                });

                }


    }


    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor='rgba(0,0,0,0)' />

            <View style={styles.inputview1}>
                <TextInput
                    style={styles.textinput}
                    placeholder="Enter Your Account number"
                    placeholderTextColor="rgba(0,0,0,0.5)"
                    type="Text"
                    onChangeText={(text) => setaccNumberValid(text)}
                />
            </View>

            <View style={styles.inputview1}>
                <TextInput
                    style={styles.textinput}
                    placeholder="Enter Your Security Code "
                    placeholderTextColor="rgba(0,0,0,0.5)"
                    type="password"
                    secureTextEntry={true}
                    onChangeText={(pass) => setsecurityNumberValid(pass)}
                />
            </View>



            <View style={{ flex: 1, justifyContent: 'flex-start', marginHorizontal: '15%', marginTop: 80 }}>
       <TouchableOpacity
            onPress={Verfication}
            style={styles.btn}>
            <Text style={styles.btnText} >Send mail</Text> 
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
        marginTop: 150,
    },
    inputview1: {
        backgroundColor: 'rgba(0,0,0,0)',
        marginHorizontal: 20,
        marginBottom: 40,
        height: 65,
        width: '90%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 40,
        borderWidth: 3,
        borderColor: 'black',
    },
    inputview2: {
        backgroundColor: 'rgba(0,0,0,0)',
        marginHorizontal: 20,
        marginBottom: 35,
        height: 65,
        width: '90%',
        justifyContent: 'flex-start',
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
        padding: 10,
        borderRadius: 10,
        textAlign: "center",
        color: "black",
        fontSize: 16,
    },

    buttonview: {
        margin: 10,
    },
    btnText: {
        color: 'white',
        fontSize: 25,
        fontFamily: 'sans-serif',
        textAlign: 'center',
        fontStyle: 'italic',


    },
    btn: {
        backgroundColor: 'black',
        height: 70,
        width: 280,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,

    },

    forgetpassowrd: {
        marginLeft: 15,
        fontSize: 20,
        color: 'black',
        fontFamily: 'sans-serif',
        textAlign: 'center',
        fontStyle: 'italic',
        borderBottomWidth: 1.5,
        borderBottomColor: 'black',
        paddingBottom: 3,
    },
});


export default ForgetPasswordScreen;
