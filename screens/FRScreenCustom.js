import React, { Component } from "react";
import { Alert, Button, TouchableOpacity, View, Text, Image } from 'react-native';

import {ImagePicker} from 'expo';
import { Col, Row, Grid } from "react-native-easy-grid";

import PromptFadeView from '../src/PromptFadeView';
import BingoFadeView from '../src/BingoFadeView';
import styles from '../src/Style';


/*
    Screen for the personal FR Test
    ========
    User is displayed a bingo card they must memorize 
    Personal words are displayed one by one
    User must press yes or no for whether the word was on the card  
    After three wrong guesses or all words are found the game ends
*/

/**
 * @function shuffleContents
 *  Randomizes the order of objects in an array
 *  @param {array}  array - The array to randomize
 *  @return {array} The randomized array
*/
function shuffleContents(array) {
    var x, y, z;
    for (x = array.length - 1; x > 0; x--) {
        y = Math.floor(Math.random() * (x + 1));
        z = array[x];
        array[x] = array[y];
        array[y] = z;
    }
    return array;
}

/**
 * @class FRScreenCustom
 * Contains all functions for game logic and JSX for the screen
 */
class FRScreenCustom extends Component {
    static navigationOptions = {
        title: "Custom Word Bingo",
    }
    constructor(props){
        super(props);

        /* Declare game variables */
        this.state = { 
            gameStarted: false,
            bingoCard: [""],
            randSet: [""],
            randomWords: [
                "wedding", "holiday", "children", "magical", "birthday",
                "family", "together", "christmas", "loved", "first",
                "hawaii", "greece", "best", "anniversary", "friend",
                "ship", "joy", "laugh", "success", "win",
                "rainbow", "smile", "rainbows", "celebrate", "weekend",
                "fun", "beach", "beautiful", "sunshine", "delicious",
                "paradise", "sweet", "praise", "memories", "present",
                "team", "freedom", "butterflies", "award", "call",
                "chocolate", "hug", "relax", "nostalgic", "bed",
                "pizza", "wonderful", "sunshine", "tropical", "cupcakes",
            ],
            randPromptCount: 17,
            bingoCardLen: null,
            bingoCardFound: 0,
            wrongGuess: 0,

            thumb: require('../assets/thumbIcon/thumb.png'),
            beginText: "Press to Begin!",
            timer: null,
        }
    }
 /**
    *  @function componentWillUnmount
    *  Reset all state variables when leaving the page
    */
    componentWillUnmount() {
        clearInterval(this.state.timeVar);
        this.resetVars();
    }

    /**
   *  @function updateClock
   *  Starts game timer used to control image displays
   */
   updateClock = () => {
        this.setState({ timer: this.state.timer + 1 }) // Stores clock second var as timer 
    }

    /**
     * @function beginButton
     *  Simple boolean rule to ensure 'Begin Game' button cannot be repeatedly pressed
     */
    beginButton() {
        if (!this.state.gameStarted) {
            this.beginGame();
        }
    }
    /**
     * @function beginGame
     *  Function to set up game variables and begin when 'Begin Game' button is activated
     */
    beginGame() {
        this.setState({ gameStarted: true });

        let bC = [...this.state.bingoCard]; // For user to remember
        let rW = [...this.state.randomWords]; // Overall 'deck' of words
        let rS = [...this.state.randSet]; // To test user
        var len = 8;

        shuffleContents(rW); // Randomise wordbank 
        for (var i = 0; i <= len; i++) {
            bC[i] = rW[i]; // Assign user "bingo card" (words to remember)
        }
        shuffleContents(rW); // Randomise again 

        for (var i = 0; i <= (len * 2); i++) {
            if (i <= len) { rS[i] = bC[i]; } // Assign words from bingocard 
            if (i > len) { rS[i] = rW[i]; } // Assign some random ones
        }
        shuffleContents(rS); // Randomise order 

        this.setState({ bingoCard: bC, randomWords: rW, randSet: rS });
        this.setState({ bingoCardLen: len });

        /* Begin clock */
        this.setState({ timeVar: setInterval(this.updateClock, 1000) });
        this.generateRandom();
    }
    
    /**
    * @function generateRandom
    *  Shuffles arrays to display a random sequence of words
    */ 
    generateRandom() {
        this.setState({ randPromptCount: this.state.randPromptCount - 1 });
        if (this.state.randBoxPromptCount == 0) {
            alert("YOU WIN!");
            this.resetVars();
        }
    }

    /**
     * @function validateLvl
     *  Check if user tapped the correct button   
     * @param {number} ans - 0 for wrong, 1 for correct 
     */
    validateLvl(ans) {

        /* If game loop + past time to remember cards */
        if (this.state.gameStarted && this.state.timer > 6) {
            let currentWord = this.state.randSet[this.state.randPromptCount];
            let bingoCard = [...this.state.bingoCard];

            let len = this.state.bingoCardLen;
            var count = 0;

            /* Check if user pressed no correctly */
            if (ans == 0) {
                for (i = 0; i < len; i++) {
                    if (currentWord != bingoCard[i]) {
                        count++;
                    }
                }
                // If user said no and they're correct
                if (count == len) { 
                    alert("Correct!");
                }
                // If user said no and they're wrong
                else {  
                    alert("Wrong!");
                    this.setState({ wrongGuess: this.state.wrongGuess + 1 });
                }
            }

            /* Check if user pressed yes correctly */
            if (ans == 1) {
                for (i = 0; i <= len; i++) {
                    if (currentWord == bingoCard[i]) {
                        count++;
                    }
                }
                // If user said yes and they're correct 

                if (count == 1) { 
                    alert("Correct!");
                    this.setState({ bingoCardFound: this.state.bingoCardFound + 1 });
                    if (this.state.bingoCardFound == 9) {
                        alert("YOU WIN!");
                        console.log("User managed to find: " + this.state.bingoCardFound); // To show user results
                        this.resetVars();
                    }
                }
                 // If user said yes and they're wrong
                else {
                    alert("Wrong!");
                    this.setState({ wrongGuess: this.state.wrongGuess + 1 });
                }
            }
            // Keep going while user has three lives
            if (this.state.wrongGuess <= 3) {
                this.generateRandom();
            }
            // End game
            else {
                alert("You lose! you got " + this.state.bingoCardFound + " right!");
                console.log("User managed to find: " + this.state.bingoCardFound); // To show user results
                this.resetVars();
            }
        }
    }

    /**
     *  @function renderCard
     *  Displays words (bingo card) to remember for 5 seconds
     * @param {number} startTime - The time it appears
     */
    renderCard(startTime) {
        if (this.state.timer > startTime) {
            return (
                <BingoFadeView style={{ height: "100%", width: "100%", fontSize: 76, alignContent: "center", justifyContent: "center", }}
                    startTime={startTime}
                >
                    <Row style={{ flex: 0.05 }}></Row>
                    <Row>
                        <Col style={[styles.bingoButton]}><Text style={[styles.bingoText]}>{this.state.bingoCard[3]}</Text></Col>
                        <Col style={[styles.bingoButton]}><Text style={[styles.bingoText]}>{this.state.bingoCard[4]}</Text></Col>
                        <Col style={[styles.bingoButton]}><Text style={[styles.bingoText]}>{this.state.bingoCard[5]}</Text></Col>
                    </Row>
                    <Row>
                        <Col style={[styles.bingoButton]}><Text style={[styles.bingoText]}>{this.state.bingoCard[0]}</Text></Col>
                        <Col style={[styles.bingoButton]}><Text style={[styles.bingoText]}>{this.state.bingoCard[1]}</Text></Col>
                        <Col style={[styles.bingoButton]}><Text style={[styles.bingoText]}>{this.state.bingoCard[2]}</Text></Col>
                    </Row>
                    <Row>
                        <Col style={[styles.bingoButton]}><Text style={[styles.bingoText]}>{this.state.bingoCard[6]}</Text></Col>
                        <Col style={[styles.bingoButton]}><Text style={[styles.bingoText]}>{this.state.bingoCard[7]}</Text></Col>
                        <Col style={[styles.bingoButton]}><Text style={[styles.bingoText]}>{this.state.bingoCard[8]}</Text></Col>
                    </Row>
                </BingoFadeView>
            );
        }
    }

    /**
    *  @function renderWord
    *  Displays words to test user memory
    * @param {number} startTime - The time it appears
    */
    renderWord(startTime) {
        if (this.state.timer > startTime) {
            return (
                <PromptFadeView
                    style={{ height: "100%", width: "100%", fontSize: 76, alignContent: "center", justifyContent: "center" }}
                    startTime={startTime}
                >
                    <Text style={[styles.bingoText]}>Words found: {this.state.bingoCardFound}/{this.state.bingoCard.length}</Text>
                    <Text style={[styles.bingoText]}>Wrong Guesses: {this.state.wrongGuess}</Text>
                    <Row></Row>
                    <Text style={{ fontSize: 72 , textAlign: 'center'}}>{this.state.randSet[this.state.randPromptCount]}</Text>
                    <Row style={{}}></Row>
                </PromptFadeView>
            );
        }
    }

    /**
     *  @function resetVars
     *  Called at end of game to reset state variables
     */
    resetVars() {
        clearInterval(this.state.timeVar);
        this.setState({
            timer: null, gameStarted: false, bingoCard: 0, randSet: 0,
            randPromptCount: 18, bingoCardLen: null,
            bingoCardFound: 0, wrongGuess: 0,
            beginText: "Press to Begin!",
        });
    }

    /* Contains the content that is shown to the user */
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.max}>

                    {/*  Game Arena: */}
                    <Grid>

                        <Row style={{ flex: 2 }}>
                            <Row style={{ flex: 0.1 }}></Row>
                            <Row>
                                <Col>
                                    {this.renderWord(6)}
                                    {this.renderCard(0)}
                                </Col>
                            </Row>
                            <Row style={{ flex: 0.1 }}></Row>
                        </Row>

                        <Row style={{ alignContent: "center", alignItems: "center" }}>
                            <Col style={{ flex: 0.4 }}></Col>
                            <Col><TouchableOpacity style={[styles.FRYesButton]} onPress={() => this.validateLvl(1)}>
                                <Image source={require('../assets/thumbIcon/thumb.png')} style={[styles.FRThumbUp]}></Image>
                            </TouchableOpacity></Col>
                            <Col></Col>

                            <Col><TouchableOpacity style={[styles.FRNoButton]} onPress={() => this.validateLvl(0)}>
                                <Image source={require('../assets/thumbIcon/thumb.png')} style={[styles.FRThumbDown]}></Image>
                            </TouchableOpacity></Col>
                            <Col style={{ flex: 0.8 }}></Col>
                        </Row>

                        <Row style={[styles.roundedButtonWrap]}>
                            <TouchableOpacity style={[styles.roundedButton]} onPress={() => this.beginButton()}>
                                <Text style={[styles.buttonText]}>{this.state.beginText}</Text>
                            </TouchableOpacity>
                        </Row>
                        <Row style={{ flex: 0.05 }}></Row>
                    </Grid>
                </View>
            </View>
        );
    }
}

export default FRScreenCustom;

