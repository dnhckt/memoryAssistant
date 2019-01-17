import {Alert, Button, Image} from 'react-native';
import Sprites from '../assets/Sprites';
import styles from '../assets/Style';
import ImageFadeView from '../assets/ImageFadeView';
import PromptFadeView from '../assets/PromptFadeView';
    
import React, { Component } from 'react';

import {
   StyleSheet,
   Text,
   View
}
from 'react-native';
import Camera from 'react-native-camera';

class PALScreenCustom extends Component {
   takePicture = () => {
      const options = {};
      this.camera.capture({ metadata: options })
      .then((data) => console.log(data))
      .catch(err => console.error(err));
   }
   render() {
      return (
         <View style = {styles.container}>
            <Camera
               ref = {(cam) => {
                  this.camera = cam;
               }}
               style = {styles.preview}
               aspect = {Camera.constants.Aspect.fill}>
            </Camera>
            <Text style = {styles.capture} onPress = {this.takePicture}>CAPTURE</Text>
         </View>
      );
   }
}
 /*
//     Fix touchable opacity (colour feedback)
    
//     (Separate function for promptbox where time = total of level times)    
    
//     Levels - validation against null (not the same) 

//     Add user based gallery
//     */
// function shuffle(array) {
//     var j, x, i;
//     for (i = array.length - 1; i > 0; i--) {
//         j = Math.floor(Math.random() * (i + 1));
//         x = array[i];
//         array[i] = array[j];
//         array[j] = x;
//     }
//     return array;
// }
// // Class for the game
// class PALScreen extends Component {
//     static navigationOptions = {
//         title: "Custom Test",
//     }
//     constructor(props){
//         super(props);
//         this.state = {
//             // Array to store sprites
//             spriteArray: [Sprites.beach, Sprites.bev, Sprites.bikini, 
//                           Sprites.bishop, Sprites.coconut, Sprites.dolphin, Sprites.fish],
            
//             levelNum: 0, // Control level num 
//             test: null, // Control timer 

//             /* BOX VARS (Index, startTime, endTime) */
//             box1: null, // Top left  
//             box1Start: null,
//             box1End: null,

//             box2: null, // Top mid 
//             box2Start: null,
//             box2End: null,

//             box3: null, // Top right
//             box3Start: null,
//             box3End: null,

//             box4: null, // Bot left
//             box4Start: null,
//             box4End: null,

//             box5: null, // Bot mid
//             box5Start: null,
//             box5End: null,

//             box6: null, // Bot right
//             box6Start: null,
//             box6End: null,
//             /* End box vars */

//             promptBox: null, //Prompt box image
//             promptBoxStart: null,

//             randBoxArray: [0, 1, 2, 3, 4, 5, 6], // Array for box vars
//             timer: 0, // timer 
//         }
//     }

//     // When game starts 
//     componentDidMount() {   
//         this.beginGame();
//     }
//     componentWillUnmount() {
//         this.resetBoxes();
//         this.setState({timer: 0});
//         clearInterval(this.state.test);
//     }
//     componentDidUpdate() {
//         if(this.state.timer == 5){ 
//            // alert("box1: " + this.state.box1Start + " box2: " + this.state.box2Start + " box3: " + this.state.box3Start);
//         }
//     }

//     beginGame() {   
//         let gameStarted = true;
//         let level = this.state.levelNum + 1;
//         this.setState({test: setInterval(this.updateClock,1000), gameStarted, levelNum: level});
//         this.generateRand(gameStarted, level);
//     }
    
//     endLevel(gameWon) {
//         this.resetBoxes();
//         this.setState({timer: 0});
//         clearInterval(this.state.test);

//         if(gameWon) {
//             if(this.state.levelNum == 7)
//             {
//                 this.setState({gameStarted: false});
//                 alert("You win!");                     
//             }
//             alert("Correct! Next Level");
//             this.beginGame();
//         } 
//         else {alert("Incorrect! Game over.");}
//         this.setState({gameStarted: false});
//     }

//     resetBoxes() {
//         this.setState({box1: null, box2: null, box3: null, box4: null, box5: null, box6: null});
//         this.setState({box1Start: null, box2Start: null, box3Start: null, box4Start: null, box5Start: null, box6Start: null});
//         this.setState({box1End: null, box2End: null, box3End: null, box4End: null, box5End: null, box6End: null});
//         this.setState({promptBox: null, promptBoxStart: null});
//     }

//     // Function to generate random numbers 
//     generateRand(gameStarted,level) {
//         if(gameStarted) {

//             shuffle(this.state.spriteArray); // randomise order of sprites 

//             // Level based random images
//             let randBoxArray = [...this.state.randBoxArray];

//             for (var i=0; i < level; i++) 
//             {
//                 shuffle(randBoxArray); // Set a value for each step in array
//                 this.setState({randBoxArray});   
//             }                    

//             for (var i=0; i < level; i++) 
//             {
//                 let y = i + 2.5;
            
//                 switch (randBoxArray[i]) { 
//                     case 0:
//                        this.setState({box1: this.state.spriteArray[i], box1Start: i+1, box1End: y});
//                     break;
//                     case 1:
//                         this.setState({box2: this.state.spriteArray[i], box2Start: i+1, box2End: y});
//                     break;
//                     case 2:
//                         this.setState({box3: this.state.spriteArray[i], box3Start: i+1, box3End: y});
//                     break;
//                     case 3:
//                         this.setState({box4: this.state.spriteArray[i], box4Start: i+1, box4End: y});
//                     break;  
//                     case 4:
//                         this.setState({box5: this.state.spriteArray[i], box5Start: i+1, box5End: y});
//                     break;
//                     case 5:
//                         this.setState({box6: this.state.spriteArray[i], box6Start: i+1, box6End: y});
//                     break;       
//                 }
//             }
               
//             if (this.state.levelNum == 0){
//                 this.setState({promptBox: this.state.spriteArray[0], promptBoxStart: (this.state.levelNum+3)})
//             }      
            
//         }
//     }

//     updateClock=()=> {
//         this.setState({timer: this.state.timer + 1}) // Stores clock second var as timer 
//     }

//     // Function to fade in image with timer
//     renderImg(img, startTime, endTime) {
//         if(this.state.timer > startTime) {
//             return( 
//                 <ImageFadeView style={{}}
//                 startTime = {startTime}
//                 endTime = {endTime}
//                 >
//                     <Image style={{maxHeight: '100%', maxWidth: '100%'}} source={img}></Image>
//                 </ImageFadeView>   
//             );
//         }
//     }
//     // Function to display prompt
//     renderPromptImg(img, startTime) {
//         if(this.state.timer > startTime) {
//             return( 
//                 <PromptFadeView 
//                 startTime = {startTime}
//                 >
//                     <Image style={{height: '100%', width: '100%'}} source={img}></Image>
//                 </PromptFadeView>   
//             );
//         }
//     }

//     // Function to validate user input
//     userInput(input) {
//         // for (var i=0; i < this.state.level; i++) 
//         // {
//         var i = 0;
//         switch(input) {
//                 case 0:
//                     if(this.state.randBoxArray[i] == 0) {this.endLevel(true);i++;}
//                     else{this.endLevel(false);}
//                 break;
//                 case 1:
//                     if(this.state.randBoxArray[i] == 1) {this.endLevel(true);i++;}
//                     else{this.endLevel(false);}
//                 break;
//                 case 2:
//                     if(this.state.randBoxArray[i] == 2) {this.endLevel(true);i++;}
//                     else{this.endLevel(false);}
//                 break;
//                 case 3:
//                     if(this.state.randBoxArray[i] == 3) {this.endLevel(true);i++;}
//                     else{this.endLevel(false);}
//                 break;
//                 case 4:
//                     if(this.state.randBoxArray[i] == 4) {this.endLevel(true);i++;}
//                     else{this.endLevel(false);}
//                 break;
//                 case 5:
//                     if(this.state.randBoxArray[i] == 5) {this.endLevel(true);i++;}
//                     else{this.endLevel(false);}
//                 break;
//             }
//         //}
//     }
//     render() {
//         return (
//             <View style={styles.container}>
//                 <View style={styles.max}>
                
//                 {/*  Game Arena: */}
//                 <Grid>
//                     <Row>
//                         <Col style={[styles.gameButton]}>
//         {/* Box 1 */}   
//                             <TouchableOpacity style={[styles.button]} onPress={()=>this.userInput(0)}>
//                                 {this.renderImg(this.state.box1, this.state.box1Start, this.state.box1End)} 
//                             </TouchableOpacity>
//                         </Col>
//                         <Col style={[styles.gameButton]}>
//         {/* Box 2 */}   
//                             <TouchableOpacity style={[styles.button]} onPress={()=>this.userInput(1)}>
//                                 {this.renderImg(this.state.box2, this.state.box2Start, this.state.box2End)}
//                             </TouchableOpacity>
//                         </Col>
//                         <Col style={[styles.gameButton]}>
//         {/* Box 3 */}   
//                             <TouchableOpacity style={[styles.button]} onPress={()=>this.userInput(2)}>
//                                 {this.renderImg(this.state.box3, this.state.box3Start, this.state.box3End)}
//                             </TouchableOpacity>
//                         </Col>
//                     </Row> 

//                     <Row>
//                     <Col style={[styles.gameButton]}>
//         {/* Box 4  */}
//                             <TouchableOpacity style={[styles.button]} onPress={()=>this.userInput(3)}>
//                                 {this.renderImg(this.state.box4, this.state.box4Start, this.state.box4End)}
//                             </TouchableOpacity>
//                     </Col>
//                 <Col style={[styles.gameButton]}>
//         {/* Box 5  */}
//                             <TouchableOpacity style={[styles.button]} onPress={()=>this.userInput(4)}>
//                                 {this.renderImg(this.state.box5, this.state.box5Start, this.state.box5End)}
//                             </TouchableOpacity>
//                     </Col>
//                     <Col style={[styles.gameButton]}>
//         {/* Box 6  */}
//                            <TouchableOpacity style={[styles.button]} onPress={()=>this.userInput(5)}>
//                                 {this.renderImg(this.state.box6, this.state.box6Start, this.state.box6End)}
//                             </TouchableOpacity>
//                     </Col>
//                     </Row>

//                     <Row style={{borderWidth: 1}}>
//                         <Col><Text>{this.state.timer}</Text></Col>
//                         <Col style={{borderWidth: 5, marginTop: '1%', marginBottom: '1%',}}>
//         {/* Prompt Box */}   
//                         {this.renderPromptImg(this.state.promptBox, this.state.promptBoxStart)}
//                         </Col>
//                         <Col></Col>
//                     </Row>
                    
//                 </Grid> 
//                 </View>
//             </View>
//         );
//     }
// }

export default PALScreenCustom;
