import React, {useLayoutEffect, useState} from 'react'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { List  } from 'react-native-paper';



import { StyleSheet, Platform, View } from 'react-native';
import { Image, Icon } from "react-native-elements";

import LunchScreen from './LunchScreen';
import HomeScreen from './HomeScreen';
import TimeCardScreen from './TimeCardScreen';
import TimeCardOutScreen from './TimeCardOutScreen';
import ClockInScreen from './ClockInScreen';
import DailiesScreen from "./DailiesScreen";

import UserMenu from "../Components/UserMenu";

import IMAGES from "../constants/Images";
import COLORS from "../constants/Colors";

const Drawer = createDrawerNavigator();


const MainScreen = ({route,navigation}) => {
  const [title, setTitle] = useState("Main");

  useLayoutEffect(() => {
      navigation.setOptions({
          headerShown: true,
          title: title,
          headerStyle: { backgroundColor: COLORS.ACTIVE},
          headerTitleStyle: {},
          headerTintColor: COLORS.WHITE,
          headerLeft: () => (
              <Icon onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} containerStyle={{paddingLeft:20}} name='menu' color={COLORS.WHITE} />
          ),
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
        <Drawer.Navigator initialRouteName="TimeCard" drawerContent={props => {
          return (
            <DrawerContentScrollView style={styles.sideBar} {...props}>
                <View style={{flex:1,justifyContent: 'flex-start', alignItems: 'center'}}>
                  <Image source={{uri: IMAGES.PAYMUN}} style={{ width:200, height: 90 }} />
                </View>
                {/* <List.Section>
                  <List.Accordion
                    title="PO"
                    left={props => <List.Icon {...props} icon="folder" />}>
                    <List.Item title="PO"/>
                    <List.Item title="Purchase List" />
                  </List.Accordion>
                  <List.Accordion
                    title="T.Sheet"
                    left={props => <List.Icon {...props} icon="folder" />}>
                    <List.Item title="Time Card"
                    onPress={() => {
                      setTitle("Time Card");
                      navigation.navigate('TimeCard');
                    }}/>
                    <List.Item title="Review" />
                  </List.Accordion>
                  <List.Accordion
                    title="Inventory"
                    left={props => <List.Icon {...props} icon="folder" />}>
                    <List.Item title="."/>
                    <List.Item title="." />
                  </List.Accordion>
                  <List.Item title="Dailies"
                  left={props => <List.Icon {...props} icon="folder" />}/>
                </List.Section> */}
                <DrawerItemList styles={styles.navItem} {...props} />
            </DrawerContentScrollView>
            )
          }}
          drawerContentOptions={{
            activeTintColor: COLORS.ACTIVE,
            itemStyle: { marginVertical: 1 },
          }}
          >
          <Drawer.Screen name="Home" component={HomeScreen}
            options={{
              drawerIcon: () => <Icon
                size={23}
                type='font-awesome'
                name={Platform.OS === 'android' ? 'home' : 'home'}></Icon>
            }}
            listeners={{
              focus: e => {
                setTitle("Home");
              },
            }}
            />
          <Drawer.Screen name="ClockIn" component={ClockInScreen}
            listeners={{
              focus: e => {
                setTitle("ClockIn");
              },
            }}
          />
          <Drawer.Screen name="TimeCard" component={TimeCardScreen}
          listeners={{
            focus: e => {
              setTitle("TimeCard");
            },
          }}
          />
          <Drawer.Screen name="Lunch" component={LunchScreen}
            listeners={{
              focus: e => {
                setTitle("Lunch");
              },
            }}
          />
          <Drawer.Screen name="TimeCardOut" component={TimeCardOutScreen}
          listeners={{
            focus: e => {
              setTitle("TimeCardOut");
            },
          }}
          />
          <Drawer.Screen name="Dailies" component={DailiesScreen}
          listeners={{
            focus: e => {
              setTitle("Dailies");
            },
          }}
          />
        </Drawer.Navigator>
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
