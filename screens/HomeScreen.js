import React, {useEffect} from 'react'
import { StyleSheet } from 'react-native'
import { List  } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';


const HomeScreen = ({navigation}) => {
    
  return (
    <List.Section title="Accordions">
      <List.Accordion
        title="Uncontrolled Accordion"
        left={props => <List.Icon {...props} icon="folder" />}>
        <List.Item title="First item" />
        <List.Item title="Second item" 
        left={props => <Icon name="rocket" size={30} color="#900" />}
        />
      </List.Accordion>
    </List.Section>
    );
}

export default HomeScreen

const styles = StyleSheet.create({})
