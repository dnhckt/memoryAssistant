import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  padding: {
    flex: 1, 
  },  
  titleBox: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 3,
    backgroundColor:'#fff',
  }, 
  title: {
    fontSize: 66,
  }, 
  buttonBox: {
      flex: 2,
      width: '100%',
      backgroundColor:'orange',
  }, 
  navButton: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#DDDDDD',
      padding: 10,
      height: "100%",
      borderColor: "black",
      borderWidth: 1,
  }, 
  button: {
      // justifyContent: 'center',
      // alignItems: 'center',
      height: "100%",
      borderColor: "black",
      borderWidth: 1,
    }, 
    buttonText: {
      fontSize: 48,
    }, 
    gameButton: {
          borderWidth: 1, 
          // backgroundColor: 'orange',
    }, 
    max: {
      height: '100%',
      width: '100%',
  }
});

export default styles;