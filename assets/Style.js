import {StyleSheet} from 'react-native';

const beige = '#ebd4a8'
const brown = '#5b4b49'
const pnk = '#dd99bb'
const mint = '#5dd39e'
const ligblu = '#00b2fa'

const navy = '#34495e'
const gry = '#f3f3f3'
const paleW = '#f5f6f1'

const styles = StyleSheet.create({
  container: {
    backgroundColor: gry,
    flex: 1,
    width: '100%',

  },
  padding: {
    flex: 1, 
  },  
  titleBox: {
    flex: 2,
    alignItems: 'center',
    maxWidth: '100%',
    paddingTop: '10%',
  }, 
  title: {
    maxWidth: 400,
    maxHeight: 300,
  }, 
  titleText: {
    fontSize: 72, 
    textAlign: 'center', 
    color: navy
  },
  buttonBox: {
      width: '100%',
      alignItems: 'center',
      textAlign: 'center'

    }, 
  navButton: {
      alignItems: 'center',
      backgroundColor: navy,
      padding: 10,
      borderRadius: 50,
  }, 
  button: {
      borderColor: navy,
      borderWidth: 3,
    }, 
    buttonText: {
      fontSize: 36,
      color: paleW,
    }, 
    gameButtonCol: {
        borderWidth: 1, 
          // backgroundColor: 'orange',
    }, 
    gameButton: {
        maxWidth: '100%',
        maxHeight: '100%',
    },
    max: {
      height: '100%',
      width: '100%',
    },
   header: {
      fontSize: 36,
      textDecorationLine: 'underline',
      color: navy,
      paddingBottom: '10%',
    }
});

export default styles;