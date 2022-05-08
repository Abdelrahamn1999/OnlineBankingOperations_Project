import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Button, TextInput, Image, } from "react-native";
import { StatusBar } from 'expo-status-bar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RadioButton ,Switch } from 'react-native-paper';


const SetttingScreen = ({ navigation }) => {

    const [value, setValue] = React.useState('english');


    const [isSwitchOn, setIsSwitchOn] = React.useState(false);

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor='rgba(0,0,0,0)' />
            <View style={{ marginTop: 70, marginLeft: 30, borderBottomColor: 'rgba(0,0,0,0.3)', borderBottomWidth: 1.3, paddingBottom: 8, }}>
                <Text style={{ fontSize: 18, color: 'rgba(0,0,0,0.5)' }}> Performance : </Text>
            </View>

            <View style={styles.inputview1}>
                <Text style={{ paddingRight: 40, paddingLeft: 25, fontSize: 25, }}>Dark mode </Text>
                <Switch
                color="rgb(125,175,255)"
                style ={ {marginLeft : 90, } }
                value={isSwitchOn} onValueChange={onToggleSwitch} />
            </View>
            <View style={styles.border} ></View>

            <Text style={{ fontSize: 25, color: 'rgba(0,0,0,1)',marginLeft : 35,marginTop : 40, }}>  language :</Text>


            <View style={styles.inputview2}>
                <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                    <View style={{ flexDirection: 'row-reverse', alignItems: "center" , }}>
                        <Text style={{paddingLeft: 5, fontSize: 18, }}>English</Text>
                        <RadioButton value="english" 
                        color="rgb(125,175,255)"/>
                    </View>
     
                    <View style={{ flexDirection: 'row-reverse', alignItems: "center" }}>
                    <Text style={{paddingLeft: 11, fontSize: 18, }}>Arabic</Text>
                        <RadioButton value="arabic" 
                        color="rgb(125,175,255)"/>
                    </View>


                </RadioButton.Group>
            </View>

            <View style={styles.border} ></View>


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
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0)',
        marginHorizontal: 20,
        marginTop: 50,
        height: 65,
        width: '90%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',

    },


    inputview2: {
        backgroundColor: 'rgba(0,0,0,0)',
        marginHorizontal: 100,
        marginTop: 20,
        paddingBottom: 19,
        height: 65,
        width: '90%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginBottom: 30,
   
    },

    border:{
        
        borderRadius: 40,
        borderWidth: 0.5,
        borderColor: 'black',
        width:'80%',
        marginHorizontal : '10%'
    }

});


export default SetttingScreen;
