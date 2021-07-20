import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

import COLORS from '../constants/Colors';
import FONTS from "../constants/Fonts"

const  Clock = ({navigation})  => {
    const [currentTime, setCurrentTime] = useState(null);
    const [currentDay, setCurrentDay] = useState(null);

    let daysArray = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    let timer;

    useLayoutEffect(() => {
        clearInterval(timer);
    }, [navigation]);

    useEffect(() => {
        clearInterval(timer)
        getCurrentTime();
        timer = setInterval(() => {
            getCurrentTime();
          }, 1000);
    }, []);

const getCurrentTime = () => {
    let hour = new Date().getHours();
    let minutes = new Date().getMinutes();
    let seconds = new Date().getSeconds();
    let am_pm = 'pm';

    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    if (hour > 12) {
      hour = hour - 12;
    }

    if (hour == 0) {
      hour = 12;
    }

    if (new Date().getHours() < 12) {
      am_pm = 'am';
    }

    setCurrentTime(hour + ':' + minutes + ':' + seconds + ' ' + am_pm);

    daysArray.map((item, key) => {
      if (key == new Date().getDay()) {
        setCurrentDay(item.toUpperCase());
      }
    })
  }
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.daysText}>{currentDay}</Text>
          <Text style={styles.timeText}>{currentTime}</Text>
        </View>
      </View>
    );
}

export default Clock

const styles = StyleSheet.create(
{
    container: {
    //   flex: 1,
      paddingTop: (Platform.OS === 'ios') ? 20 : 0,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    headerText: {
      fontSize: 30,
      textAlign: "center",
      margin: 10,
      color: COLORS.BLACK,
      fontWeight: FONTS.BOLD.toLowerCase()
    },
    timeText: {
        fontSize: 50,
        color: COLORS.HEART
      },
      daysText: {
        color: COLORS.ACTIVE,
        fontSize: 25,
        paddingBottom: 0
      }
  
    });