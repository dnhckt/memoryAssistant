import React from "react";
import {Animated} from 'react-native';

// Images that fade in / out
class ImageFadeView extends React.Component {
    state = {
      imgFade: new Animated.Value(0), // Set inital opacity to 0 
      timeVar: null,
      timer: null,
    }
    
    // Function to fade image in 
    fadeIn() {
        Animated.timing(                 
            this.state.imgFade,           
            {
              // Set opacity to 1 over 1 second  
              toValue: 1,                
              duration: 100,          
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
              duration: 100,             
            }
          ).start();          
          
    }
    updateClock = () => {
      this.setState({ timer: this.state.timer + 1 }) // Stores clock second var as timer 
    }
    // When component mounts, fade in 
    componentDidMount() {
      this.fadeIn();
      this.setState({timeVar: setInterval(this.updateClock, 1000)});
    }
    componentWillUnmount() {
      clearInterval(this.state.timeVar);
      this.setState({timer: null});
    }

    // When component updates, fade out 
    componentDidUpdate() {
      if(this.state.timer > 5)
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
