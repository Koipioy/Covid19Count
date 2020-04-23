import React, {useEffect} from 'react'
import { View } from 'react-native';
import { TabActions } from '@react-navigation/native';

export const StartScreen = ({navigation}) => {
    
    useEffect(() => {
        const jumpToAction = TabActions.jumpTo('Home');
        navigation.dispatch(jumpToAction);
    }, [])

    return (<View></View>)
}