import React, {useEffect, useState, useContext} from 'react';
import { Platform, StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
//  Covid19Count
import {Header, SearchBar, Button} from 'react-native-elements';
import {LocationCount} from './LocationCount';
//  Axios
import axios from 'axios';
//  Contexts
import {GlobalContext} from '../global'
import {AsyncStorage} from 'react-native';
import BackgroundFetch from "react-native-background-fetch";
import NumberFormat from 'react-number-format';
import {FormatNumber} from '../utility-functions/FormatNumber'
  
const instructions = Platform.select({
    ios: `Press Cmd+R to reload,\nCmd+D or shake for dev menu`,
    android: `Double tap R on your keyboard to reload,\nShake or press menu button for dev menu`,
}); 

export const Home = ({navigation}) => {
    [countries, setCountryData] = useState([]);
    [global, setGlobalData] = useState({});
    const context = useContext(GlobalContext)

    var PushNotification = require('react-native-push-notification')
    //var NumberFormat = require('react-number-format');

    useEffect(() => {
      //AsyncStorage.clear();
      fetchData()     
      enablePushNotification()   
      setupPushNotifications()  
      const onFocus = navigation.addListener('focus', () => {            
          updateData()
      });      
    }, [])
    
    const enablePushNotification = () => {
        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function (token) {
              //console.log("TOKEN:", token);
            },
          
            // (required) Called when a remote or local notification is opened or received
            onNotification: function (notification) {
          
              // process the notification
              navigation.navigate("Tracking");

              // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
              //notification.finish(PushNotificationIOS.FetchResult.NoData);
            },
          
            
        })
    }

    const setupPushNotifications = async () => {
      // Step 1:  Configure BackgroundFetch as usual.
      let trackedMessage = ''

      await BackgroundFetch.configure({
        minimumFetchInterval: 60,
        startOnBoot: true,
      }, async (taskId) => {
        console.log("Getting Data");
        await fetchData();        
        const keys = await AsyncStorage.getAllKeys()        
          
          for(var i = 0; i < keys.length; i++) 
          {
              console.log("Getting item " + keys[i])
              let index = await AsyncStorage.getItem(keys[i]);
              let dataSet = (keys[i].split("-")[0])

              if (dataSet === 'countries')
              {
                  const data = context.countries[index];
                  trackedMessage += data.location + "\n\tcases: " + data.cases + "\n\trecovered: " + data.recovered + "\n\tdeaths: " + data.deaths + "\n";                              
              } else if (dataSet === "locations") {
                  //  If you are tracking from the locations dataset
                  const data = context.locations[index];
                  trackedMessage += (data.specificLocation === '' ? data.location : data.specificLocation) + "\n\tcases: " + data.cases + "\n\trecovered: " + data.recovered + "\n\tdeaths: " + data.deaths + "\n";
              } 
            }

            await PushNotification.localNotification({
              //... You can use all the options from localNotifications
              message: trackedMessage,//"Summary Likely Updated", // (required)
              bigText: trackedMessage,              
          })  
  
          BackgroundFetch.finish(taskId);
        })                

        await BackgroundFetch.scheduleTask({
          taskId: "com.foo.customtask",
          forceAlarmManager: true,
          delay: 5000  // <-- milliseconds
        });
        console.log("Creating Push Notification")  
      };

          
    

    async function fetchData() {
      //  Get Country Data       
      axios('https://api.covid19api.com/summary').then(response => {
        let model = [];
        response.data.Countries.map((country, index) => {
          model.push({
            location: country.Country, specificLocation: '', //  Location information
            cases: country.TotalConfirmed, recovered: country.TotalRecovered, deaths: country.TotalDeaths,  //  Case information
            itemKey: country.Country, dataSet: "countries", index: index  //  Key information
          })
        })
        context.countries = model;  
        setCountryData(countries = context.countries);
      }).catch(error => {
        console.log(error);
      })

      //  Get Global Data       
      axios.get('https://api.covid19api.com/world/total').then(response => {
        context.global = response.data;  
        setGlobalData(global = context.global);
      }).catch(error => {
        console.log(error);
      })

      //  Get Location Data       
      await axios.get('https://covid-api.com/api/reports').then(response => {
          let model = [];
          response.data.data.map((location, index) => {
            model.push({
              location: location.region.name, specificLocation: location.region.province, //  Location information
              cases: location.confirmed, recovered: location.recovered, deaths: location.deaths,  //  Case information
              itemKey: location.region.name + "" + location.region.province, dataSet: "locations", index: index  //  Key information
            })
          })
          context.locations = model;  
      }).catch(error => {
          console.log(error);
      })
    }

    async function updateData() {
      setCountryData(countries = context.countries);
      setGlobalData(global = context.global);
    }

    return (
        <View >
            <View style={styles.global}>
              <Text style={styles.globalLabel}>Global</Text>              
              {global.TotalConfirmed != null && global.TotalConfirmed != undefined && <Text style={styles.globalCases}>{FormatNumber(global.TotalConfirmed)}</Text>}
              {/* <NumberFormat style={styles.globalCases} value={global.TotalConfirmed} displayType={'text'} thousandSeparator={true}></NumberFormat> */}
            </View>
            {/* <SearchBar containerStyle={styles.global} inputStyle={{color: 'white'}}></SearchBar> */}
            <SafeAreaView style={styles.locationContainer}>              
              <ScrollView>
              {                  
                countries.map((data) => {
                  return(<LocationCount key={data.itemKey} location={data.location} specificLocation={data.specificLocation} 
                          cases={data.cases} recovered={data.recovered} deaths={data.deaths}
                          itemKey={data.itemKey} dataSet={data.dataSet} index={data.index}></LocationCount>)
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
    locationContainer: {            
      width: '100%',
      backgroundColor: '#141414',   
      marginBottom: '15%' 
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',      
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
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',         
    },
    loading: {
      fontSize: 25 
    }

  });