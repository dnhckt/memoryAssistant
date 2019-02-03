import React, { Component } from 'react';
import {Alert, Button, TouchableOpacity, View, Text, Image} from 'react-native';
import {Col, Row, Grid} from "react-native-easy-grid";
import Sprites from '../assets/Sprites';
import styles from '../assets/Style';
import ImageFadeView from './ImageFadeView';
import PromptFadeView from './PromptFadeView';
    
import {ImagePicker} from 'expo';



class Imgpick extends Component {
   state = {
      image: null,
      imgArray: null,
   };    

   /* ImagePicker method from Expo Docs */
   _pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
         allowsEditing: true,
         aspect: [4, 3],
      }); 
      this.setState({imgArray: result});
      console.log(result);
   
      if(!result.cancelled) {
         this.setState({image: result.uri});
      }
   };
   
   userInput(v) {

   };

   render() {
      let {image} = this.state;
      return (
         <View style={styles.container}>

         
                        {/*  Game Arena: */}
                      <Grid>
                           <Row>
                           <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                 <Button
                                    title="Pick an image from camera roll"
                                    onPress={this._pickImage}
                                 />
                           </View>
                           </Row>
                           <Row>
                              <Col style={[styles.gameButton]}>
               {/* Box 1 */}   
                                    <TouchableOpacity style={[styles.button]} onPress={()=>this.userInput(0)}>
                                       <Image style={{maxHeight: '100%', maxWidth: '100%'}} source={this.state.imgArray}></Image>
                                    </TouchableOpacity>
                              </Col>
                              <Col style={[styles.gameButton]}>
               {/* Box 2 */}   
                                    <TouchableOpacity style={[styles.button]} onPress={()=>this.userInput(1)}>
                                    </TouchableOpacity>
                              </Col>
                              <Col style={[styles.gameButton]}>
               {/* Box 3 */}   
                                    <TouchableOpacity style={[styles.button]} onPress={()=>this.userInput(2)}>
                                    </TouchableOpacity>
                              </Col>
                           </Row> 

                           <Row>
                           <Col style={[styles.gameButton]}>
               {/* Box 4  */}
                                    <TouchableOpacity style={[styles.button]} onPress={()=>this.userInput(3)}>
                                    </TouchableOpacity>
                           </Col>
                        <Col style={[styles.gameButton]}>
               {/* Box 5  */}
                                    <TouchableOpacity style={[styles.button]} onPress={()=>this.userInput(4)}>
                                    </TouchableOpacity>
                           </Col>
                           <Col style={[styles.gameButton]}>
               {/* Box 6  */}
                                 <TouchableOpacity style={[styles.button]} onPress={()=>this.userInput(5)}>
                                    </TouchableOpacity>
                           </Col>
                           </Row>

                           <Row style={{borderWidth: 1}}>
                              <Col><Text>{this.state.timer}</Text></Col>
                              <Col style={{borderWidth: 5, marginTop: '1%', marginBottom: '1%',}}>
               {/* Prompt Box */}   
                              </Col>
                              <Col></Col>
                           </Row>
             
             </Grid> 
     </View>
      );
   }
}


export default Imgpick;
