import {StyleSheet, Dimensions} from 'react-native';

const gry = '#edecee'
const navy = '#34495e'
const paleW = '#f5f6f1'

const mint = '#5dd39e'
const softred = '#e64850'

const ligblu = '#00b2fa'
const pnk = '#dd99bb'


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
    width: '100%',
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
      width: '80%',
      alignItems: 'center',
      textAlign: 'center',
      height: '50%',
    }, 
    menuTitleRow: {
      alignContent: 'center',
      flex: 0.7,
      marginLeft: '5%',
      marginRight: '5%'
    },
  navButton: {
      alignItems: 'center',
      backgroundColor: navy,
      padding: "5%",
      borderRadius: 20,
  }, 
    buttonText: {
      fontSize: 32,
      color: paleW,
      textAlign: 'center',
      alignItems: "center"
    }, 
      gameButton: {
      height: "100%",
      borderColor: navy,
      borderWidth: 3,
    }, 
    max: {
      height: '100%',
      width: '100%',
  },  
   header: {
    fontSize: 1 * Dimensions.get('window').width * 0.1,
    // textDecorationLine: 'underline',
     borderColor: navy,
     borderBottomWidth: 3,
     borderRadius: 20,
    fontWeight:  'bold',
    color: navy,
  },
    roundedButtonWrap: {
      flex: 0.5, 
      marginRight: "2%", 
      marginLeft: "2%",
       alignContent: "center",
    },  
    roundedButton: {
      width: '100%', 
      backgroundColor: navy,
       justifyContent: "center", 
       borderRadius: 20,
    },
    FRYesButton: {
      backgroundColor: mint,
      alignItems: 'center',
      height: Dimensions.get('window').width * 0.33,
      width: Dimensions.get('window').width * 0.33,
      borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 3
    },
    FRNoButton: {
      alignItems: 'center',
      backgroundColor: softred,
      height: Dimensions.get('window').width * 0.33,
      width: Dimensions.get('window').width * 0.33,
      borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 3
  },
  FRThumbUp: {
    marginTop: "5%",
    height: "75%",
    width: "75%",
  },
  FRThumbDown: {
    marginTop: "20%",
    height: "75%",
    width: "75%",
    transform:([{rotateZ: '180deg'}]),
  },
  bingoButton: {
      height: "100%",
      borderColor: navy,
      justifyContent: "center",
      borderWidth: 3,
  },
  bingoText: {
    fontSize: 30,
    textAlign: 'center',
  },
});

export default styles;