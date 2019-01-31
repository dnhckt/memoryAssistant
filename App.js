/* Home screen / Navigator file */ 

import React from 'react';
import {Image, TouchableOpacity, View, Text} from 'react-native';
import {Col, Row, Grid} from "react-native-easy-grid";

import styles from './src/Style';

import PALScreen from './screens/PALScreen';
import PALScreenCustom from './screens/PALScreenCustom';
import FRScreen from './screens/FRScreen';

import { createStackNavigator, createAppContainer } from "react-navigation";

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }
  render() {
    return (
      /* Layout of home screen */
      <View style={styles.container}>       
        <Grid>
          <Row>
  {/* Title image */}
            <View style={[styles.titleBox]}> 
              <Image style={styles.title} source={require('./assets/logo.png')}></Image>
              {/* <Text style={styles.titleText}>Memory Assistant</Text> */}
            </View>
          </Row>
          <Row></Row>
    {/* Top row buttons */}
          <Row>
            <Col style={[styles.buttonBox]}>
            <Text style={[styles.header]}>Group 1</Text>
    {/* PAL test */}
              <TouchableOpacity style={[styles.navButton]} onPress={() => this.props.navigation.navigate('PAL')}>
                <Text style={styles.buttonText}>Game A</Text>
              </TouchableOpacity>
            </Col>
            <Col style={[styles.buttonBox]}>
            <Text style={[styles.header]}>Group 2</Text>
    {/* Custom PAL Test */}
              <TouchableOpacity style={[styles.navButton]} onPress={() => this.props.navigation.navigate('cPAL')}>
                <Text style={styles.buttonText}>Game A</Text>
              </TouchableOpacity>
            </Col>
          </Row>
    {/* Second row buttons */}
          <Row>
            <Col style={[styles.buttonBox]}>
    {/* FR Test */}
              <TouchableOpacity style={[styles.navButton]} onPress={() => this.props.navigation.navigate('FR')}>
                <Text style={styles.buttonText}>Game B</Text>
              </TouchableOpacity>
            </Col>
    {/* Custom FR Test */}
            <Col style={[styles.buttonBox]}>
              <TouchableOpacity style={[styles.navButton]} onPress={() => this.props.navigation.navigate('FR')}>
                <Text style={styles.buttonText}>Game B</Text>
              </TouchableOpacity>
            </Col>
          </Row>
        </Grid>
      </View> 
    );
  }
}
// Set Navigation screens (imported from './screens')
const AppNavigator = createStackNavigator(
  {
    PAL: PALScreen,
    cPAL: PALScreenCustom,
    FR: FRScreen, 
    Home: HomeScreen,
    
  },
  {
    initialRouteName: 'Home', // Default screen = this one 
  }
);

export default createAppContainer(AppNavigator); 

