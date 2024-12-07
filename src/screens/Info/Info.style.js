import { StyleSheet } from 'react-native';
import colors from '../../contains/colors';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1
    },
    file: {
        width: 120,
        height: 120,
        margin: 6
    },
    avatar: {
        width: 140,
        height: 140,
        borderWidth: 1,
        borderColor: colors.gray03,
        borderRadius: 140
    },
    info: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    text: {
        fontSize: 22,
        fontWeight: '600',
    },
    imgvd: {
        fontSize: 22,
        fontWeight: '300',
        paddingTop: 10,
        paddingBottom: 15,
        paddingLeft: 10
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