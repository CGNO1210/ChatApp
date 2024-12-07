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
    btnSignIn: {
        backgroundColor: colors.blue,
        paddingHorizontal: 15,
        height: 50,
        width: '70%',
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15
    },
    titleSignIn: {
        color: colors.white,
        fontSize: 20,
        fontWeight: '600'
    },
    btnSignUp: {
        paddingHorizontal: 15,
        height: 50,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10
    },
    titleSignUp: {
        fontSize: 20,
        fontWeight: '600'
    },
}) 