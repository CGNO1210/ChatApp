import { StyleSheet } from 'react-native';
import colors from '../../../contains/colors';

export const styles = StyleSheet.create({
    containersend: {
        backgroundColor: colors.white,
        marginTop: 44,
        flexDirection: 'row-reverse',
        paddingHorizontal: 15
    },
    containerreceive: {
        backgroundColor: colors.white,
        marginTop: 44,
        flexDirection: 'row',
        paddingHorizontal: 15
    },
    send: {
        backgroundColor: colors.blue,
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        maxWidth: 320,
        minWidth: 40,
        height: 40,
        borderRadius: 18
    },
    receive: {
        backgroundColor: colors.gray01,
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        maxWidth: 320,
        minWidth: 40,
        height: 40,
        borderRadius: 18
    },
    namereceive: {
        position: 'absolute',
        minWidth: 68,
        top: -40,
        left: 10,
        color: colors.gray02
    },
    namesend: {
        position: 'absolute',
        minWidth: 66,
        top: -36,
        right: -10,
        color: colors.gray02,
    },
    
    timereceive: {
        position: 'absolute',
        minWidth: 120,
        top: -20,
        left: 10,
        color: colors.gray02
    },
    timesend: {
        position: 'absolute',
        minWidth: 120,
        top: -18,
        right: -10,
        color: colors.gray02,
    },
    
    textsend: {
        fontSize: 16,
        color: colors.white,
    },
    textreceive: {
        fontSize: 16,
        color: colors.black
    },


    modalView: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        justifyContent: 'center',
        minWidth: 60,
        alignItems: 'center',
        marginHorizontal: 4,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
    },
}) 