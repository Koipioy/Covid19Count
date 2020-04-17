import React, {useState} from 'react';
import {View, StyleSheet, Text, CheckBox, Alert} from 'react-native';
import {ListItem} from 'react-native-elements';

export const LocationCount = (props) => {
    const [checked, setChecked] = useState(false)

    return (
        <ListItem
            style={styles.root} key={1}
            leftElement={<ListItem
                            style={styles.info}
                            leftElement={<Text style={styles.name}>{props.location}</Text>}
                            rightElement={<Text style={styles.count}>{props.cases}</Text>}            
                            ></ListItem>}
            rightElement={<CheckBox checked={checked} onPress={() => {Alert.alert(checked, checked); setChecked(false); }}></CheckBox>} 
        ></ListItem>
       
        // <View style={styles.root}>
        //     <Text style={styles.name}>JOE</Text>
        //     <Text style={styles.count}>1</Text>
        // </View>
    )
}

const styles = StyleSheet.create({
    root : {    
          
    },
    info : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        width : '75%',
        backgroundColor: 'red'  
    }
})