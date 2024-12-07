import { StyleSheet } from 'react-native';
import colors from '../../contains/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  imgView: {
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'center',
    padding: 40,
    marginTop: 30
  },
  changeImg: {
    position: 'absolute',
    width: 50,
    height: 50,
    bottom: 0,
    right: 0,
    color: colors.blue,
    backgroundColor: colors.white,
    borderRadius: 100,
  },
  option: {
    height: 80,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: colors.gray02
  },
  change: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 18,
    fontWeight: '300',
    color: colors.black,
    flex: 1,
    marginLeft: 15
  },
  icon: {
    fontSize: 30,
    color: colors.blue
  },
  logOutIcon: {
    color: 'red',
    backgroundColor: colors.gray01,
    padding: 10,
    borderRadius: 12
  },

  modalView: {
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  
},
button: {
    justifyContent: 'center',
    minWidth: 60,
    alignItems: 'center',
    marginHorizontal: 4,
    borderRadius: 15,
    padding: 10,
    elevation: 2,
},
buttonOpen: {
    backgroundColor: '#F194FF',
},
buttonClose: {
    backgroundColor: '#2196F3',
},

modalText: {
    marginBottom: 15,
    textAlign: 'center',
},
centeredView: {
    flex: 1,
    justifyContent: 'center',
},
textInput: {
  borderWidth: 0.5,
  width: '80%',
  paddingVertical: 6,
  paddingHorizontal: 15,
  borderRadius: 100,
  marginBottom: 15
}
}) 