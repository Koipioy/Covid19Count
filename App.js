import 'react-native-gesture-handler';
import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from './components/Home'


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


export default function App() {
  return (

      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Details" component={Home} options={{title: "DEETS"}} />
          <Tab.Screen name="Home" component={Home} options={{title: "HOME"}} />        
        </Tab.Navigator>
      </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  bottomTab : {
    height: '10%',
    backgroundColor: 'red'
  }
})