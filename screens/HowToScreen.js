import {ImagePicker} from 'expo';

import React, { Component } from "react";
import ImageFadeView from '../src/ImageFadeView';
import {Col, Row, Grid} from "react-native-easy-grid";
import {Alert, Button, TouchableOpacity, View, Text, Image} from 'react-native';

import styles from '../src/Style';

/*
        Screen for the FR Test
        Randomly pick a subset
        Display for 10 seconds
        Display set one by one 
        Validate input 
        Display score
*/

class HowToScreen extends Component {
    static navigationOptions = {
        title: "FR Test",
    }

    // When game starts 
    componentDidMount() {   
        this.setState({timeVar: setInterval(this.updateClock,1000)});
        
    }
    componentWillUnmount() {
    }
    componentDidUpdate() {
    
    }
    beginGame=()=> {   
    }

    
    validateLvl(correctAnswer, index) {
  
    }

    updateClock=()=> {
        this.setState({timer: this.state.timer + 1}) // Stores clock second var as timer 
    }

    // Function to fade in image with timer
    renderImg(startTime, endTime) {
        if(this.state.timer > startTime) {
            return( 
                <ImageFadeView style={{}}
                startTime = {startTime}
                endTime = {endTime}
                >
                <Text>Bingo</Text>
                </ImageFadeView>   
            );
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.max}>

                {/*  Game Arena: */}
                <Grid>
                    <Row style={{flex: 2}}>
                        <Col style={[styles.gameButton]}>     
                           <Col><Text>{this.state.bingoCard}{this.state.timer}</Text></Col>
                        </Col>
                    </Row>
                    <Row>
                        <Col><TouchableOpacity style={[styles.gameButton]} onPress={()=>this.beginGame()}></TouchableOpacity></Col>
                        <Col><TouchableOpacity style={[styles.gameButton]} onPress={()=>this.beginGame()}></TouchableOpacity></Col>
                        <Col><TouchableOpacity style={[styles.gameButton]} onPress={()=>this.beginGame()}></TouchableOpacity></Col>
                    </Row>
                    
                </Grid> 
                </View>
            </View>
        );
    }
}

export default FRScreen;
