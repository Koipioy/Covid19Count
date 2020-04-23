import React, {useState, useContext} from 'react';
import {StyleSheet, Text, Alert} from 'react-native';
import {ListItem} from 'react-native-elements';
import {AsyncStorage} from 'react-native';
import {GlobalContext} from '../global'
import {FormatNumber} from '../utility-functions/FormatNumber'

export const LocationCount = (props) => {

    //const TrackButton = { text : "Track", onPress: pressTrack }
    //const UnTrackButton = { text : "Untrack", onPress: () => pressUntrack()}
    //let itemKey = props.dataSet + "-" + props.itemKey;
    const context = useContext(GlobalContext)

    const clicked = async () => {                      
        //  Checks if key exists
        let hasKey = false;
        await AsyncStorage.getAllKeys().then(keys => {
            for(var i = 0; i < keys.length; i++)
            {
                console.log("Scanning Key: " + keys[i])
                if(String(keys[i]) === props.dataSet + "-" + props.itemKey)
                    hasKey = true;
            }
        });
        
        //  Creates the appropriate alert
        if(!hasKey)
        {
            Alert.alert(props.specificLocation, 'cases: ' + FormatNumber(props.cases) + "\ndeaths: " + FormatNumber(props.deaths) + "\nrecovered: " + FormatNumber(props.recovered), [
                // { text: "Details", onPress: pressDetails },
                { text : "Track", onPress: pressTrack },
                { text: "Cancel" }
            ]);
        } else  
        {
            Alert.alert(props.specificLocation, 'cases: ' + FormatNumber(props.cases) + "\ndeaths: " + FormatNumber(props.deaths) + "\nrecovered: " + FormatNumber(props.recovered), [
                // { text: "Details", onPress: pressDetails },
                { text : "Untrack", onPress: pressUntrack },
                { text: "Cancel" }
            ]);
        }
    }       

    const pressDetails = () => {

    }

    const pressTrack = async () => {
        try {
            console.log(props.dataSet + "-" + props.itemKey)
            await AsyncStorage.setItem(props.dataSet + "-" + props.itemKey, "" + props.index)                 
        }
        catch (error)
        {
            console.log("Error Tracking")
            console.log(error);
        }
    }

    const pressUntrack = async () => {
        try {
            console.log("Trying to remove: " + props.dataSet + "-" + props.itemKey)
            await AsyncStorage.removeItem(props.dataSet + "-" + props.itemKey)        
            if(props.onUntrack != undefined && props.onUntrack != null) 
            {
                console.log("Untracing"); 
                props.onUntrack()
            }
        }
        catch (error)
        {
            console.log("Error Tracking")
            console.log(error);
        }
    }
    
    return (
        <ListItem
            containerStyle={styles.info}
            leftElement={<Text style={styles.name}>{props.location}</Text>}
            rightElement={<Text style={styles.count}>{FormatNumber(props.cases)}</Text>}       
            onPress={clicked}                 
        ></ListItem>
    )
}

const styles = StyleSheet.create({
    root : {    
          
    },
    info : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        backgroundColor: '#2d2d2d',
        margin: 2,      
    },
    name : {
        width : '50%',
        color: 'white',
    },
    count : {
        color: 'white',

    },

})