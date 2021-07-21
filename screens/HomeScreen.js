import React from 'react'
import { StyleSheet } from 'react-native'
import { List  } from 'react-native-paper';



const HomeScreen = ({navigation}) => {

  return (
    <List.Section title="Accordions">
      <List.Accordion
        title="Uncontrolled Accordion"
        left={props => <List.Icon {...props} icon="folder" />}>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>
    </List.Section>
    );
}

export default HomeScreen

const styles = StyleSheet.create({})
