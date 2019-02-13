import React, { Component } from "react";
import { Alert, Button, TouchableOpacity, View, Text, Image } from 'react-native';

import {ImagePicker} from 'expo';
import { Col, Row, Grid } from "react-native-easy-grid";

import PromptFadeView from '../src/PromptFadeView';
import BingoFadeView from '../src/BingoFadeView';
import styles from '../src/Style';


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

class FRScreenCustom extends Component {
    static navigationOptions = {
        title: "Word Bingo",
    }
    constructor(props){
        super(props);
        this.state = { 
                gameStarted: false,
                bingoCard: [""],
                randSet: [""],
                randomWords: [
                    "wedding", "holiday", "children", "birth","magical", "birthday", "happy",
                    "family", "together", "christmas", "loved", "first", "jamaica",
                    "hawaii", "greece", "best", "anniversary", "friend",
                    "ship", "joy", "laugh", "success",  "win",
                    "rainbow", "smile", "rainbows", "celebrate", "weekend", 
                    "fun", "beach", "beautiful", "sunshine", "delicious", 
                    "paradise", "sweet", "praise", "memories", "present", 
                    "team", "freedom", "butterflies", "award", "call", 
                    "chocolate", "hug", "relax", "nostalgic", "bed",                     
                    "pizza", "wonderful", "sunshine", "tropical", "cupcakes", 
                ],

                randPromptCount: 16,
                bingoCardLen: null,
                bingoCardFound: 0,
                wrongGuess: 0,

                thumb: require('../assets/thumbIcon/thumb.png'),
                beginText: "Press to Begin!",
                timer: null,
        }
    }
 
    componentDidUpdate() {   
    }

    componentWillUnmount() {
        clearInterval(this.state.timeVar);
        this.resetVars();
    }

    updateClock = () => {
        this.setState({ timer: this.state.timer + 1 }) // Stores clock second var as timer 
    }
    beginButton() {
        if(!this.state.gameStarted) {
            this.beginGame();
        }
    }
    beginGame=()=> {
        this.setState({gameStarted: true});

        let bC = [...this.state.bingoCard]; // For user to remember
        let rW = [...this.state.randomWords]; // Overall 'deck' of words
        let rS = [...this.state.randSet]; // To test user
        var len = 8;

        shuffle(rW); // Randomise wordbank 
        for (var i = 0; i <= len; i++) {
            bC[i] = rW[i]; // Assign user "bingo card" (words to remember)
        }
        shuffle(rW); // Randomise again 

        for (var i=0; i <=(len*2); i++) {
            if( i <= len) { rS[i] = bC[i]; } // Assign words from bingocard 
            if(i > len) {rS[i] = rW[i]; } // Assign some random ones
        }
        shuffle(rS); // Randomise order 

        this.setState({ bingoCard: bC, randomWords: rW, randSet: rS});
        this.setState({ bingoCardLen: len});

        /* Begin clock */
        this.setState({ timeVar: setInterval(this.updateClock, 1000)});           
        this.generateRandom();      
    }

    /* 0 = no, 1 = yes*/
    validateLvl(ans) {
        if(this.state.gameStarted){
            let currentWord = this.state.randSet[this.state.randPromptCount];
            let bingoCard = [...this.state.bingoCard];

            let len = this.state.bingoCardLen;
            var count = 0;

            /* Check if user pressed no correctly */
            if(ans == 0) {
                for(i=0; i <= len; i++) {
                    if  (currentWord != bingoCard[i]) {
                        count++;
                    }
                }
                if (count == len) { // If user said no and they're correct
                    alert("Correct!");
                }
                else { // If user said no and they're wrong 
                    alert("Wrong!");
                    this.setState({wrongGuess: this.state.wrongGuess + 1});
                }
            }

            /* Check if user pressed yes correctly */
                if (ans==1) {
                    for(i=0; i <= len; i++) {
                        if (currentWord == bingoCard[i]) { 
                            count++;
                        }
                    }
                    if(count == 1) { // If user said yes and they're correct 
                        alert("Correct!");
                        this.setState({bingoCardFound: this.state.bingoCardFound + 1});
                    }
                    else { // If user said yes and they're wrong
                        alert("Wrong!");
                        this.setState({wrongGuess: this.state.wrongGuess + 1});
                    }
                }
                if(this.state.wrongGuess < 3) {
                    this.generateRandom();
                }    
                else {
                    alert("You lose! you got " + this.state.bingoCardFound + " right!" );
                    this.resetVars();
                }
        }
    }
    generateRandom() {
            this.setState({randPromptCount: this.state.randPromptCount-1});
            if (this.state.randBoxPromptCount == 0) {
                alert("YOU WIN!");
                this.resetVars();
            }
    }

    resetVars() {
        this.setState({
            timer: null, gameStarted: false, bingoCard: 0, randSet: 0,
            randPromptCount: 16, bingoCardLen: null, 
            bingoCardFound: 0, wrongGuess: 0,     
            beginText: "Press to Begin!",
        });
    }

    // Function to fade in card with timer
    renderCard(startTime) {
        if(this.state.timer > startTime) {
            return( 
                <BingoFadeView style={{height: "100%", width: "100%", fontSize: 76, alignContent: "center", justifyContent: "center", }}
                startTime = {startTime}
                >
                    <Row style={{ flex: 0.05 }}></Row>
                    <Row>
                        <Col style={[styles.bingoButton]}><Text style={{ fontSize: 24 }}>{this.state.bingoCard[3]}</Text></Col>
                        <Col style={[styles.bingoButton]}><Text style={{ fontSize: 24 }}>{this.state.bingoCard[4]}</Text></Col>
                        <Col style={[styles.bingoButton]}><Text style={{ fontSize: 24 }}>{this.state.bingoCard[5]}</Text></Col> 
                    </Row> 
                    <Row>
                        <Col style={[styles.bingoButton]}><Text style={{fontSize: 24}}>{this.state.bingoCard[0]}</Text></Col>
                        <Col style={[styles.bingoButton]}><Text style={{ fontSize: 24 }}>{this.state.bingoCard[1]}</Text></Col>
                        <Col style={[styles.bingoButton]}><Text style={{ fontSize: 24 }}>{this.state.bingoCard[2]}</Text></Col>
                    </Row>
                   <Row>
                        <Col style={[styles.bingoButton]}><Text style={{ fontSize: 24 }}>{this.state.bingoCard[6]}</Text></Col>
                        <Col style={[styles.bingoButton]}><Text style={{ fontSize: 24 }}>{this.state.bingoCard[7]}</Text></Col>
                        <Col style={[styles.bingoButton]}><Text style={{ fontSize: 24 }}>{this.state.bingoCard[8]}</Text></Col>
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
                <Text style={{fontSize:24}}>Words found: {this.state.bingoCardFound}/{this.state.bingoCard.length}</Text>
                <Text style={{ fontSize: 24 }}>Wrong Guesses: {this.state.wrongGuess}</Text>
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
                                    {this.renderWord(6)}
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
                        <TouchableOpacity style={[styles.roundedButton]} onPress={() => this.beginButton()}>
                            <Text style={[styles.buttonText]}>{this.state.beginText}</Text>
                        </TouchableOpacity>
                    </Row>
                <Row style={{flex: 0.05}}></Row>
                </Grid> 
                </View>
            </View>
        );
    }
}

export default FRScreenCustom;
