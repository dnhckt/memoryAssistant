import React, { Component } from "react";
import {Col, Row, Grid} from "react-native-easy-grid";
import {Alert, TouchableOpacity, View, Text, Image} from 'react-native';
import Sprites from '../assets/Sprites';
import styles from '../assets/Style';
import ImageFadeView from '../assets/ImageFadeView';
import PromptFadeView from '../assets/PromptFadeView';
    /*
        Screen for the basic PAL Test
        To do:
            -> Fix timings
            -> Randomise the prompt images 
            -> Tutorial? Feedback?
            
    */
function shuffle(array) {
    var j, x, i;
    for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = array[i];
        array[i] = array[j];
        array[j] = x;
    }
    return array;
}
// Class for the game
class PALScreen extends Component {
    static navigationOptions = {
        title: "PAL Test",
    }
    constructor(props){
        super(props);
        this.state = {
            // Array to store sprites
            spriteArray: [Sprites.beach, Sprites.bev, Sprites.bikini, 
                          Sprites.bishop, Sprites.coconut, Sprites.dolphin], //Sprites.fish],
            
            levelNum: 0, // Control level num 
            timeVar: null, // Control timer 

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
            timer: 0, // timer 
            inputIndex: 0, // To advance user input
        }
    }

    // When game starts 
    componentDidMount() {          
        this.beginGame();1
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

    beginGame() {   
        this.setState({timer: 0});
        clearInterval(this.state.timeVar);
        
        let gameStarted = true;
        let level = this.state.levelNum + 1;

        this.setState({timeVar: setInterval(this.updateClock,1000), gameStarted, levelNum: level});
        this.generateRand(gameStarted, level);
    }
    
    validateLvl(correctAnswer, index) {
        this.resetBoxes();
        if(correctAnswer) {

            if(this.state.levelNum == 1) {
                alert("Next Level");
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
                }
                else {
                    alert("Next Level");
                    this.beginGame();
                }
            }
        }  
        else {
            alert("Incorrect! Game over.");
            this.setState({gameStarted: false});
        }

    }

    resetBoxes() {
        this.setState({box1: null, box2: null, box3: null, box4: null, box5: null, box6: null});
        this.setState({box1Start: null, box2Start: null, box3Start: null, box4Start: null, box5Start: null, box6Start: null});
        this.setState({box1End: null, box2End: null, box3End: null, box4End: null, box5End: null, box6End: null});
        this.setState({promptBox: null, promptBoxStart: null, inputIndex: 0});
    }

    // Function to generate random numbers 
    generateRand(gameStarted,level) {
        if(gameStarted) {

            shuffle(this.state.spriteArray); // randomise order of sprites 
            let randBoxArray = [...this.state.randBoxArray];
            for (var i=0; i <= level; i++) 
            {
                 shuffle(randBoxArray); // randomise order of boxes  
                 this.setState({randBoxArray});   
            }             
  
            // Level based random images
            for (var i=0; i < level; i++) 
            {
                //alert("loop: " + i + " boxNum(1-6): " + randBoxArray[i] + " SpriteNum(0-5): " + this.state.spriteArray[i]);            
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
            
                this.setState({promptBox: this.state.spriteArray[0], promptBoxStart: (0)})    
            
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
                    <Image style={{height: '100%', width: '100%'}} source={img}></Image>
                </PromptFadeView>   
            );
        }
    }

    // Function to validate user input
    userInput(input) {
        // for (var i=0; i < this.state.level; i++) 
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
        //}
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

                    <Row style={{borderWidth: 1}}>
                        <Col><Text>{this.state.timer}</Text></Col>
                        <Col style={{borderWidth: 5, marginTop: '1%', marginBottom: '1%',}}>
        {/* Prompt Box */}   
                        {this.renderPromptImg(this.state.promptBox, this.state.promptBoxStart)}
                        </Col>
                        <Col></Col>
                    </Row>
                    
                </Grid> 
                </View>
            </View>
        );
    }
}

export default PALScreen;