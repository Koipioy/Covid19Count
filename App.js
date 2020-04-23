import 'react-native-gesture-handler';
import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from './components/Home';
import { SearchPage } from './components/SearchPage';
import { TrackingPage } from './components/TrackingPage';
import { StartScreen } from './components/StartScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


export default function App() {
  return (
      <NavigationContainer>        

        <Tab.Navigator tabBarOptions={{tabStyle : styles.tab, labelStyle : styles.label}}> 
          <Tab.Screen  tabStyle={styles.tab} name="Home" component={Home} options={{title: "Home"}}  />    
          <Tab.Screen  name="Search" component={SearchPage} options={{title: "Search"}} />    
          <Tab.Screen  name="Tracking" component={TrackingPage} options={{title: "Tracking"}} unmountOnBlur={true} />             
        </Tab.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    position: 'absolute',
    backgroundColor: '#141414',
    height: '100%'
  },
  bottomTab : {
    height: '10%',
    backgroundColor: 'red'
  },
  tab: {    
    backgroundColor: '#141414',
    justifyContent: 'center'
  },
  label: {
    fontSize: 15,
  }
})