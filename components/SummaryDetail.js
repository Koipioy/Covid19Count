import React, {useState, useEffect, useContext} from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Button } from 'react-native';

export const SummaryDetail = (props) => {

    return (
        <View style={styles.root}>
            <Text style={styles.location}>{(props.specificLocation === '') ? props.location : (props.location + ', ' + props.specificLocation)}</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.info}>Cases: {props.cases}</Text>
                <Text style={styles.info}>Recovered: {props.recovered}</Text>
                <Text style={styles.info}>Deaths: {props.deaths}</Text>               
            </View>
            <Text style={styles.info}>-------------------------------------------------------------------------------</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#141414',        
    },
    location : {
        fontSize: 18,
        color: 'white'
    },
    infoContainer : {
        marginLeft: 10,
    },
    info: {
        fontSize: 15,
        justifyContent: 'center',
        color: 'white'
    }
})