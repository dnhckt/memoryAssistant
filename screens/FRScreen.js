import React, { Component } from "react";
import { Alert, Button, TouchableOpacity, View, Text, Image } from 'react-native';

import {ImagePicker} from 'expo';
import { Col, Row, Grid } from "react-native-easy-grid";

import PromptFadeView from '../src/PromptFadeView';
import BingoFadeView from '../src/BingoFadeView';
import styles from '../src/Style';

/*
        Randomly pick a subset DONE
        Display 1 by 1 DONE 
        Validate input  + fix timings 
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
        title: "Word Bingo",
    }
    constructor(props){
        super(props);
        this.state = { 
                bingoCard: [""],
                randSet: [""],
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
                randSet: [],
                timer: null,

                randPromptCount: 6,

                thumb: require('../assets/thumbIcon/thumb.png'),
        }
    }

    // When game starts 
    componentDidMount() {   
        this.beginGame();
    }
    updateClock = () => {
        this.setState({ timer: this.state.timer + 1 }) // Stores clock second var as timer 
    }
    beginGame=()=> {

        let bC = [...this.state.bingoCard];
        let rW = [...this.state.randomWords];
        let rS = [...this.state.randSet];

        shuffle(rW);
        for (var i = 0; i <= 2; i++) {
            bC[i] = rW[i];
        }
        shuffle(rW);

        for (var i=0; i <=5; i++) {
            if( i <=2) { rS[i] = bC[i]; }
            if(i > 2) {rS[i] = rW[i]; }
        }
        shuffle(rS);
        this.setState({ bingoCard: bC, randomWords: rW, randSet: rS});

        // /* Randomise the array of words */
        // for (var i = 0; i < randomWords.length; i++) {
        //     shuffle(randomWords); 
        //     this.setState({ bingoCard: randomWords[0] });  /* Assign a random subset of words to bingoCard */
        //     // this.setState{bingoCard}   

        /* Begin clock */
        this.setState({ timeVar: setInterval(this.updateClock, 1000)});           

        this.generateRandom();                 
    }
    componentWillUnmount() {
        clearInterval(this.state.timeVar);
        this.setState({timer: null, randomWords: null, bingoCard: null, randPrompt: null, randSet: null});
    }

    /* 0 = no, 1 = yes*/
    validateLvl(ans) {
        let currentWord = this.state.randSet[this.state.randPromptCount];

        let bingoCard = [...this.state.bingoCard];
        let randomWords = [...this.state.randomWords];        

        var count = 0;
        /* Check if user pressed no correctly */
         if(ans == 0) {
            for(i=0; i <= 2; i++) {
                if  (currentWord != bingoCard[i]) {
                    count++;
                }
            }
            if (count == 3) { // If user said no and they're correct
                alert("Yes, it wasn't");
                this.generateRandom();
            }
            else { // If user said no and they're wrong 
                alert("No, it was in");
            }
        }

       /* Check if user pressed yes correctly */
        if (ans==1) {
            for(i=0; i <=2; i++) {
                if (currentWord == bingoCard[i]) { 
                    count++;
                }
            }
            if(count==1) { // If user said yes and they're correct 
                alert("Yes, it was ");
                this.generateRandom();
            }
            else { // If user said yes and they're wrong
                alert("No, it wasn't");
            }
        }

    }

    generateRandom() {
            this.setState({randPromptCount: this.state.randPromptCount-1});
    }

    // Function to fade in card with timer
    renderCard(startTime) {
        if(this.state.timer > startTime) {
            return( 
                <BingoFadeView style={{height: "100%", width: "100%", fontSize: 76, alignContent: "center", justifyContent: "center", }}
                startTime = {startTime}
                >
                    <Row style={{ flex: 0.05 }}></Row>
                    {/* <Row>
                        <Col style={[styles.bingoButton]}><Text style={{ fontSize: 48 }}>{this.state.randSet[0]}</Text></Col>
                        <Col style={[styles.bingoButton]}><Text style={{ fontSize: 48 }}>{this.state.randSet[1]}</Text></Col>
                        <Col style={[styles.bingoButton]}><Text style={{ fontSize: 48 }}>{this.state.randSet[2]}</Text></Col> 
                    </Row> */}
                    <Row>
                        <Col style={[styles.bingoButton]}><Text style={{fontSize: 48}}>{this.state.bingoCard[0]}</Text></Col>
                        <Col style={[styles.bingoButton]}><Text style={{ fontSize: 48 }}>{this.state.bingoCard[1]}</Text></Col>
                        <Col style={[styles.bingoButton]}><Text style={{ fontSize: 48 }}>{this.state.bingoCard[2]}</Text></Col>
                    </Row>
                     {/* <Row>
                        <Col style={[styles.bingoButton]}><Text>{this.state.bingoCard[6]}</Text></Col>
                        <Col style={[styles.bingoButton]}><Text>{this.state.bingoCard[7]}</Text></Col>
                        <Col style={[styles.bingoButton]}><Text>{this.state.bingoCard[8]}</Text></Col>
                    </Row> */}
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
                <Text style={{fontSize:72}}>{this.state.randSet[this.state.randPromptCount]}</Text>
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
                        <Col><TouchableOpacity style={[styles.FRYesButton]} onPress={()=>this.validateLvl(1)}>
                                            <Image source={require('../assets/thumbIcon/thumb.png')} style={[styles.FRThumbUp]}></Image>
                                    </TouchableOpacity></Col>
                            <Col></Col>

                        <Col><TouchableOpacity style={[styles.FRNoButton]} onPress={()=>this.validateLvl(0)}>
                                <Image source={require('../assets/thumbIcon/thumb.png')} style={[styles.FRThumbDown]}></Image>
                                    </TouchableOpacity></Col>
                        <Col style={{flex: 0.8}}></Col>
                    </Row>

                    <Row style={[styles.roundedButtonWrap]}>
                        <TouchableOpacity style={[styles.roundedButton]} onPress={() => this.renderImg()}>
                            <Text style={[styles.buttonText]}>{this.state.selectText}</Text>
                        </TouchableOpacity>
                    </Row>
                <Row style={{flex: 0.05}}></Row>
                </Grid> 
                </View>
            </View>
        );
    }
}

export default FRScreen;
