import React, {useState} from 'react'
import { StyleSheet, KeyboardAvoidingView, View, ActivityIndicator } from 'react-native'
import { Input, Text, Button, Image } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import COLORS from "../constants/Colors";
import IMAGES from "../constants/Images";

const DailiesScreen = ({route,navigation}) => {

    const { type } = route.params || "none"; //the type is "swap" or "clockout"
    
    const [Note, setNote] = useState('');
    const [Pic, setPic] = useState(IMAGES.CAMERA);
    const [selectedProject, setSelectedProject] = useState();
    const [selectedCategory, setSelectedCategory] = useState();

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const BackToTimeCard = () => {
        console.log('Back toTime Card');
        navigation.navigate("TimeCard")
    }

    const addImage = async () =>{
        console.log('addImage');
            let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
            if (permissionResult.granted === false) {
              alert("Permission to access camera roll is required!");
              return;
            }
        
            let pickerResult = await ImagePicker.launchImageLibraryAsync();
            if (pickerResult.cancelled === true) {
                return;
            }
            setPic(pickerResult.uri);
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
      };
    
      const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };
    
      const showDatepicker = () => {
        showMode('date');
      };
    
      const showTimepicker = () => {
        showMode('time');
      };

    return (
        <>
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View>
                    { type && <Text h3>You Are Choose {type}</Text>}
                    <View style={{flexDirection: 'row', marginTop: 50}}>
                    <Text h5>Date: </Text>
                        <Button containerStyle={styles.button, {width:200}}  buttonStyle={{backgroundColor: COLORS.YELLOW}} raised onPress={showDatepicker} title={"Date: " + date.toLocaleDateString('en-US')} />
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 50}}>
                    <Text h5>Time: </Text>
                        <Button containerStyle={styles.button, {width:200}}  buttonStyle={{backgroundColor: COLORS.YELLOW}} raised onPress={showTimepicker} title={"Time: " + date.toLocaleTimeString()} />
                    </View>
                    {show && (
                        <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                        />
                    )}
                </View>
                <View style={{ flexDirection: 'row', marginTop: 50 }}>
                    <Text h5>Project *: </Text>
                    <Picker
                    style={{height: 40, width: 200}}
                    
                    mode="dropdown"
                    selectedValue={selectedProject}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedProject(itemValue)
                    }>
                        <Picker.Item label="Select" value="none" />
                        <Picker.Item label="Java" value="java" />
                        <Picker.Item label="JavaScript" value="js" />
                    </Picker>
                </View>
                {/* <View style={{ flexDirection: 'row', marginTop: 50 }}>
                    <Text h5>Category *: </Text>
                    <Picker
                    style={{height: 40, width: 200}}
                    
                    mode="dropdown"
                    selectedValue={selectedCategory}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedCategory(itemValue)
                    }>
                        <Picker.Item label="Select" value="none" />
                        <Picker.Item label="cat1" value="cat1" />
                        <Picker.Item label="cat2" value="cat2" />
                    </Picker>
                </View> */}
                <Input placeholder='Notes' label="Note:" value={Note} onChangeText={text =>setNote(text)} multiline={true} />
                <Button containerStyle={styles.button, {width:200}}  buttonStyle={{backgroundColor: COLORS.YELLOW}} raised onPress={addImage} title="ChooseImage" />
                <Image
                source= {{uri: Pic}}
                style={{width:100, height: 100, marginTop: 10, borderRadius:10}}
                PlaceholderContent={<ActivityIndicator />}
                />
                <Button containerStyle={styles.button}  buttonStyle={{backgroundColor: COLORS.ACTIVE}} raised onPress={BackToTimeCard} title="Submit" />
            </KeyboardAvoidingView>
        </>
    )
}

export default DailiesScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10,
        backgroundColor: COLORS.WHITE
    },
    button: {
        width: 300,
        marginTop: 20,
    }
})
