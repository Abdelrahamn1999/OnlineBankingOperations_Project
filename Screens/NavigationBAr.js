import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
// Screens
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import SettingScreen from './SettingScreen';
import AccountScreen from './AccountScreen';
import { createStackNavigator } from '@react-navigation/stack';

//Screen names
const homeName = "Home";
const detailsName = "Details";
const settingsName = "Settings";
const accountname = "Acocunt";

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

function HomeScreenStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name='HomeScreen' component={HomeScreen} />
    </Stack.Navigator>
  );
}

function AccountScreenStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name='AccountScreen' component={AccountScreen} />
    </Stack.Navigator>
  );
}

function DetailsScreenStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name='DetailsScreen' component={DetailsScreen} />
    </Stack.Navigator>
  );
}

function SettingScreenStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name='SettingScreen' component={SettingScreen} />
    </Stack.Navigator>
  );
}


function NavigationBAr() {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: 'lightgray', borderRadius: 40, },
        headerTitleStyle: { marginHorizontal: 140, fontSize: 25, fontWeight: 'bold', fontFamily: 'sans-serif' },
        tabBarShowLabel: true,
        tabBarStyle: { backgroundColor: 'lightgray', height: 69, borderRadius: 40, },
        tabBarLabelStyle: { fontSize: 12, paddingBottom: 5, },
        tabBarInactiveTintColor: 'gray',
        tabBarActiveTintColor: 'black',
      }}>

        

      <Tab.Screen name={homeName} component={HomeScreenStack}
        options={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === detailsName) {
              iconName = focused ? 'alert-circle' : 'alert-circle-outline';

            } else if (rn === settingsName) {
              iconName = focused ? 'settings' : 'settings-outline';

            } else if (rn === accountname) {
              iconName = focused ? 'person' : 'person-outline';

            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          }


        })
        }
      />
     
      <Tab.Screen name={accountname} component={AccountScreenStack}
        options={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === detailsName) {
              iconName = focused ? 'alert-circle' : 'alert-circle-outline';

            } else if (rn === settingsName) {
              iconName = focused ? 'settings' : 'settings-outline';

            } else if (rn === accountname) {
              iconName = focused ? 'person' : 'person-outline';

            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          }


        })
        } />

<Tab.Screen name={detailsName} component={DetailsScreenStack}
        options={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === detailsName) {
              iconName = focused ? 'alert-circle' : 'alert-circle-outline';

            } else if (rn === settingsName) {
              iconName = focused ? 'settings' : 'settings-outline';

            } else if (rn === accountname) {
              iconName = focused ? 'person' : 'person-outline';

            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          }


        })
        } />
        
      <Tab.Screen name={settingsName} component={SettingScreenStack}
        options={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === detailsName) {
              iconName = focused ? 'alert-circle' : 'alert-circle-outline';

            } else if (rn === settingsName) {
              iconName = focused ? 'settings' : 'settings-outline';

            } else if (rn === accountname) {
              iconName = focused ? 'person' : 'person-outline';

            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          }


        })
        } />

    </Tab.Navigator>
  );
}

export default NavigationBAr;