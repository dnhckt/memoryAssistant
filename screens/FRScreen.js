import React, { Component } from "react";
import { Alert, Button, TouchableOpacity, View, Text, Image } from 'react-native';

import {ImagePicker} from 'expo';
import { Col, Row, Grid } from "react-native-easy-grid";

import PromptFadeView from '../src/PromptFadeView';
import BingoFadeView from '../src/BingoFadeView';
import styles from '../src/Style';

/*
        Randomly pick a subset
        Display 1 by 1 
        Validate input 
        Sort layout 
        FIx begin button
        Display score
*/



function shuffle(array){
    var j, x, i;
    for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = array[i];
        array[i] = array[j];
        array[j] = x;
    }
    return array;
    }

class FRScreen extends Component {
    static navigationOptions = {
        title: "FR Test",
    }
    constructor(props){
        super(props);
        this.state = { 
                bingoCard: ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
                randomWords: [
                    "burial",
                    "pump",
                    "peanut",
                    "engine",
                    "go",
                    "wear",
                    "fashion",
                    "elbow",
                    "error",
                    "digital",
                    "harmful",
                    "dialect",
                    "dorm",
                    "complication",
                    "crusade",
                    "skate",
                    "patient",
                    "swear",
                    "researcher",
                    "family",
                ],
                timer: null,

                thumb: require('../assets/thumbIcon/thumb.png'),
        }
    }

    // When game starts 
    componentDidMount() {   
        let bingoCard = [...this.state.bingoCard];
        let randomWords = [...this.state.randomWords];
        this.setState({ timeVar: setInterval(this.updateClock, 1000), bingoCard: randomWords });
        
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

    // Function to fade in card with timer
    renderCard(startTime) {
        if(this.state.timer > startTime) {
            return( 
                <BingoFadeView style={{height: "100%", width: "100%", fontSize: 76, alignContent: "center", justifyContent: "center" }}
                startTime = {startTime}
                >
                    <Row>
                        <Col style={[styles.bingoButton]}><Text>{this.state.bingoCard[3]}</Text></Col>
                        <Col style={[styles.bingoButton]}><Text>{this.state.bingoCard[4]}</Text></Col>
                        <Col style={[styles.bingoButton]}><Text>{this.state.bingoCard[5]}</Text></Col>
                    </Row>
                    <Row>
                        <Col style={[styles.bingoButton]}><Text>{this.state.bingoCard[0]}</Text></Col>
                        <Col style={[styles.bingoButton]}><Text>{this.state.bingoCard[1]}</Text></Col>
                        <Col style={[styles.bingoButton]}><Text>{this.state.bingoCard[2]}</Text></Col>
                    </Row>
                    <Row>
                        <Col style={[styles.bingoButton]}><Text>{this.state.bingoCard[6]}</Text></Col>
                        <Col style={[styles.bingoButton]}><Text>{this.state.bingoCard[7]}</Text></Col>
                        <Col style={[styles.bingoButton]}><Text>{this.state.bingoCard[8]}</Text></Col>
                    </Row>
                </BingoFadeView>   
            );
        }
    }
    renderWord(startTime) {
        if(this.state.timer > startTime) {
            return (
                <PromptFadeView
                    style={{height: "100%", width: "100%", fontSize: 76, alignContent: "center", justifyContent: "center" }}
                    startTime={startTime}
                >
                <Text style={{fontSize:72}}>{this.state.randomWords[0]}</Text>
                    <Row style={{}}></Row>
                </PromptFadeView>
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
                        <Row style={{flex: 0.1}}></Row>
                            <Row>
                                <Col>     
                                    {this.renderWord(3)}
                                    {this.renderCard(0)}
                                </Col>
                            </Row>
                        <Row style={{ flex: 0.1 }}></Row>
                    </Row>
                
                    <Row style={{alignContent: "center", alignItems: "center"}}>
                        <Col style={{flex: 0.4}}></Col>
                        <Col><TouchableOpacity style={[styles.FRYesButton]} onPress={()=>this.beginGame()}>
                                            <Image source={require('../assets/thumbIcon/thumb.png')} style={[styles.FRThumbUp]}></Image>
                                    </TouchableOpacity></Col>
                            <Col></Col>
                        <Col><TouchableOpacity style={[styles.FRNoButton]} onPress={()=>this.beginGame()}>
                                <Image source={require('../assets/thumbIcon/thumb.png')} style={[styles.FRThumbDown]}></Image>
                                    </TouchableOpacity></Col>
                        <Col style={{flex: 0.8}}></Col>
                    </Row>

                    <Row style={{flex: 0.5}}>
                        <TouchableOpacity style={{ width: '100%', backgroundColor: '#34495e' }} onPress={() => this.renderImg()}>
                            <Text style={[styles.buttonText]}>{this.state.selectText}</Text>
                        </TouchableOpacity>
                    </Row>
                
                </Grid> 
                </View>
            </View>
        );
    }
}

export default FRScreen;
