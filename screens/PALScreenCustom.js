import {ImagePicker} from 'expo';

import React, { Component } from "react";
import Permissions from 'react-native-permissions';
import {Col, Row, Grid} from "react-native-easy-grid";
import {Alert, Button, TouchableOpacity, View, Text, Image} from 'react-native';

import styles from '../src/Style';

import ImageFadeView from '../src/ImageFadeView';
import PromptFadeView from '../src/PromptFadeView';

/*
        Screen for the customized PAL Test
*/

async function checkMultiPermissions() {
    const { Permissions } = Expo;
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if (status !== 'granted') {
      alert("Hey! If you're on iPhone/iPad we need Camera Roll permissions for this game!");
    }
}

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

// Class for the game
class PALScreen extends Component {
    static navigationOptions = {
        title: "PAL Test",
    }
    constructor(props){
        super(props);
        this.state = {
            // Image selection vars
            userImg1: null, userImg2: null, userImg3: null, userImg4: null, userImg5: null, userImg6: null,
            requiredImgs: 6,

            // Array to store user images
            userImgArray: [],

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

    /* Image picker method */
    pickImage = async () => {
        let req = this.state.requiredImgs    
        if(req > 0) {
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
            }); 
            // Put image in the array
            let userImgArray = [...this.state.userImgArray];
            let userImg = {...userImgArray[req-1]};
            userImg = result;
            userImgArray[req-1] = userImg;
            this.setState({userImgArray});
            this.setState({requiredImgs: this.state.requiredImgs-1});  
        }  
        else {
            Alert("All pictures selected!");
        }
    }  
    
    // When game starts 
    componentDidMount() {   
       checkMultiPermissions();
    }   
    componentWillUnmount() {
        this.resetBoxes();
        this.setState({timer: 0});
        clearInterval(this.state.timeVar);
    }
    componentDidUpdate() {
    }

    beginGame =()=> {   
        if(this.state.requiredImgs == 0) { // If user has selected all images
        this.setState({timer: 0});        
        clearInterval(this.state.timeVar);
        let gameStarted = true;
        let level = this.state.levelNum + 1;
        this.setState({timeVar: setInterval(this.updateClock,1000), gameStarted, levelNum: level});
        this.generateRand(gameStarted, level);
        } 
        else if (this.state.requiredimgs > 0) {
           alert("Please select 6 images first!");
        }
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
                    this.setState({promptBox: this.state.userImgArray[index+1], promptBoxStart: this.state.timer+1})
                    alert("Correct!");
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
        // this.setState({timer: 0});
        // clearInterval(this.state.timeVar);
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

           shuffle(this.state.userImgArray); // randomise order of sprites 

            // Level based random images
            let randBoxArray = [...this.state.randBoxArray];

            for (var i=0; i < level; i++) 
            {
                shuffle(randBoxArray); // Set a value for each step in array
                this.setState({randBoxArray});   
            }                    

            for (var i=0; i < level; i++) 
            {
                let y = i + 2.5;
            
                switch (randBoxArray[i]) { 
                    case 0:
                       this.setState({box1: this.state.userImgArray[i], box1Start: i+1, box1End: y});
                    break;
                    case 1:
                        this.setState({box2: this.state.userImgArray[i], box2Start: i+1, box2End: y});
                    break;
                    case 2:
                        this.setState({box3: this.state.userImgArray[i], box3Start: i+1, box3End: y});
                    break;
                    case 3:
                        this.setState({box4: this.state.userImgArray[i], box4Start: i+1, box4End: y});
                    break;  
                    case 4:
                        this.setState({box5: this.state.userImgArray[i], box5Start: i+1, box5End: y});
                    break;
                    case 5:
                        this.setState({box6: this.state.userImgArray[i], box6Start: i+1, box6End: y});
                    break;       
                }
            }
               
               this.setState({promptBox: this.state.userImgArray[0], promptBoxStart: (this.state.levelNum+3)})    
            
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
                        <Col>    
                           <Button
                                    title={"Select " + this.state.requiredImgs +  " from your gallery"}
                                    onPress={this.pickImage}
                                 />
                           {/* <Col><Text style={{fontSize: 72}}>{this.state.requiredImgs}</Text></Col> */}
                        </Col>
                        <Col style={{borderWidth: 5, marginTop: '1%', marginBottom: '1%',}}>
        {/* Prompt Box */}   
                        {this.renderPromptImg(this.state.promptBox, this.state.promptBoxStart)}
                        </Col>
                        <Col>
                           <Button
                                    title="Begin Game!"
                                    onPress={this.beginGame}
                                 />
                           {/* <Col><Text>{this.state.timer}</Text></Col> */}
                        </Col>
                    </Row>
                    <Row style={{flex: 0.5}}>
                            <TouchableOpacity style={{width: '100%', backgroundColor: '#34495e'}} onPress={()=>this.beginButton()}>
                                <Text style={[styles.buttonText]}>Press to Begin!</Text>
                            </TouchableOpacity>
                    </Row>         
                </Grid> 
                </View>
            </View>
        );
    }
}

export default PALScreen;
