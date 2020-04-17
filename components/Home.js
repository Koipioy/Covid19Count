import React, {useEffect, useState, useContext} from 'react';
import { Platform, StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
//  Covid19Count
import {Header, SearchBar} from 'react-native-elements';
import {LocationCount} from './LocationCount';
//  Axios
import axios from 'axios';
//  Contexts
import {CountryContext} from '../gobal'

const instructions = Platform.select({
    ios: `Press Cmd+R to reload,\nCmd+D or shake for dev menu`,
    android: `Double tap R on your keyboard to reload,\nShake or press menu button for dev menu`,
});

export const Home = (props) => {
    [countryData, setCountryData] = useState([]);
    let context = useContext(CountryContext)

    useEffect(() => {
      getData()
      
        
    }, [])
    
    async function getData() {
      //console.log(context)
      console.log("GLOBAL NULL " + (context.countries.length === 0))
      if (context.countries.length === 0)
      {
        //  Get Country Data       
        axios.get('https://covid-api.com/api/reports').then(response => {
          context.countries = response.data.Countries;  
          setCountryData(countryData = context.countries);
          console.log("Found Data");
        }).catch(error => {
          console.log(error);
        })
      } else 
        setCountryData(countryData = context.countries);
    }

    return (
        <View style={{flex : 1}}>
            <SearchBar></SearchBar>
            <SafeAreaView style={styles.locationContainer}>
              
              <ScrollView>
              {/* <LocationCount key={countryData[0].Country} location={countryData[0].Country}  cases={countryData[0].TotalConfirmed}></LocationCount>  */}
                {                  
                  countryData.map(location => {
                    return(<LocationCount key={location.Country} location={location.Country} cases={location.TotalConfirmed}></LocationCount>)
                  })
                }
              </ScrollView>
            </SafeAreaView>
            <View style={styles.container}>        
              <Text style={styles.welcome}>Welcome to React Native Will!</Text>
              <Text style={styles.instructions}>To get started, edit App.js</Text>
              <Text style={styles.instructions}>{instructions}</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    locationContainer: {            
      width: '100%',
      backgroundColor: 'green'    
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
  });