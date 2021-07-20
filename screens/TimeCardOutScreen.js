import React from 'react'
import { StyleSheet, KeyboardAvoidingView } from 'react-native'
import {Button} from 'react-native-elements'

import Clock from '../Components/Clock' 

import COLORS from "../constants/Colors"

const TimeCardOutScreen = ({navigation}) => {

    const Lunch = () =>{
        navigation.navigate("Lunch");
    }

    const ClockOut = () =>{
        navigation.navigate("Dailies", {type: "ClockOut"});
    }

    const Swap = () =>{
        navigation.navigate("Dailies" , {type: "Swap"});
    }

    return (
        <>
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <Clock navigation={navigation}/>
                <Button containerStyle={styles.button}  buttonStyle={{backgroundColor: COLORS.GREEN}} raised onPress={Lunch} title="Lunch & Break" />
                <Button containerStyle={styles.button}  buttonStyle={{backgroundColor: COLORS.HEART}} raised onPress={ClockOut} title="ClockOut" />
                <Button containerStyle={styles.button}  buttonStyle={{backgroundColor: COLORS.GREEN}} raised onPress={Swap} title="Swap" />
            </KeyboardAvoidingView>
        </>
    )
}

export default TimeCardOutScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10,
        backgroundColor: COLORS.WHITE
    },
    button: {
        width: 200,
        marginTop: 20,
    }
})
