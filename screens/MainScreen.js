import React, {useLayoutEffect, useContext, useState, useEffect} from 'react'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';

import { TokenContext } from '../Components/TokenContext';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { StyleSheet, Alert, Platform, View } from 'react-native';
import { Image, Icon, Avatar,Text } from "react-native-elements";
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';

import LunchScreen from './LunchScreen';
import HomeScreen from './HomeScreen';
import TimeCardScreen from './TimeCardScreen';
import TimeCardOutScreen from './TimeCardOutScreen';
import ClockInScreen from './ClockInScreen';
import DailiesScreen from "./DailiesScreen";

import IMAGES from "../constants/Images";
import COLORS from "../constants/Colors";

import { POST, URLS } from '../services/paymunService';



const Drawer = createDrawerNavigator();

const MainScreen = ({navigation}) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: "Main",
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
    }, [navigation]);

    return (
      <>
        <Drawer.Navigator drawerContent={props => {
          return (
            <DrawerContentScrollView style={styles.sideBar} {...props}>
                <View style={{flex:1,justifyContent: 'flex-start', alignItems: 'center'}}>
                  <Image source={{uri: IMAGES.PAYMUN}} style={{ width:200, height: 90 }} />
                </View>
                <DrawerItemList styles={styles.navItem} {...props} />
            </DrawerContentScrollView>
            )
          }}
          drawerContentOptions={{
            activeTintColor: COLORS.ACTIVE,
            itemStyle: { marginVertical: 1 },
          }}>
          <Drawer.Screen 
            name="Home"
            component={HomeScreen}
            options={{
              drawerIcon: () => <Icon
                size={23}
                type='font-awesome'
                name={Platform.OS === 'android' ? 'home' : 'home'}></Icon>
            }} />
          <Drawer.Screen 
              name="TimeCard" 
              component={TimeCardScreen}  
              options={{
                drawerIcon: () => <Icon
                  size={23}
                  type='font-awesome'
                  name={Platform.OS === 'android' ? 'shopping-cart' : 'shopping-cart'}></Icon>
              }} />
            <Drawer.Screen 
              name="ClockIn" 
              component={ClockInScreen}  
              options={{
                drawerIcon: () => <Icon
                  size={23}
                  type='font-awesome'
                  name={Platform.OS === 'android' ? 'star' : 'star'}></Icon>
              }} />
            <Drawer.Screen 
            name="Lunch" 
            component={LunchScreen}
            options={{
              drawerIcon: () => <Icon
                size={23}
                name={Platform.OS === 'android' ? 'star' : 'star'}></Icon>
            }} />
            <Drawer.Screen 
              name="TimeCardOut" 
              component={TimeCardOutScreen}  
              options={{
                drawerIcon: () => <Icon
                  size={23}
                  type='font-awesome'
                  name={Platform.OS === 'android' ? 'shopping-cart' : 'shopping-cart'}></Icon>
              }} />
            <Drawer.Screen 
              name="Dailies" 
              component={DailiesScreen}  
              options={{
                drawerIcon: () => <Icon
                  size={23}
                  type='font-awesome'
                  name={Platform.OS === 'android' ? 'shopping-cart' : 'shopping-cart'}></Icon>
              }} />
        </Drawer.Navigator>
      </>
    )
}

const UserMenu = (props) => {

  const {storedToken, setStoredToken} = useContext(TokenContext);
  const [avatar, setAvatar] = useState(IMAGES.AVATAR);
  const [profile, setprofile] = useState({});
  
  useEffect(() => {
      POST(URLS.PROFILE, {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + storedToken 
      }, {},true)
      .then(res=>{
        if(!res.result.success){
          Alert.alert('error in get profile, ',res.result.message);
        }else{
          setprofile(res.user);
          let avatarImg = URLS.BASE_URL + res.user.avatar;
          setAvatar(avatarImg); 
        }
      })
      .catch (error => console.log(error))
}, [storedToken]);

  let _menu = null;
  const LogOut = () =>{
    function logOutLogic(){
        AsyncStorage.removeItem("Token")
        .then(()=>{
          // props.navigation.replace("SignIn");
          setStoredToken("");
        })
        .catch(err => console.log(err));
    }

    if(Platform.OS == 'android' || Platform.OS == 'ios'){
        Alert.alert(
            "LogOut",
            "Do You Want to LogOut?",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => {
                _menu.hide();
                logOutLogic()
              }

               }
            ],
            { cancelable: false }
          );
    }else{
        logOutLogic();
    }
}

  return (
    <View style={props.menustyle}>
      <Menu
        ref={(ref) => (_menu = ref)}
        button={
          props.isIcon ? (
            <Avatar
                    rounded
                    size="small"
                    avatarStyle={{borderColor: COLORS.WHITE, borderWidth: 1}}
                    containerStyle={{backgroundColor: COLORS.BLACK}}
                    source={{
                        uri: avatar
                    }}
                    activeOpacity={0.7}
                    onPress={() => _menu.show()}
                ></Avatar>
          ) : (
            <Text
              onPress={() => _menu.show()}
               style={props.textStyle}>
              {props.menutext}
            </Text>
          )
        }>
        <MenuItem onPress={() => {
          _menu.hide();
          props.navigation.navigate("Profile", {profile: profile})
          }}>
            <View style={{
                paddingVertical: 15,
                paddingHorizontal: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <Icon
                    size={23}
                    type='font-awesome'
                    name={Platform.OS === 'android' ? 'cog' : 'cog'}>
                </Icon>
                <Text style={{
                        fontSize: 16,
                        color: COLORS.BLACK
                    }}> Settings</Text>
            </View>
        </MenuItem>

        <MenuItem disabled>Disabled Menu Item 2</MenuItem>

        <MenuDivider />

        <MenuItem onPress={LogOut}>
        <View style={{
                paddingVertical: 15,
                paddingHorizontal: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <Icon
                    size={23}
                    type='font-awesome'
                    name={Platform.OS === 'android' ? 'sign-out' : 'sign-out'}>
                </Icon>
                <Text style={{
                        fontSize: 16,
                        color: COLORS.BLACK
                    }}> Logout</Text>
            </View>
        </MenuItem>
      </Menu>
    </View>
  );
};

export default MainScreen

const styles = StyleSheet.create({
  sideBar:{
    backgroundColor: 'rgba(255,255,255, .7)',
  },
  navItem: {
    
  }
})
