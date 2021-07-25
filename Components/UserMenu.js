import React, {useContext, useState, useEffect} from 'react'

import { TokenContext } from './TokenContext';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Alert, Platform, View } from 'react-native';
import { Icon, Avatar,Text } from "react-native-elements";
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';

import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';

import IMAGES from "../constants/Images";
import COLORS from "../constants/Colors";
import { POST, URLS } from '../services/paymunService';

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

  export default UserMenu;