/* Home screen / Navigator file */ 

import React from 'react';
import {Image, TouchableOpacity, View, Text} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import styles from './assets/Style';
import PALScreen from './screens/PALScreen';
import PALScreenCustom from './screens/PALScreenCustom';

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
          <Image style={styles.title} source={require('./assets/logo.png')}></Image>
            {/* <Text style={styles.titleText}>Memory Assistant</Text> */}
        </View>

        <View style={styles.padding}></View>
        <View style={styles.padding}></View>
      

        {/* Buttons */}
        <View style={[styles.buttonBox]}>
                <TouchableOpacity style={[styles.navButton]}
                    onPress={() => this.props.navigation.navigate('PAL')}
              > 
                <Text style={styles.buttonText}> PAL Test </Text> 
                </TouchableOpacity>     
        </View>
        <View style={{flex:0.1}}></View>
        <View style={[styles.buttonBox]}>
                <TouchableOpacity style={[styles.navButton]}
                    onPress={() => this.props.navigation.navigate('Custom')}
              > 
                <Text style={styles.buttonText}> Custom Test </Text> 
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
    Home: HomeScreen,
    Custom: PALScreenCustom,
  },
  {
    initialRouteName: 'Home', // Default screen = this one 
  }
);

export default createAppContainer(AppNavigator); 

