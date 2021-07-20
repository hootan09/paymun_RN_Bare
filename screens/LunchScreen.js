import React from 'react'
import { Alert, StyleSheet, ImageBackground, Platform } from 'react-native'
import {Image, Text, Button} from 'react-native-elements'

import FastImage from 'react-native-fast-image'

import IMAGES from "../constants/Images"
import COLORS from "../constants/Colors"

const LunchScreen = ({navigation}) => {
    const showAlert = () =>{
    
        function navigateTo(){
            navigation.navigate("TimeCard");
        }
    
        if(Platform.OS == 'android' || Platform.OS == 'ios'){
            Alert.alert(
                "Confirm",
                "Are You Sure?",
                [
                  {
                    text: "No",
                    onPress: () => console.log("No Pressed"),
                    style: "cancel"
                  },
                  { text: "Yes", onPress: () => {
                    navigateTo()
                  }
    
                   }
                ],
                { cancelable: false }
              );
        }else{
            navigateTo();
        }
    }
    return (
        <>
            <ImageBackground source={{uri: IMAGES.EATBG}} style={styles.container}>
                <Text h4>DID YOU ENJOY YOUR SNACKS?</Text>
                {/* <Image style={{width: 300, height: 400, resizeMode: "contain" }} source={{uri: IMAGES.EAT1}} /> */}
                <FastImage
                    style={{ width: 300, height: 400 }}
                    source={{
                        uri: IMAGES.EAT1,
                        headers: { Authorization: 'someAuthToken' },
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                />
                <Button containerStyle={styles.button}  buttonStyle={{backgroundColor: COLORS.GREEN}} raised onPress={showAlert} title="Ready to GoBack to Work" />
            </ImageBackground>
        </>
    )
}

export default LunchScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        // backgroundColor: COLORS.WHITE,
        resizeMode: 'cover',
    },
    button: {
        width: 200,
        marginTop: 200,
    },
})


