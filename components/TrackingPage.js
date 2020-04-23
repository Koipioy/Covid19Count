import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import {TrackingInfo} from './TrackingInfo'
import {TrackedSummaryPage} from './TrackedSummaryPage'

export const TrackingPage = ({navigation}) => {
    
    
    const Stack = createStackNavigator();
        
    return (
        <SafeAreaProvider style={styles.root}>  
            <Stack.Navigator headerMode="none">
                <Stack.Screen name="Tracking" component={TrackingInfo} navigation={navigation} cardStyle={styles.card} />         
                <Stack.Screen name="Summary" component={TrackedSummaryPage} navigation={navigation} />                      
            </Stack.Navigator>         
            {/* <View style={styles.root}></View> */}
        </SafeAreaProvider>        
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
                      
        backgroundColor: '#141414',
    },
    card: {
        
    }
})