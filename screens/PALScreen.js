import React, { Component } from "react";
import {Col, Row, Grid} from "react-native-easy-grid";
import {Alert, Button, TouchableOpacity, View, Text, Image} from 'react-native';
import {Speech} from 'expo';

import Sprites from '../src/Sprites';
import styles from '../src/Style';
import ImageFadeView from '../src/ImageFadeView';
import PromptFadeView from '../src/PromptFadeView';

/*
    Screen for the basic PAL Test
    ========
    User is displayed a sequence of images in random boxes from levels 1 -6 (level num = length of sequence)
    User must tap the box where an image was when it appears in the prompt box
*/

/**
 * @function shuffleContents 
 *  Randomizes the order of objects in an array
 *  @param {array} The array to randomize 
 *  @return {array} The randomized array 
*/
function shuffleContents(array){
    var x, y, z;
    for (x = array.length - 1; x > 0; x--) {
        y = Math.floor(Math.random() * (x+1));
        z = array[x];
        array[x] = array[y];
        array[y] = z; 
    }
    return array;
}

/**
 * @class PALScreen
 * Contains all functions for game logic and JSX for the screen
 */
class PALScreen extends Component {
    static navigationOptions = {
        title: "Picture Match Game" 
    }
    constructor(props){
        super(props);

        /* Declare game variables */
        this.state = {
           spriteArray: [Sprites.beach, Sprites.bev, Sprites.bikini, 
                               Sprites.bishop, Sprites.coconut, Sprites.dolphin,
                               Sprites.man, Sprites.woman, Sprites.tiki, Sprites.necklace,
                               Sprites.harbour, Sprites.pineapple, Sprites.volcano], 
           levelNum: 0,  
           timeVar: null, 
           timer: 0, 

           /* BOX VARS (Index, startTime, endTime) */
           box1: null, box1Start: null, box1End: null, // Top left  
            
           box2: null, box2Start: null, box2End: null, // Top mid 
           
           box3: null, box3Start: null, box3End: null, // Top right
           
           box4: null, box4Start: null, box4End: null, // Bot left
           
           box5: null, box5Start: null, box5End: null,  // Bot mid
           
           box6: null, box6Start: null, box6End: null,// Bot right
           /* End box vars */

            // Prompt box image + start time
            promptBox: null,
            promptBoxStart: null,
            randBoxArray: [0, 1, 2, 3, 4, 5], 

            inputIndex: 0, // To advance user input

            beginText: "Press to Begin!",
            leftCounter: 0, // To display images left
        }
    }

    /**
     *  @function componentWillUnmount 
     *  Reset all state variables when leaving the page
     */
    componentWillUnmount() {
        this.resetBoxes();
        this.setState({timer: 0});
        clearInterval(this.state.timeVar);
    }

    /**   
     *  @function updateClock
     *  Starts game timer used to control image displays 
     */
    updateClock = () => {
        this.setState({ timer: this.state.timer + 1 })
    }

    /**
     * @function beginButton 
     *  Simple boolean rule to ensure 'Begin Game' button cannot be repeatedly pressed 
     */
    beginButton() {
        if(!this.state.gameStarted) {
            this.beginGame();
        }
    }

    /**
     * @function beginGame
     *  Function to set up game variables and begin level 1 when 'Begin Game' button is activated
     */
    beginGame() {   
        this.setState({timer: 0});
        this.setState({beginText: this.state.levelNum+1 + " Img(s) Left"});
        clearInterval(this.state.timeVar);
        
        let gameStarted = true;
        let level = this.state.levelNum + 1;

        this.setState({timeVar: setInterval(this.updateClock,1000), gameStarted, levelNum: level});
        this.generateRand(gameStarted, level); 
    }

   /**
    * @function generateRand 
    *  Shuffles arrays to display a random sequence of images
    * @param {boolean} gameStarted  - (boolean value to start the game loop)
    * @param {number} level  - the level number (number of images to randomly display)
    */
    generateRand(gameStarted, level) {
        
        if (gameStarted) {
 
            /* Randomise a) which sprite to display and b) where it appears on the screen */
            shuffleContents(this.state.spriteArray);
            let randBoxArray = [...this.state.randBoxArray];

            for (var i = 0; i <= level; i++) {
                shuffleContents(randBoxArray); 
                this.setState({ randBoxArray });
            }

            /* Display random images in a random box up to level num */
            for (var i = 0; i < level; i++) {
                let y = i + 2.5;
                switch (randBoxArray[i]) {
                    case 0:
                        this.setState({ box1: this.state.spriteArray[i], box1Start: i, box1End: y });
                        break;
                    case 1:
                        this.setState({ box2: this.state.spriteArray[i], box2Start: i, box2End: y });
                        break;
                    case 2:
                        this.setState({ box3: this.state.spriteArray[i], box3Start: i, box3End: y });
                        break;
                    case 3:
                        this.setState({ box4: this.state.spriteArray[i], box4Start: i, box4End: y });
                        break;
                    case 4:
                        this.setState({ box5: this.state.spriteArray[i], box5Start: i, box5End: y });
                        break;
                    case 5:
                        this.setState({ box6: this.state.spriteArray[i], box6Start: i, box6End: y });
                        break;
                }

                /* Find the box with lowest start time and use as first prompt image (for level 1 + first prompt) */
                switch (randBoxArray[i]) {
                   case 1:
                        var firstPic = i; 
                        break;
                    case 6:
                        var lastPic = i; // find last pic
                        break
                }
            }

            // if(level == 1) {}
            
            /* Display first prompt */
            this.setState({ promptBox: this.state.spriteArray[0], promptBoxStart: this.state.levelNum + 1 });
            
            /* Randomise the prompt images */
            // else {
            //     this.state.firstRandPrompt =  Math.floor((Math.random() * 5)); 
            //     this.setState({promptBox: this.state.spriteArray[this.state.firstRandPrompt], promptBoxStart: this.state.box1End+1});    
            // }
        }
    }
    

    /**
     *  @function userInput
     *  Checks which box users select + call validateLvl
     * @param {number} input  - a value from (1-6) that is passed from the box they tap on 
     */
    userInput(input) {
        
        // Prevent too soon input with half second delay
        if (this.state.timer > this.state.promptBoxStart + 0.5) { 
            let i = this.state.inputIndex;
            switch (input) {
                case 0:
                    if (this.state.randBoxArray[i] == 0) { this.validateLvl(true, i); i++; }
                    else { this.validateLvl(false, i); }
                    break;
                case 1:
                    if (this.state.randBoxArray[i] == 1) { this.validateLvl(true, i); i++; }
                    else { this.validateLvl(false, i); }
                    break;
                case 2:
                    if (this.state.randBoxArray[i] == 2) { this.validateLvl(true, i); i++; }
                    else { this.validateLvl(false, i); }
                    break;
                case 3:
                    if (this.state.randBoxArray[i] == 3) { this.validateLvl(true, i); i++; }
                    else { this.validateLvl(false, i); }
                    break;
                case 4:
                    if (this.state.randBoxArray[i] == 4) { this.validateLvl(true, i); i++; }
                    else { this.validateLvl(false, i); }
                    break;
                case 5:
                    if (this.state.randBoxArray[i] == 5) { this.validateLvl(true, i); i++; }
                    else { this.validateLvl(false, i); }
                    break;
            }
        }
    }

    /**
     * @function validateLvl 
     *  Compare user selection to correct answer + advance level / end game accordingly
     * @param {boolean} correctAnswer - Whether user selected correct answer
     * @param {number} index  - Index of which image is being tested
     */
    validateLvl(correctAnswer, index) {
        
        /* Prevent box value leaks */
        this.resetBoxes();
        let count = this.state.leftCounter;

         /* If user is correct */
        if(correctAnswer) {
            count = count + 1;
            this.setState({leftCounter: count});
            this.setState({beginText: this.state.levelNum-count + " Img(s) Left"});
            
            /*  If level one, advance */
            if(this.state.levelNum == 1) {
                this.setState({leftCounter: 0});
                this.beginGame(); 
            } else {
                
                /* If level 6 complete, end game */
                if(this.state.levelNum == 7)
                {
                    this.setState({gameStarted: false});
                    alert("You win!");            
                    console.log("User got to level: " + this.state.levelNum); // To show user result
                }

                /* Otherwise, advance index */
                else if(this.state.levelNum-1 > index)
                {
                    this.setState({inputIndex: index+1});
                    this.setState({promptBox: this.state.spriteArray[index+1], promptBoxStart: this.state.timer+1})
                }
                
                /* if last index, advance level */
                else {
                    this.setState({leftCounter: 0});
                    this.beginGame();
                }
            }
        }  

        /* If user is incorrect, end game & reset state variables */
        else {
            alert("Game over.\n\n\n          You made it to level " + this.state.levelNum + "!");
            console.log("User got to level: " + this.state.levelNum); // To show user result
            this.setState({gameStarted: false, levelNum: 0, beginText: "Press to Begin!"}); 
            this.resetBoxes();
        }
    }   

    /**
     *  @function renderImg 
     *  Displays image in box at given time 
     * @param {Image} img - The image to display
     * @param {number} startTime - The time it appears
     * @param {number} endTime - The time it disappears
     */
    renderImg(img, startTime, endTime) {
        if(this.state.timer > startTime) {
            return( 
                <ImageFadeView style={{}}
                startTime = {startTime}
                endTime = {endTime}
                >
                    <Image style={{maxHeight: '100%', maxWidth: '100%'}} source={img}></Image>
                </ImageFadeView>   
            );
        }
    }

    /**
     *  @function renderPromptImg
     *  Displays the prompt image on the screen/.
     * @param {Image} img - The image to display
     * @param {number} startTime - The time it appears
     */
    renderPromptImg(img, startTime) {
        if(this.state.timer > startTime) {
            return( 
                <PromptFadeView 
                startTime = {startTime}
                >
                    <Image style={{ height: '100%', width: '100%', borderRadius: 20}} source={img}></Image>
                </PromptFadeView>   
            );
        }
    }

    /**
     *  @function resetBoxes 
     *  Called at end of game to reset state variables 
     */
    resetBoxes() {
        this.setState({ box1: null, box2: null, box3: null, box4: null, box5: null, box6: null });
        this.setState({ box1Start: null, box2Start: null, box3Start: null, box4Start: null, box5Start: null, box6Start: null });
        this.setState({ box1End: null, box2End: null, box3End: null, box4End: null, box5End: null, box6End: null });
        this.setState({ promptBox: null, promptBoxStart: null, inputIndex: 0, beginText: "Press To Begin!" });
    }
 
    /* Contains the content that is shown to the user */ 
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.max}>
                
                {/*  Game Arena: */}
                <Grid>
                    <Row>
                        <Col style={[styles.gameButtonCol]}>
        {/* Box 1 */}   
                            <TouchableOpacity style={[styles.gameButton]} onPress={()=>this.userInput(0)}>
                                {this.renderImg(this.state.box1, this.state.box1Start, this.state.box1End)} 
                            </TouchableOpacity>
                        </Col>
                        <Col style={[styles.gameButtonCol]}>
        {/* Box 2 */}   
                            <TouchableOpacity style={[styles.gameButton]} onPress={()=>this.userInput(1)}>
                                {this.renderImg(this.state.box2, this.state.box2Start, this.state.box2End)}
                            </TouchableOpacity>
                        </Col>
                        <Col style={[styles.gameButtonCol]}>
        {/* Box 3 */}   
                            <TouchableOpacity style={[styles.gameButton]} onPress={()=>this.userInput(2)}>
                                {this.renderImg(this.state.box3, this.state.box3Start, this.state.box3End)}
                            </TouchableOpacity>
                        </Col>
                    </Row> 

                    <Row>
                    <Col style={[styles.gameButtonCol]}>
        {/* Box 4  */}
                            <TouchableOpacity style={[styles.gameButton]} onPress={()=>this.userInput(3)}>
                                {this.renderImg(this.state.box4, this.state.box4Start, this.state.box4End)}
                            </TouchableOpacity>
                    </Col>
                    <Col style={[styles.gameButtonCol]}>
        {/* Box 5  */}
                            <TouchableOpacity style={[styles.gameButton]} onPress={()=>this.userInput(4)}>
                                {this.renderImg(this.state.box5, this.state.box5Start, this.state.box5End)}
                            </TouchableOpacity>
                    </Col>
                    <Col style={[styles.gameButtonCol]}>
        {/* Box 6  */}
                           <TouchableOpacity style={[styles.gameButton]} onPress={()=>this.userInput(5)}>
                                {this.renderImg(this.state.box6, this.state.box6Start, this.state.box6End)}
                            </TouchableOpacity>
                    </Col>
                    </Row>

                    <Row style={{}}>
                        <Col>
                        </Col>
                            <Col style={{ borderWidth: 5, borderColor: '#34495e', marginTop: '1%', marginBottom: '1%', borderRadius: 20}}>
        {/* Prompt Box */}   
                        {this.renderPromptImg(this.state.promptBox, this.state.promptBoxStart)}
                        </Col>
                        <Col>
                    </Col>
                    </Row>
                    <Row style={[styles.roundedButtonWrap]}>
                            <TouchableOpacity style={[styles.roundedButton]} onPress={()=>this.beginButton()}>
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

export default PALScreen;