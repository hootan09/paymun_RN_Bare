import React from 'react'
import { StyleSheet, KeyboardAvoidingView } from 'react-native'
import {Button} from 'react-native-elements'
import Clock from '../Components/Clock' 

import COLORS from "../constants/Colors"

const TimeCardScreen = ({navigation}) => {

    const ClockIn = () =>{
        navigation.navigate("ClockIn");
    }

    return (
        <>
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <Clock navigation={navigation}/>
                <Button containerStyle={styles.button}  buttonStyle={{backgroundColor: COLORS.GREEN}} raised onPress={ClockIn} title="ClockIn" />
            </KeyboardAvoidingView>
        </>
    )
}

export default TimeCardScreen

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
