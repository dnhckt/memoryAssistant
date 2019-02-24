import React, { Component } from "react";
import {Col, Row, Grid} from "react-native-easy-grid";
import {Alert, Button, TouchableOpacity, View, Text, Image} from 'react-native';
import Sprites from '../src/Sprites';
import styles from '../src/Style';
import ImageFadeView from '../src/ImageFadeView';
import PromptFadeView from '../src/PromptFadeView';

/*
    Screen for the basic PAL Test
    To do:
        -> Randomise the prompt images             
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

// Class for the game
class PALScreen extends Component {
    static navigationOptions = {
        title: "Picture Match Game" 
    }
    constructor(props){
        super(props);
        this.state = {
            // Array to store sprites
           spriteArray: [Sprites.beach, Sprites.bev, Sprites.bikini, 
                               Sprites.bishop, Sprites.coconut, Sprites.dolphin,
                               Sprites.man, Sprites.woman, Sprites.tiki, Sprites.necklace,
                               Sprites.harbour, Sprites.pineapple, Sprites.volcano], 
           levelNum: 0, // Control level num 
           timeVar: null, // Control timer 
           timer: 0, // timer 

           /* BOX VARS (Index, startTime, endTime) */
           box1: null, box1Start: null, box1End: null, // Top left  
            
           box2: null, box2Start: null, box2End: null, // Top mid 
           
           box3: null, box3Start: null, box3End: null, // Top right
           
           box4: null, box4Start: null, box4End: null, // Bot left
           
           box5: null, box5Start: null, box5End: null,  // Bot mid
           
           box6: null, box6Start: null, box6End: null,// Bot right
           /* End box vars */

            promptBox: null, //Prompt box image
            promptBoxStart: null,

            randBoxArray: [0, 1, 2, 3, 4, 5], // Array for box vars
            inputIndex: 0, // To advance user input
            firstRandPrompt: null,

            beginText: "Press to Begin!",
            leftCounter: 0, // To display images left
        }
    }

    // When game starts 
    componentDidMount() {     
        // alert("In this game, wait for the images to flash up. When displayed at the bottom, remember where they were hidden.") 
    }
    componentWillUnmount() {
        this.resetBoxes();
        this.setState({timer: 0});
        clearInterval(this.state.timeVar);
    }
    componentDidUpdate() {
        if(this.state.timer == 5){ 
           // alert("box1: " + this.state.box1Start + " box2: " + this.state.box2Start + " box3: " + this.state.box3Start);
        }
    }

    // To prevent begin button leak
    beginButton() {
        if(!this.state.gameStarted) {
            this.beginGame();
        }
    }
    beginGame() {   
        this.setState({timer: 0});
        this.setState({beginText: this.state.levelNum+1 + " Img(s) Left"});
        clearInterval(this.state.timeVar);
        
        let gameStarted = true;
        let level = this.state.levelNum + 1;

        this.setState({timeVar: setInterval(this.updateClock,1000), gameStarted, levelNum: level});
        this.generateRand(gameStarted, level); 
    }
    
    validateLvl(correctAnswer, index) {
        this.resetBoxes();
        let count = this.state.leftCounter;
        if(correctAnswer) {
            count = count + 1;
            this.setState({leftCounter: count});
            this.setState({beginText: this.state.levelNum-count + " Img(s) Left"});

            if(this.state.levelNum == 1) {
                // alert("Next Level");
                this.setState({leftCounter: 0});
                this.beginGame(); 
            }
            else {
                if(this.state.levelNum == 7)
                {
                    this.setState({gameStarted: false});
                    alert("You win!");                     
                }
                else if(this.state.levelNum-1 > index)
                {
                    this.setState({inputIndex: index+1});
                    this.setState({promptBox: this.state.spriteArray[index+1], promptBoxStart: this.state.timer+1})
                    // alert("Correct!");
                }
                else {
                    // alert("Next Level");
                    this.setState({leftCounter: 0});
                    this.beginGame();
                }
            }
        }  
        else {
            alert("Game over.\n\n\n          You made it to level " + this.state.levelNum + "!");
            this.setState({gameStarted: false, levelNum: 0, beginText: "Press to Begin!"});
            this.resetBoxes();
        }

    }
    

    resetBoxes() {
        this.setState({box1: null, box2: null, box3: null, box4: null, box5: null, box6: null});
        this.setState({box1Start: null, box2Start: null, box3Start: null, box4Start: null, box5Start: null, box6Start: null});
        this.setState({box1End: null, box2End: null, box3End: null, box4End: null, box5End: null, box6End: null});
        this.setState({promptBox: null, promptBoxStart: null, inputIndex: 0, beginText: "Press To Begin!"});
    }

    // Function to generate random numbers 
    generateRand(gameStarted,level) {
        if(gameStarted) {

            shuffleContents(this.state.spriteArray); // randomise order of sprites 
            let randBoxArray = [...this.state.randBoxArray];
            for (var i=0; i <= level; i++) 
            {
                 shuffleContents(randBoxArray); // randomise order of boxes  
                 this.setState({randBoxArray});   
            }             
  
            // Level based random images
            for (var i=0; i < level; i++) 
            {
                // alert("level: " + this.state.levelNum + " index: " + this.state.inputIndex);            
                let y = i + 1;
                switch (randBoxArray[i]) { 
                    case 0:
                       this.setState({box1: this.state.spriteArray[i], box1Start: i, box1End: y});
                    break;
                    case 1:
                        this.setState({box2: this.state.spriteArray[i], box2Start: i, box2End: y});
                    break;
                    case 2:
                        this.setState({box3: this.state.spriteArray[i], box3Start: i, box3End: y});
                    break;
                    case 3:
                        this.setState({box4: this.state.spriteArray[i], box4Start: i, box4End: y});
                    break;  
                    case 4:
                        this.setState({box5: this.state.spriteArray[i], box5Start: i, box5End: y});
                    break;
                    case 5:
                        this.setState({box6: this.state.spriteArray[i], box6Start: i, box6End: y});
                    break;       
                }
                switch (randBoxArray[i]) { 
                        case 1:
                        var firstPic = i; // Find the box with lowest start time to set as first prompt pic
                        break;
                        case 6: 
                        var lastPic = i; // find last pic
                        break
                }
            }
            
            // if(level == 1) {}
            this.setState({promptBox: this.state.spriteArray[0], promptBoxStart: this.state.levelNum+1});    
            /* Randomise the prompt images */
            // else {
            //     this.state.firstRandPrompt =  Math.floor((Math.random() * 5)); 
            //     this.setState({promptBox: this.state.spriteArray[this.state.firstRandPrompt], promptBoxStart: this.state.box1End+1});    
            // }
        }
    }

    updateClock=()=> {
        this.setState({timer: this.state.timer + 1}) // Stores clock second var as timer 
    }

    // Function to fade in image with timer
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
    // Function to display prompt
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

    // Function to validate user input
    userInput(input) {
        if(this.state.timer > this.state.promptBoxStart+0.5) // Prevent too soon input with half second delay
        {
            let i = this.state.inputIndex;
            switch(input) {
                    case 0:
                        if(this.state.randBoxArray[i] == 0) {this.validateLvl(true, i);i++;}
                        else{this.validateLvl(false, i);}
                    break;
                    case 1:
                        if(this.state.randBoxArray[i] == 1) {this.validateLvl(true, i);i++;}
                        else{this.validateLvl(false, i);}
                    break;
                    case 2:
                        if(this.state.randBoxArray[i] == 2) {this.validateLvl(true, i);i++;}
                        else{this.validateLvl(false, i);}
                    break;
                    case 3:
                        if(this.state.randBoxArray[i] == 3) {this.validateLvl(true, i);i++;}
                        else{this.validateLvl(false, i);}
                    break;
                    case 4:
                        if(this.state.randBoxArray[i] == 4) {this.validateLvl(true, i);i++;}
                        else{this.validateLvl(false, i);}
                    break;
                    case 5:
                        if(this.state.randBoxArray[i] == 5) {this.validateLvl(true, i);i++;}
                        else{this.validateLvl(false, i);}
                    break;
                }
        }
    }
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
                        <Col style={{borderWidth: 5, marginTop: '1%', marginBottom: '1%', borderRadius: 20}}>
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