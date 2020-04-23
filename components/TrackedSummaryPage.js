import React, {useState, useEffect, useContext} from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Button } from 'react-native';
import {AsyncStorage} from 'react-native';
import {GlobalContext} from '../global'
import {SummaryDetail} from './SummaryDetail'

export const TrackedSummaryPage = ({navigation}) => {
    
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
            console.log("length: " + keys.length)   
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
                <Button title="Tracking" onPress={() => navigation.navigate('Tracking')}></Button>
            </View>   
            <SafeAreaView style={styles.scrollArea}>
                <ScrollView >
                {
                    tracked.map(trackInfo => {
                        let data = {}
                        if (trackInfo.dataSet === 'countries')
                            data = context.countries[trackInfo.index];
                        else if (trackInfo.dataSet === 'locations')    
                            data = context.locations[trackInfo.index];
                            
                        const key = data.location + "" + data.specificLocation
                        return(<SummaryDetail key={key} location={data.location} specificLocation={data.specificLocation}
                                cases={FormatNumber(data.cases)} recovered={FormatNumber(data.recovered)} deaths={FormatNumber(data.deaths)}></SummaryDetail>)
                    })
                }
                </ScrollView>
            </SafeAreaView>
        </View>
    )
    
}

const styles = StyleSheet.create({
    root : {
        flex: 1,
        backgroundColor: '#141414',
    },
    scrollArea: {
        height: "100%",     
        width: '100%',      
        paddingBottom: '13.5%',  
        backgroundColor: '#141414',
    }
  });