import React, { Component } from "react";
import {Col, Row, Grid} from "react-native-easy-grid";
import { Alert, TouchableOpacity, View, Text, Animated, Image} from 'react-native';
import Sprites from '../assets/Sprites';
import styles from '../assets/Style'


    /*
    Fix touchable opacity (colour feedback)
    
    (Separate function for promptbox where time = total of level times)
    
    Add proper levels 
    */

// Images that fade in / out
class FadeInView extends React.Component {
    state = {
      imgFade: new Animated.Value(0), // Set inital opacity to 0 
    }
    
    // Function to fade image in 
    fadeIn() {
        Animated.timing(                 
            this.state.imgFade,           
            {
              // Set opacity to 1 over 1 second  
              toValue: 1,                
              duration: 1000,          
            }
          ).start();                  
    }
    // Function to fade image out 
    fadeOut() {
        Animated.timing(                  
            this.state.imgFade,            
            {
              // Set opacity to 0 over 1 second
              toValue: 0,                  
              duration: 1000,             
            }
          ).start();          
          
    }
    // When component mounts, fade in 
    componentDidMount() {
        this.fadeIn();
    }
    // When component updates, fade out 
    componentDidUpdate() {
        if(this.props.endTime != 3) {
            this.fadeOut();
        }
    }


    render() {
      let { imgFade } = this.state;
  
      return (
        <Animated.View 
          style={{...this.props.style,
            opacity: imgFade,    
          }}
        >
            {this.props.children}
        </Animated.View>
      );
    }
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
                          Sprites.bishop, Sprites.coconut, Sprites.dolphin, Sprites.fish],
            
         //   gameStarted: false, // Control game loop 
            levelNum: 0, // Control level num 
            test: null, // Control timer 

            /* BOX VARS (Index, startTime, endTime) */
            box1: null, // Top left  
            box1Start: null,
            box1End: null,

            box2: null, // Top mid 
            box2Start: null,
            box2End: null,

            box3: null, // Top right
            box3Start: null,
            box3End: null,

            box4: null, // Bot left
            box4Start: null,
            box4End: null,

            box5: null, // Bot mid
            box5Start: null,
            box5End: null,

            box6: null, // Bot right
            box6Start: null,
            box6End: null,
            /* End box vars */

            promptBox: null, //Prompt box image

            randBoxArray: [6], // Array for box vars
            randImgArray: [6], // Array for img vars //
            timer: 0, // timer 
        }
    }

    // When game starts 
    componentDidMount() {   
        this.beginGame();
    }
  
    beginGame() {
        // this.state.test = setInterval(this.updateClock, 1000); // Updates clock every second
        // this.state.gameStarted = true;
        // this.state.level = 2;
        // this.generateRand();    
        let gameStarted = true;
        let level = this.state.levelNum + 1;
        this.setState({test: setInterval(this.updateClock,1000), gameStarted, level});
        this.generateRand(gameStarted, level);
    }
    endLevel(gameWon) {
        if(gameWon) {
            alert("Correct! Next Level");
            this.beginGame();
        } else { alert("Incorrect! Game over.");}
        this.setState({gameStarted: false, timer: 0});
        clearInterval(this.state.test);
    }
    // Function to generate random numbers 
    generateRand(gameStarted,level) {
        if(gameStarted) {
            // Level based random images
            for (var i=0; i < level; i++) 
            {
                let randBoxArray = [...this.state.randBoxArray];
                randBoxArray[i] = Math.floor(Math.random() * 6); 
                this.setState({randBoxArray});

                let randImgArray = [...this.state.randImgArray];
                randImgArray[i] = Math.floor(Math.random() * 7);
                this.setState({randImgArray});

                let y = i + 1.5;
                switch (randBoxArray[i]) {
                    case 0:
                       this.setState({box1: this.state.spriteArray[randImgArray[i]], box1Start: i, box1End: y});
                    break;
                    case 1:
                        this.setState({box2: this.state.spriteArray[randImgArray[i]], box2Start: i, box2Start: y});
                    break;
                    case 2:
                        this.setState({box3: this.state.spriteArray[randImgArray[i]], box3Start: i, box3Start: y});
                    break;
                    case 3:
                        this.setState({box4: this.state.spriteArray[randImgArray[i]], box4Start: i, box4End: y});
                    break;  
                    case 4:
                        this.setState({box5: this.state.spriteArray[randImgArray[i]], box5Start: i, box5End: y});
                    break;
                    case 5:
                        this.setState({box6: this.state.spriteArray[randImgArray[i]], box6Start: i, box6End: y});
                    break;
                }               
            }
          
        }
    }
    updateClock=()=> {
        this.setState({timer: this.state.timer + 1}) // Stores clock second var as timer 
    }

    // Function to fade in image with timer
    renderImg(img, startTime, endTime) {
        if(this.state.timer > startTime) {
            return( 
                <FadeInView
                startTime = {startTime}
                endTime = {endTime}
                >
                    <Image style={{height: '100%', width: '100%'}} source={img}></Image>
                </FadeInView>   
            );
        }
    }

    // Function to validate user input
    userInput(input) {
        for (var i=0; i < this.state.level; i++) 
        {
        switch(input) {
                case 0:
                    if(this.state.randBoxArray[i] == 0) {this.endLevel(true);}
                    else{this.endLevel(false);}
                break;
                case 1:
                    if(this.state.randBoxArray[i] == 1) {this.endLevel(true);}
                    else{this.endLevel(false);}
                break;
                case 2:
                    if(this.state.randBoxArray[i] == 2) {this.endLevel(true);}
                    else{this.endLevel(false);}
                break;
                case 3:
                    if(this.state.randBoxArray[i] == 3) {this.endLevel(true);}
                    else{this.endLevel(false);}
                break;
                case 4:
                    if(this.state.randBoxArray[i] == 4) {this.endLevel(true);}
                    else{this.endLevel(false);}
                break;
                case 5:
                    if(this.state.randBoxArray[i] == 5) {this.endLevel(true);}
                    else{this.endLevel(false);}
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
                        <Col style={[styles.gameButton]}>
        {/* Box 1 */}   
                            <TouchableOpacity style={[styles.button]} onPress={()=>this.userInput(0)}>
                                {this.renderImg(this.state.box1, this.state.box1Start, this.state.box1End)} 
                            </TouchableOpacity>
                        </Col>
                        <Col style={[styles.gameButton]}>
        {/* Box 2 */}   
                            <TouchableOpacity style={[styles.button]} onPress={()=>this.userInput(1)}>
                                {this.renderImg(this.state.box2, this.state.box2Start, this.state.box2End)}
                            </TouchableOpacity>
                        </Col>
                        <Col style={[styles.gameButton]}>
        {/* Box 3 */}   
                            <TouchableOpacity style={[styles.button]} onPress={()=>this.userInput(2)}>
                                {this.renderImg(this.state.box3, this.state.box3Start, this.state.box3End)}
                            </TouchableOpacity>
                        </Col>
                    </Row> 

                    <Row>
                    <Col style={[styles.gameButton]}>
        {/* Box 4 */}   
                            <TouchableOpacity style={[styles.button]} onPress={()=>this.userInput(3)}>
                                {this.renderImg(this.state.box4, this.state.box4Start, this.state.box4End)}
                            </TouchableOpacity>
                    </Col>
                <Col style={[styles.gameButton]}>
        {/* Box 5 */}   
                            <TouchableOpacity style={[styles.button]} onPress={()=>this.userInput(4)}>
                                {this.renderImg(this.state.box5, this.state.box5Start, this.state.box5End)}
                            </TouchableOpacity>
                    </Col>
                    <Col style={[styles.gameButton]}>
        {/* Box 6 */}   
                           <TouchableOpacity style={[styles.button]} onPress={()=>this.userInput(5)}>
                                {this.renderImg(this.state.box6, this.state.box6Start, this.state.box6End)}
                            </TouchableOpacity>
                    </Col>
                    </Row>

                    <Row style={{borderWidth: 1}}>
                        <Col><Text>{this.state.timer}</Text></Col>
                        <Col style={{borderWidth: 5, marginTop: '1%', marginBottom: '1%',}}>
        {/* Prompt Box */}   
                            {this.renderImg(this.state.promptBox, 2, 3)}
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
