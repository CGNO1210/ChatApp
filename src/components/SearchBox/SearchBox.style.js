import { StyleSheet } from 'react-native';
import color from '../../contains/colors';

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: color.white,
        marginBottom: 15,
        zIndex: 1
    },
    contentContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.gray01,
        marginHorizontal: 15,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20
    },
    search: {
        width: 16,
        height: 16,
        marginRight: 10
    },
    textInput: {
        height: 36,
        flex: 1,
    },
    listSearch: {
        position:'absolute',
        width: '100%',
        maxHeight: 300,
        borderRadius: 16,
        top: 50,
        zIndex: 1,
        backgroundColor: color.white,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    

}) 