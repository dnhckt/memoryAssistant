import React from "react";
import {Animated} from 'react-native';

// Images that fade in / out
class ImageFadeView extends React.Component {
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
            this.fadeOut();
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
export default ImageFadeView;
