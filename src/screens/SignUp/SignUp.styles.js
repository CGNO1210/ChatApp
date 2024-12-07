import { StyleSheet } from 'react-native';
import colors from '../../contains/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: 'center'
    },
    title: {
        color: colors.blue,
        fontSize: 30,
        fontWeight: '700',
        marginBottom: 15
    },
    textInput: {
        width: '70%',
        height: 50,
        borderRadius: 40,
        borderColor: colors.gray01,
        borderWidth: 1,
        paddingHorizontal: 20,
        marginVertical: 15,
    },
    btnSignUp: {
        paddingHorizontal: 15,
        height: 50,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        backgroundColor: colors.blue,
    },
    titleSignUp: {
        fontSize: 20,
        fontWeight: '600',
        color: colors.white

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
}) 