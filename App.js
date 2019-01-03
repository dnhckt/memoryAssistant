/* Home screen / Navigator file */ 

import React from 'react';
import { TouchableOpacity, View, Text} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";

import styles from './assets/Style'
import PALScreen from './screens/PALScreen'
// import FRScreen from './screens/FRScreen'
// import OldScreen from './screens/OldScreen'

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }
  render() {
    return (
      /* Layout of home screen   
        Container flex layout: padding:title:padding:buttons:padding
        1 = pad, 3 = title, 2 = button  
      */
      <View style={styles.container}>       
        <View style={styles.padding}></View>

        {/* Title Section */}
        <View style={[styles.titleBox]}> 
          <Text style={styles.title}>Memory</Text>
          <Text style={styles.title}>Assistant</Text>
        </View>

        <View style={styles.padding}></View>

        {/* Buttons */}
        <View style={[styles.buttonBox]}>
                <TouchableOpacity style={[styles.navButton]}
                    onPress={() => this.props.navigation.navigate('PAL')}
              > 
                <Text style={styles.buttonText}> PAL Test </Text> 
                </TouchableOpacity>     
        </View>
        
        <View style={styles.padding}></View>
      </View> 
    );
  }
}
// Set Navigation screens (imported from './screens')
const AppNavigator = createStackNavigator(
  {
    PAL: PALScreen,
    // Old: OldScreen,
    // FR: FRScreen,
    Home: HomeScreen,
  },
  {
    initialRouteName: 'Home', // Default screen = this one 
  }
);

export default createAppContainer(AppNavigator); 

