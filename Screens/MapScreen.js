import  React from 'react';
import MapView, { Callout, Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions ,Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function MapScreen() {
  return (
    <View style={styles.container}>
      <MapView
      style={styles.map} 
      region = { {
          longitudeDelta : 0,
          latitude: 30.027124,  
          longitude : 31.207319,
          latitudeDelta : 0.5,
      } }
      showsUserLocation ={true}
      showsScale= {true} >
                <Marker coordinate={ { latitude : 30.027124, longitude:31.207319,} } 
                >
                    <Callout tooltip
                     style={{flexDirection : 'column'  , backgroundColor : 'white' , width : 100 , height : 70  , justifyContent :'center' ,alignItems : 'center'}}>
                         <View>
                         <Text>AMA Banque</Text>
                        <Ionicons style={{marginHorizontal : 20,}} name={'navigate-outline'} size={40} color={'black'} />
                         </View>
                    </Callout>
                </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});