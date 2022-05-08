import { useState ,useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Button, TextInput, Image, } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/core'
import { auth } from "../firebase";
import { signInWithEmailAndPassword ,onAuthStateChanged  } from "firebase/auth";




const LoginScreen = ( {navigation} ) => {
    const [eamil, setemail] = useState("");
    const [password, setpassword] = useState("");
   



    const handleSignIn = () => {
       signInWithEmailAndPassword(auth ,eamil, password)
            .then( (userCredential) => {
                const user = userCredential.user;
            })
            .catch( () => alert("Invalid email or password"))
    }

    useEffect(() => {
      onAuthStateChanged(auth ,user => {
            if (user) {
                navigation.replace("NavigationBAr")
            }
        })

    }, [])


    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor='rgba(0,0,0,0)' />

            <View style={styles.inputview1}>
                <TextInput
                    style={styles.textinput}
                    placeholder="Enter Your Email"
                    placeholderTextColor="rgba(0,0,0,0.5)"
                    type="Text"
                    onChangeText={(text) => setemail(text)}
                    value={eamil}
                />
            </View>

            <View style={styles.inputview1}>
                <TextInput
                    style={styles.textinput}
                    placeholder="Enter Your Password"
                    placeholderTextColor="rgba(0,0,0,0.5)"
                    type="password"
                    secureTextEntry={true}
                    onChangeText={(pass) => setpassword(pass)}
                    value={password}
                />
            </View>


            <TouchableOpacity
                onPress={() => alert('forget my password ')} >
                <Text style={styles.forgetpassowrd}>Forget my password ?! </Text>
            </TouchableOpacity>

            <View style={{ flex: 1, justifyContent: 'flex-start', marginHorizontal: '15%', marginTop: 80 }}>
       <TouchableOpacity
            onPress={handleSignIn}
            style={styles.btn}>
            <Text style={styles.btnText} >Login</Text> 
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


export default LoginScreen;
