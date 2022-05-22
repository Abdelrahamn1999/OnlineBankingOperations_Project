//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView ,TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';


let p1= '01141860966';
let p2= '0222816287';

let e1= 'abdo45ashraf@gamil.com';

let a1= 'Cairo - Egypt';
// create a component
const DetailsScreen = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar translucent backgroundColor='rgba(0,0,0,0)' />
            <ScrollView>
                <View style={ { marginTop : 8 , marginHorizontal : 70,} }>
                    <Text style={ {paddingLeft : '20%', paddingBottom : 10, fontSize : 35 , fontWeight : 'bold' , borderBottomWidth : 1 , borderBottomColor : 'black' , color:'#F0A500' } } >About US</Text>
                </View>
                <View style={{ marginTop: 40, }}>
                    <Image source={require('../assets/digital-banking.png')}
                        style={{  marginHorizontal: '39%',height: 155, width: 90, }} />
                   <Text style={styles.AboutUStitle}> Banque AMA</Text>
                   <View>
                   <Text style={styles.AboutUSparagraph1}>Software engineering project using React Native and Firebase</Text>
                    <Text style={styles.AboutUSparagraph2}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                         nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                         in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                        nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                        sunt in culpa qui officia deserunt mollit anim id est laborum
                    </Text>
                   </View>
                </View>

                    <View style={ {borderWidth : 1 , borderColor : 'black' , marginTop : 40,} }>
                    </View>


                    <View style={ { marginTop : 25 , marginHorizontal : 70,} }>
                    <Text style={ {paddingLeft : '18%', paddingBottom : 10, fontSize : 35 , fontWeight : 'bold' , borderBottomWidth : 1 , borderBottomColor : 'black' ,color:'#F0A500'} } >Contact US</Text>
                </View>
                <View>
                <View style={{ marginTop: 40, marginLeft:20, flexDirection :'row' }}>
                 <Ionicons name={'call-outline'} size={25} color={'black'} />
                 <Text style={ {paddingLeft : 5 , fontSize : 18, color :'#E45826'} }>Phone :   {p1}  , {'\n'}{'\t\t\t\t\t\t\t\t\t\t'}  {p2}</Text>
                </View>

                <View style={{ marginTop: 20, marginLeft:20, flexDirection :'row' }}>
                 <Ionicons name={'mail-outline'} size={25} color={'black'} />
                 <Text style={ {paddingLeft : 5 , fontSize : 18,color:'#E45826'} }>Email :  {e1}</Text>
                </View>

                <View style={{ marginTop: 30, marginLeft:20, flexDirection :'row' }}>
                 <Ionicons name={'location-outline'} size={25} color={'black'} />
                 <Text style={ {paddingLeft : 5 , fontSize : 18,color:'#E45826'} }>Location :  {a1}</Text>

                 <View style={{width : '33%' ,height:'91%' , marginLeft : 12  ,borderWidth : 2,borderRadius:5 ,backgroundColor:'#EC994B'}}>
                <TouchableOpacity style={{flexDirection : 'row-reverse'}}
                     onPress={ () => navigation.navigate("MapScreen")}>
                          <Ionicons name={'chevron-forward-outline'} size={20} color={'black'} />
                    <Text style={ {color:'#F1EEE9'} }>Show Location</Text>
                </TouchableOpacity>

            </View>

                 </View>
                 

                  

                    
                    



                </View>


            </ScrollView>
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEE',
    },

    AboutUStitle: {
        marginTop: 2,
        color: '#1B1A17',
        fontSize: 30,
        fontFamily: 'serif',
        fontStyle: 'italic',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    AboutUSparagraph1: {
        marginTop: 35,
        marginHorizontal: 30,
        color: '#E45826',
        fontSize: 20,
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    AboutUSparagraph2: {
        marginTop: 10,
        marginHorizontal: 15,
        color: '#E45826',
        fontSize: 18,
        fontFamily: 'sans-serif-condensed',
        textAlign: 'center',
    },
});

//make this component available to the app
export default DetailsScreen;
