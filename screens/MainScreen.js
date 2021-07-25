import React, {useLayoutEffect, useState} from 'react'
// import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
// import { DrawerActions } from '@react-navigation/native';
// import { List  } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';

import { StyleSheet, Platform, View } from 'react-native';
// import { Image, Icon } from "react-native-elements";

import LunchScreen from './LunchScreen';
import HomeScreen from './HomeScreen';
import TimeCardScreen from './TimeCardScreen';
import TimeCardOutScreen from './TimeCardOutScreen';
import ClockInScreen from './ClockInScreen';
import DailiesScreen from "./DailiesScreen";

import UserMenu from "../Components/UserMenu";

// import IMAGES from "../constants/Images";
import COLORS from "../constants/Colors";

// const Drawer = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();


const MainScreen = ({route,navigation}) => {
  const [title, setTitle] = useState("Main");

  useLayoutEffect(() => {
      navigation.setOptions({
          headerShown: true,
          title: title,
          headerStyle: { backgroundColor: COLORS.PURPLE},
          headerTitleStyle: {},
          headerTintColor: COLORS.WHITE,
          // headerLeft: () => (
          //     <Icon onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} containerStyle={{paddingLeft:20}} name='menu' color={COLORS.WHITE} />
          // ),
          headerRight: () => (
            <View style={{paddingRight: 20}}>
            <UserMenu
                menutext="User"
                menustyle={{marginRight: 14}}
                textStyle={{color: COLORS.WHITE}}
                navigation={navigation}
                isIcon={true}
            />
        </View>
          )
      })
  }, [navigation, title]);

    return (
      <>
        <Tab.Navigator 
          initialRouteName="TimeCard"
          activeColor={COLORS.WHITE}
          inactiveColor={COLORS.PURPLE_LIGHT_GRAY}
          barStyle={{ backgroundColor: COLORS.PURPLE }}
        >
          <Tab.Screen name="Home" component={HomeScreen}
            options={{
              tabBarIcon: ({color}) => 
              <MaterialCommunityIcons name="home-outline" color={color} size={26} />
            }}
            listeners={{
              focus: e => {
                setTitle("Home");
              },
            }}
            />
          {/* <Tab.Screen name="ClockIn" component={ClockInScreen}
            options={{
              tabBarIcon: ({color}) => 
              <Icon name="home" color={color} size={26} />
            }}
            listeners={{
              focus: e => {
                setTitle("ClockIn");
              },
            }}
          /> */}
          <Tab.Screen name="TimeCard" component={TimeCardScreen}
            options={{
              tabBarIcon: ({color}) => 
              <MaterialCommunityIcons name="calendar-outline" color={color} size={26} />
            }}
            listeners={{
              focus: e => {
                setTitle("Time Card");
              },
            }}
          />
          <Tab.Screen name="Lunch" component={LunchScreen}
            options={{
              tabBarIcon: ({color}) => 
              <MaterialCommunityIcons name="pasta" color={color} size={26} />
            }}
            listeners={{
              focus: e => {
                setTitle("Lunch");
              },
            }}
          />
          <Tab.Screen name="TimeCardOut" component={TimeCardOutScreen}
            options={{
              tabBarIcon: ({color}) => 
              <MaterialCommunityIcons name="exit-run" color={color} size={26} />
            }}
            listeners={{
              focus: e => {
                setTitle("Time Card Out");
              },
            }}
          />
          <Tab.Screen name="Dailies" component={DailiesScreen}
            options={{
              tabBarIcon: ({color}) => 
              <MaterialCommunityIcons  name="note-text-outline" color={color} size={26} />
            }}
            listeners={{
              focus: e => {
                setTitle("Dailies");
              },
            }}
          />
        </Tab.Navigator>
      </>
    )
}

export default MainScreen

const styles = StyleSheet.create({
  sideBar:{
    backgroundColor: 'rgba(255,255,255, .7)',
  },
  navItem: {
    
  }
})
