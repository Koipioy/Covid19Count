import React, {useState, useEffect, useContext} from 'react'
import {LocationCount} from './LocationCount';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Alert, Button } from 'react-native';
import {AsyncStorage} from 'react-native';
import {GlobalContext} from '../global'

export const TrackingInfo = ({navigation}) => {
    
    let [tracked, setTracked] = useState([]);
    const context = useContext(GlobalContext);

    useEffect(() => {        
        const onFocus = navigation.addListener('focus', () => {            
            getTracked()
        });
        console.log("Track Page");
        
    }, [])

    const getTracked = async () => {
        try
        {            
            const keys = await AsyncStorage.getAllKeys();
            const updatedTracked = [];
            for(var i = 0; i < keys.length; i++)
            {
                let index = await AsyncStorage.getItem(keys[i])
                let dataSet = (keys[i].split("-")[0])
                updatedTracked.push({dataSet: dataSet, index: Number(index)});
                //tracked.push({dataSet: dataSet, index: Number(index)})
                console.log(tracked === null || tracked === undefined);
                
                console.log(tracked.length);  
                //setTracked(tracked = tracked.push({dataSet: dataSet, index: Number(index)}));  
            }
            setTracked(updatedTracked);
            
        } catch (error)
        {

        }        
    }

    return ( 
        <View stye={styles.root}>         
            <View>
                <Button title="Summary" onPress={() => navigation.navigate('Summary')}></Button>
            </View>   
            <SafeAreaView style={styles.locationContainer}>              
                <ScrollView>
                {                  
                    tracked.map(trackInfo => {
                        if (trackInfo.dataSet === 'countries')
                        {
                            //  If you are tracking from the countries dataset
                            const data = context.countries[trackInfo.index];
                            return(<LocationCount key={data.itemKey} location={data.location} specificLocation={data.specificLocation} 
                                cases={data.cases} recovered={data.recovered} deaths={data.deaths}
                                itemKey={data.itemKey} dataSet={data.dataSet} index={data.index} onUntrack={getTracked}></LocationCount>)                               
                        } else if (trackInfo.dataSet === "locations") {
                            //  If you are tracking from the locations dataset
                            const data = context.locations[trackInfo.index];
                            const key = data.location + "" + data.specificLocation
                            return(<LocationCount key={key} location={(data.specificLocation === '') ? data.location : (data.location + ', ' + data.specificLocation)} specificLocation={data.specificLocation} 
                                    cases={data.cases} recovered={data.recovered} deaths={data.deaths}
                                    itemKey={data.itemKey} dataSet={data.dataSet} index={data.index} onUntrack={getTracked}></LocationCount>)
                        } else 
                            return(<LocationCount key={"NULL"} location={"NULL"} cases={"NULL"} specificLocation={"NULL"}></LocationCount>)        
                    })
                }            
                </ScrollView>
            </SafeAreaView>
        </View>
    )
    
}

const styles = StyleSheet.create({
    root : {
        backgroundColor: '#141414',
        
    },
    locationContainer: {     
        height: "100%",     
        width: '100%',      
        paddingBottom: '13.5%',  
        backgroundColor: '#141414',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
  });