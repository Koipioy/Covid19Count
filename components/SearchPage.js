import React, {useState, useContext, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { SearchBar } from 'react-native-elements';
import {LocationCount} from './LocationCount';
import {GlobalContext} from '../global'
import axios from 'axios';

export const SearchPage = ({navigation}) => {
    [search, setSearch] = useState("");
    [locations, setLocations] = useState([]);
    let context = useContext(GlobalContext);

    useEffect(() => {
        const onFocus = navigation.addListener('focus', () => {            
            updateData()
        });        
    }, [])

    async function updateData() {
        console.log("Getting Locations");
        setLocations(locations = context.locations);

        // if (context.locations.length === 0)
        // {   
        //     //  Get Location Data. May not be needed. Setting data in HomePage       
        //     axios.get('https://covid-api.com/api/reports').then(response => {
        //         context.locations = response.data.data;  
        //         setLocations(locations = context.locations);
        //         console.log("Found Data");
        //     }).catch(error => {
        //         console.log(error);
        //     })
        // }
        // else
        //     setLocations(locations = context.locations);
    }

    return (
        <View style={styles.root}>
            <SearchBar onChange={(e) => {setSearch(e.nativeEvent.text); }} value={search} containerStyle={styles.global} inputStyle={{color: 'white'}} placeholder='Search a location'></SearchBar>
            <SafeAreaView style={styles.locationContainer}>            
                <ScrollView>
                {                  
                    locations.map((data) => {          
                        const key = data.location + "" + data.specificLocation
                        //console.log("Key: " + key + " " + JSON.stringify(search));
                        if(search === '' || key.includes(search))
                        {
                            return(<LocationCount key={data.itemKey} location={(data.specificLocation === '') ? data.location : (data.location + ', ' + data.specificLocation)} specificLocation={data.specificLocation} 
                                    cases={data.cases} recovered={data.recovered} deaths={data.deaths}
                                    itemKey={data.itemKey} dataSet={data.dataSet} index={data.index}></LocationCount>)
                        }
                        //return(<LocationCount key={key} location={'NULL'} cases={location.confirmed}></LocationCount>)
                    })
                }
                </ScrollView>
            </SafeAreaView>

            <View style={styles.loadingContainer}>
              <Text style={styles.loading}>Loading...</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    root : {
        //backgroundColor: '#141414',
    },
    locationContainer: {          
        width: '100%',      
        paddingBottom: '13.5%',  
        backgroundColor: '#141414',
    },
    container: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
    global : {
      alignItems: 'center',
      backgroundColor: '#141414',
    },
    globalLabel : {
      color: 'white',
      fontSize: 30
    },
    globalCases : {
      color: 'white',
      fontSize: 25
    },
    loadingContainer: {
      justifyContent: 'flex-end',
      alignItems: 'center',         
    },
    loading: {
      fontSize: 25 
    }
  });