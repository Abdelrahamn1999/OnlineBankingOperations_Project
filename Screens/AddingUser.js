import { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, TextInput, } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { auth, db } from "../firebase";
import { onAuthStateChanged, createUserWithEmailAndPassword, updateDoc, doc } from "firebase/auth";




const AddingUser = ({ navigation }) => {
    const [eamil, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [userID, setuserID] = useState("");





    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, eamil, password)
            .then((userCredential) => {
                const user = userCredential.user.uid;
                console.log(user);
                setuserID(user);
                console.log(auth.currentUser.uid);
            })
            .catch(() => alert("Invalid email or password"))
    }

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                updateDoc(doc(db, "Admin", "sf2zL5gZmUY8np87FXhYgyWKQ1q2"), {
                    AddingUser: auth.currentUser.uid,
                });
                navigation.navigate("AddingInfo");
            }
        })

    }, [])


    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor='rgba(0,0,0,0)' />

            <View style={styles.inputview1}>
                <TextInput
                    style={styles.textinput}
                    placeholder="Enter Email"
                    placeholderTextColor="rgba(0,0,0,0.5)"
                    type="Text"
                    onChangeText={(text) => setemail(text)}
                    value={eamil}
                />
            </View>

            <View style={styles.inputview1}>
                <TextInput
                    style={styles.textinput}
                    placeholder="Enter Password"
                    placeholderTextColor="rgba(0,0,0,0.5)"
                    type="password"
                    secureTextEntry={true}
                    onChangeText={(pass) => setpassword(pass)}
                    value={password}
                />
            </View>


            <View style={{ flex: 1, justifyContent: 'flex-start', marginHorizontal: '15%', marginTop: 80 }}>
                <TouchableOpacity
                    onPress={handleSignUp}
                    style={styles.btn}>
                    <Text style={styles.btnText} >Register</Text>
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


export default AddingUser;
