import React, {useState} from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import ProfileScreen from './screens/ProfileScreen';
import MainScreen from './screens/MainScreen';

import AppLoading from "expo-app-loading";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {TokenContext} from "./Components/TokenContext";

import COLORS from "./constants/Colors";

import { useFonts } from "expo-font";

const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: COLORS.ACTIVE },
  headerTitleStyle: { color: COLORS.WHITE },
  headerTintColor: COLORS.WHITE
}

export default function App() {

  const [appReady, setAppReady] = useState(false);
  const [storedToken, setStoredToken] = useState("");

  const checkToken = () =>{
    AsyncStorage
    .getItem('Token')
    .then((result)=>{
      if(result !==null){
        setStoredToken(JSON.parse(result));
      }else{
        setStoredToken(null);
      }
    })
    .catch( err => console.log(err))
  }


  const [fontLoaded] = useFonts({
    Regular: require("./assets/fonts/NunitoSans-Regular.ttf"),
    Bold: require("./assets/fonts/NunitoSans-Bold.ttf"),
    Black: require("./assets/fonts/NunitoSans-Black.ttf"),
    ExtraBold: require("./assets/fonts/NunitoSans-ExtraBold.ttf"),
    ExtraLight: require("./assets/fonts/NunitoSans-ExtraLight.ttf"),
    Light: require("./assets/fonts/NunitoSans-Light.ttf"),
    SemiBold: require("./assets/fonts/NunitoSans-SemiBold.ttf"),
  });

  return (fontLoaded && appReady) ? (
    <TokenContext.Provider value={{storedToken, setStoredToken}}>
      <TokenContext.Consumer>
        {({storedToken})=>(
                <NavigationContainer>
                <StatusBar style="light" />
                <Stack.Navigator screenOptions={globalScreenOptions}>
                  {storedToken ? 
                    (<Stack.Screen name="Main" component={MainScreen} />)
                    :
                    (
                      <>
                        <Stack.Screen name="SignIn" component={SignInScreen} />
                        <Stack.Screen name="SignUp" component={SignUpScreen} />
                      </>
                    )}
                    <Stack.Screen name="Profile" component={ProfileScreen} />
                </Stack.Navigator>
              </NavigationContainer>
        )}
      </TokenContext.Consumer>
    </TokenContext.Provider>
  ): (
    <AppLoading 
      startAsync={checkToken}
      onFinish={() => setAppReady(true)}
      onError={console.warn}
    />
  );
};