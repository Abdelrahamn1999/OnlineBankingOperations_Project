//import liraries
import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';



// create a component
const OnboardingScrean = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container} >
      <StatusBar translucent backgroundColor='rgba(0,0,0,0)' />
      <Image source={require('../assets/background1.png')}
        style={styles.Imagebackgrounds}
      />
      <View  >
        <Text style={styles.title}>Welcome to Banque AMA</Text>
        <Text style={styles.paragraph}>Software engineering project using React Native and Firebase</Text>
      </View>

      <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 80 }}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("SplashScreen")}>
          <Text style={styles.btnText} >Get Strated</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>

  );
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  title: {
    marginTop: 60,
    color: 'rgba(0,0,0,0.8)',
    fontSize: 32,
    fontFamily: 'sans-serif-condensed',
    fontStyle: 'italic',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  paragraph: {
    marginTop: 50,
    marginHorizontal: 10,
    color: 'rgba(0,0,0,0.5)',
    fontSize: 23,
    fontFamily: 'sans-serif',
    textAlign: 'center',
  },
  Imagebackgrounds: {
    marginTop: 10,
    height: 320,
    width: '89%',
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
  },
  btnText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'sans-serif',
    textAlign: 'center',
    fontStyle: 'italic',


  },
  btn: {
    backgroundColor: 'black',
    marginHorizontal: 20,
    height: 60,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,


  },

});

//make this component available to the app
export default OnboardingScrean;
