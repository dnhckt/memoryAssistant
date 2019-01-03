import React, { Component } from "react";
import {Col, Row, Grid} from "react-native-easy-grid";
import { Alert, TouchableOpacity, View, Text, Animated, Image} from 'react-native';
import Sprites from '../assets/Sprites';
import styles from '../assets/Style'



class FadeInView extends React.Component {
    state = {
      imgFade: new Animated.Value(0), // Set opacity to 0 
    }
    
    fadeIn() {
        Animated.timing(                 
            this.state.imgFade,           
            {
              // Set opacity to 1 over a second  
              toValue: 1,                
              duration: 1000,          
            }
          ).start();                  
    }
    fadeOut() {
        Animated.timing(                  
            this.state.imgFade,            
            {
              toValue: 0,                  
              duration: 1000,             
            }
          ).start();          
          
    }
    componentDidMount() {
        this.fadeIn();
    }
    componentDidUpdate() {
        if(this.props.endTime != 2) {
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

class PALScreen extends Component {
    static navigationOptions = {
        title: "PAL Test",
    }
    constructor(props){
        super(props);
        this.state = {
            spriteArray: [Sprites.beach, Sprites.bev, Sprites.bikini, 
                          Sprites.bishop, Sprites.coconut, Sprites.dolphin, Sprites.fish],
            box1: null,
            box2: null,
            box3: null,
            box4: null,
            box5: null,
            box6: null,

            promptBox: null,
            randB: null,
            randI: null,
            timer: 0,
        }
    }
    updateClock=()=> {
        this.setState({timer: this.state.timer + 1})
    }

    componentDidMount() {        
        setInterval(this.updateClock, 1000);

        let randBox = Math.floor(Math.random() * 6);
        let randImg = Math.floor(Math.random() * 7);
    
        this.setState({promptBox: this.state.spriteArray[randImg]})
        
        switch(randBox) {
            case 0: 
                this.setState({box1: this.state.spriteArray[randImg]});
            break;
            case 1:
                this.setState({box2: this.state.spriteArray[randImg]});
            break;
            case 2:
                this.setState({box3: this.state.spriteArray[randImg]});
            break;
            case 3: 
                this.setState({box4: this.state.spriteArray[randImg]});
            break;
            case 4:
                this.setState({box5: this.state.spriteArray[randImg]});
            break;
            case 5:
                this.setState({box6: this.state.spriteArray[randImg]});
            break;
        } 

        this.setState({randI: randImg, randB: randBox});
    }

    /*
    Fix touchable opacity 
    (Separate function for promptbox where time = total of level times)
    Add proper levels 
    */
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

    userInput(input) {

        switch(input) {
            case 0:
                if(this.state.randB == 0) {alert("correct");}
                else{alert("incorrect");}
            break;
            case 1:
                if(this.state.randB == 1) {alert("correct");}
                else{alert("incorrect");}
            break;
            case 2:
                if(this.state.randB == 2) {alert("correct");}
                else{alert("incorrect");}
            break;
            case 3:
                if(this.state.randB == 3) {alert("correct");}
                else{alert("incorrect");}
            break;
            case 4:
                if(this.state.randB == 4) {alert("correct");}
                else{alert("incorrect");}
            break;
            case 5:
                if(this.state.randB == 5) {alert("correct");}
                else{alert("incorrect");}
            break;
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.max}>
                <Grid>
                    <Row>
                        <Col style={[styles.gameButton]}>
                            <TouchableOpacity style={[styles.button]} onPress={()=>this.userInput(0)}>
                                {this.renderImg(this.state.box1, 0, 1)}
                            </TouchableOpacity>
                        </Col>
                        <Col style={[styles.gameButton]}>
                            <TouchableOpacity style={[styles.button]} onPress={()=>this.userInput(1)}>
                                {this.renderImg(this.state.box2, 0, 1)}
                                {/* <Image style={{height: '100%', width: '100%'}} source={this.state.boxImgs[1]}></Image>             */}
                            </TouchableOpacity>
                        </Col>
                        <Col style={[styles.gameButton]}>
                            <TouchableOpacity style={[styles.button]} onPress={()=>this.userInput(2)}>
                                {this.renderImg(this.state.box3, 0, 1)}
                                {/* <Image style={{height: '100%', width: '100%'}} source={this.state.boxImgs[2]}></Image>             */}
                            </TouchableOpacity>
                        </Col>
                    </Row> 

                    <Row>
                    <Col style={[styles.gameButton]}>
                            <TouchableOpacity style={[styles.button]} onPress={()=>this.userInput(3)}>
                                {this.renderImg(this.state.box4, 0, 1)}
                                {/* <Image style={{height: '100%', width: '100%'}} source={this.state.boxImgs[3]}></Image>             */}
                            </TouchableOpacity>
                    </Col>
                    <Col style={[styles.gameButton]}>
                            <TouchableOpacity style={[styles.button]} onPress={()=>this.userInput(4)}>
                                {this.renderImg(this.state.box5, 0, 1)}
                                {/* <Image style={{height: '100%', width: '100%'}} source={this.state.boxImgs[4]}></Image>             */}
                            </TouchableOpacity>
                    </Col>
                    <Col style={[styles.gameButton]}>
                           <TouchableOpacity style={[styles.button]} onPress={()=>this.userInput(5)}>
                                {this.renderImg(this.state.box6, 0, 1)}
                                {/* <Image style={{height: '100%', width: '100%'}} source={this.state.boxImgs[5]}></Image>             */}
                            </TouchableOpacity>
                    </Col>
                    </Row>

                    <Row style={{borderWidth: 1}}>
                        <Col><Text>{this.state.timer}</Text></Col>
                        <Col style={{borderWidth: 5, marginTop: '1%', marginBottom: '1%',}}>
                            {this.renderImg(this.state.promptBox, 1, 2)}
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
