import React, { Component,useCallback } from 'react';
import {  StyleSheet, View, Linking,Button,Text, Image, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';



export default class SplashScreen extends Component  {

  constructor() {
    super();
    this.state = {
      isVisible: true,
    }
  }
  Hide_Splash_Screen = () => {
    this.setState({
      isVisible: false
    });
  }

  componentDidMount() {
    var that = this;
    setTimeout(function () {
      that.Hide_Splash_Screen();
    }, 1300);
  }

  

  render() {
    let Splash_Screen = (
      <View style={styles.LoadingScreanMain}>
        <LottieView source={require('../assets/loading.json')} autoPlay loop />
      </View>
    )
    return (
      <SafeAreaView style={styles.container} >
        <StatusBar translucent backgroundColor='rgba(0,0,0,0)' />
        <Image source={require('../assets/bank-icon-5971.png')}
          style={styles.Imagebackgrounds}
        />

        <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 50, }}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() =>  this.props.navigation.navigate("LoginScreen") }>
            <Text style={styles.btnText} >Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.props.navigation.navigate("DetailsScreen") }>
            <Text style={styles.btnText} > Details on Us</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn}
            onPress={ ()=>{ Linking.openURL('https://google.com')}} >
            <Text style={styles.btnText} > FAQ's</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.props.navigation.navigate("SettingScreen") }>
            <Text style={styles.btnText} > Settings</Text>
          </TouchableOpacity>

        </View>
        {
          (this.state.isVisible === true) ? Splash_Screen : null
        }
      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.002)',

  },

  LoadingScreanMain: {
    justifyContent: 'center',
    flex: 1,
    margin: 10,
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',

  },

  Imagebackgrounds: {
    marginTop : 30, 
    height : 270,
    width:'75%',
    borderBottomLeftRadius : 40,
    borderBottomRightRadius : 40,     
      
          },
  btnText: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'sans-serif',
    textAlign: 'center',
    fontStyle: 'italic',


  },
  btn: {
    backgroundColor: 'rgba(0,0,0,0)',
    marginHorizontal: 20,
    marginBottom :40 ,
    height: 60,
    width: 300,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 40,
    borderBottomWidth : 3,
    borderBottomColor : 'black',


  },
});