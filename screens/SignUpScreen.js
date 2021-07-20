import React, {useState, useLayoutEffect, } from 'react'
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';

import COLORS from "../constants/Colors"
import FONTS from "../constants/Fonts"

const SignUpScreen = ({navigation}) => {

    const [phoneNumber, setPhoneNumber] = useState('');
    const [verifyCode, setVerifyCode] = useState('');

    const [counter, setCounter] = useState();
    const [timerInstant, setTimerInstant] = useState({});
    const timer = (count) =>{
        setCounter(count);
        let interval = setInterval(() => {
            setCounter((counter)=> counter -1);
        }, 1000);
        let timeout = setTimeout(() => {
            clearInterval(interval);
        }, (count+1) * 1000);
        setTimerInstant({interval, timeout});
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Login",
        });
        clearInterval(timerInstant.interval);
        clearTimeout(timerInstant.timeout);
    }, [navigation]);
    
    const sendPhoneNumber = () =>{
        console.log(phoneNumber, verifyCode)
        setTimerInstant(timerInstant => {
            timerInstant = timer(15);
        }) 

    };

    const sendCode = () =>{
        //if signup is ok change to profile for set password and avatar
        // navigation.navigate("Profile" , {phoneNumber: phoneNumber});
        clearInterval(timerInstant.interval);
        clearTimeout(timerInstant.timeout);
        navigation.reset({
              index: 0,
              routes: [{ name: "Profile", params: {phoneNumber} }],
            });
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <Text h2 style={{marginBottom: 50}}>SignUp</Text>
            {
                (counter && counter >= 0)?
                <Text h5 style={{marginBottom:20}}>{counter}</Text>
                :
                <Text></Text>
            }
            <View style={styles.inputContainer}>
                {
                    (counter && counter>= 0) ?
                    <Input placeholder="Enter the Given Code:" type="text" value={verifyCode} onChangeText={text => setVerifyCode(text)} onSubmitEditing={sendCode}/>
                    :
                    <Input placeholder="Phone Number:" type="text" value={phoneNumber} onChangeText={text => setPhoneNumber(text)} onSubmitEditing={sendPhoneNumber} />
                }
                
            </View>
            {
                (counter && counter>= 0) ?
                <Button raised containerStyle={styles.button} onPress={sendCode} title="Enter"/>
                :
                <Button raised containerStyle={styles.button} onPress={sendPhoneNumber} title="Recieve Code"/>
            }
            <View style={{ height: 50}} />
        </KeyboardAvoidingView>
    )
}

export default SignUpScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: COLORS.WHITE
    },
    inputContainer:{
        width: 300
    },
    button:{
        width: 200,
        marginTop: 10
    }
})
