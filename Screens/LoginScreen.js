import { useState ,useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, TextInput, } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { auth,db } from "../firebase";
import { signInWithEmailAndPassword ,onAuthStateChanged ,sendPasswordResetEmail  } from "firebase/auth";
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore/lite';



const LoginScreen = ( {navigation} ) => {
    const [eamil, setemail] = useState("");
    const [password, setpassword] = useState("");
   
    const [Admin, setAdmin] = useState( {
        email : "abdo112ashraf@gmail.com",
        id : " "
    } );
    


    const handleSignIn = () => {
       signInWithEmailAndPassword(auth ,eamil, password)
            .then( (userCredential) => {
                const user = userCredential.user;
            })
            .catch( () => alert("Invalid email or password"))
    }


    const userRef = collection(db, "Admin");
    useEffect(() => {
        const q = query(userRef, where("name", "==", "Admin"));
    getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
           setAdmin( {email : doc.get('email') , id:doc.get('id') } );
           console.log('-->',Admin.email)
        });
    }).catch(() => console("Invaliiiiid"))

      onAuthStateChanged(auth ,user => {
            if (user) {
                if(user.email==Admin.email) {
                    navigation.navigate("NavigationBArAdmin")
                }else{
                    navigation.navigate("NavigationBAr")
                }
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
                     onPress={ () => navigation.navigate("ForgetPasswordScreen")}>
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
        backgroundColor: "#F1EEE9",
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
        borderColor: '#EC994B',
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
        borderColor: '#EC994B',
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
        color: '#E6D5B8',
        fontSize: 25,
        fontFamily: 'sans-serif',
        textAlign: 'center',
        fontStyle: 'italic',


    },
    btn: {
        backgroundColor: '#1B1A17',
        height: 70,
        width: 280,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,

    },

    forgetpassowrd: {
        marginLeft: 15,
        fontSize: 20,
        color: '#E45826',
        fontFamily: 'sans-serif',
        textAlign: 'center',
        fontStyle: 'italic',
        borderBottomWidth: 1.5,
        borderBottomColor: '#E45826',
        paddingBottom: 3,
    },
});


export default LoginScreen;
