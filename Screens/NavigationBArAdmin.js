import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
// Screens
import HomeScreenAdmin from './HomeScreenAdmin';
import DetailsScreen from './DetailsScreen';
import SettingScreen from './SettingScreen';
import AccountScreen from './AccountScreen';
import TransactionsScreen from './TranactionsScreen';
import { createStackNavigator } from '@react-navigation/stack';

//Screen names
const homeName = "HomeAdmin";
const detailsName = "DetailsAdmin";
const transactionName = "TransactionsAdmin";
const accountname = "AcocuntAdmin";


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeScreenStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name='HomeScreenAdmin' component={HomeScreenAdmin} />
    </Stack.Navigator>
  );
}

// function AccountScreenStack() {
//   return (
//     <Stack.Navigator
//       screenOptions={{ headerShown: false }}>
//       <Stack.Screen name='AccountScreen' component={AccountScreen} />
//     </Stack.Navigator>
//   );
// }

function DetailsScreenStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name='DetailsScreen' component={DetailsScreen} />
    </Stack.Navigator>
  );
}

function TransactionsScreenStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name='TransactionsScreen' component={TransactionsScreen} />
    </Stack.Navigator>
  );
}


function NavigationBArAdmin() {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#1B1A17', borderRadius: 40, },
        headerTitleStyle: { marginHorizontal: 140, fontSize: 25, fontWeight: 'bold', fontFamily: 'sans-serif' ,color:'#E6D5B8' },
        tabBarShowLabel: true,
        tabBarStyle: { backgroundColor: '#1B1A17', height: 69, borderRadius: 40, },
        tabBarLabelStyle: { fontSize: 12, paddingBottom: 5, },
        tabBarInactiveTintColor: 'white',
        tabBarActiveTintColor: '#E45826',
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

            } else if (rn === transactionName) {
              iconName = focused ? 'settings' : 'settings-outline';

            // } else if (rn === accountname) {
            //   iconName = focused ? 'person' : 'person-outline';

            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          }


        })
        }
      />
     
      {/* <Tab.Screen name={accountname} component={AccountScreenStack}
        options={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === detailsName) {
              iconName = focused ? 'alert-circle' : 'alert-circle-outline';

            } else if (rn === transactionName) {
              iconName = focused ? 'settings' : 'settings-outline';

            } else if (rn === accountname) {
              iconName = focused ? 'person' : 'person-outline';

            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          }


        })
        } /> */}

<Tab.Screen name={detailsName} component={DetailsScreenStack}
        options={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === detailsName) {
              iconName = focused ? 'alert-circle' : 'alert-circle-outline';

            } else if (rn === transactionName) {
              iconName = focused ? 'settings' : 'settings-outline';

            // } else if (rn === accountname) {
            //   iconName = focused ? 'person' : 'person-outline';

            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          }


        })
        } />
        
      <Tab.Screen name={transactionName} component={TransactionsScreenStack}
        options={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === detailsName) {
              iconName = focused ? 'alert-circle' : 'alert-circle-outline';

            } else if (rn === transactionName) {
              iconName = focused ? 'settings' : 'settings-outline';

            // } else if (rn === accountname) {
            //   iconName = focused ? 'person' : 'person-outline';

            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          }


        })
        } />

    </Tab.Navigator>
  );
}

export default NavigationBArAdmin;