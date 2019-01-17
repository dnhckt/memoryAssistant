import {StyleSheet} from 'react-native';
const beige = '#ebd4a8'
const brown = '#5b4b49'
const gry = '#f3f3f3'

const pnk = '#dd99bb'
const mint = '#5dd39e'
const navy = '#34495e'
const ligblu = '#00b2fa'
const paleW = '#f5f6f1'

const styles = StyleSheet.create({
  container: {
    backgroundColor: gry,
    flex: 1,
    width: '100%',

  },
  padding: {
    flex: 1.5, 
  },  
  titleBox: {
    flex: 4,
    alignItems: 'center',
  }, 
  title: {
    maxWidth: '100%',
    maxHeight: '100%',
  }, 
  titleText: {
    fontSize: 72, 
    textAlign: 'center', 
    color: navy
  },
  buttonBox: {
      flex: 1.5,
      width: '80%',
      marginLeft:' 10%',
      marginRight: '5%',
    }, 
  navButton: {
      alignItems: 'center',
      backgroundColor: navy,
      padding: 10,
      borderRadius: 50,
  }, 
  button: {
      height: "100%",
      borderColor: navy,
      borderWidth: 3,
    }, 
    buttonText: {
      fontSize: 48,
      color: paleW,
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