import { StyleSheet } from 'react-native';
import colors from '../../contains/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: 'space-between'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        backgroundColor: colors.white,
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.gray01,
    },
    infoUser: {
        flexDirection: 'row',
        flex: 1,
    },
    labels: {
        marginLeft: 15
    },
    call: {
        flexDirection: 'row'
    }
    ,
    icon: {
        fontSize: 30,
        color: colors.blue,
        marginHorizontal: 15
    },
    nameUser: {
        fontSize: 20,
        fontWeight: '700'
    },
    status: {
        fontSize: 14,
        fontWeight: '400',
        color: colors.gray02
    },
    messages: {
        flex: 1,
        paddingBottom: 15
    },
    inputBar: {
        height: 60,
        backgroundColor: colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    inputArea: {
        backgroundColor: colors.gray01,
        flexDirection: 'row',
        width: 180,
        height: 40,
        alignItems: 'center',
        borderRadius: 40,
        paddingLeft: 15
    },
    input: {
        flex: 1,
        height: '100%',
        fontSize: 16
    },
    bgPress: {
        backgroundColor: colors.black,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50
    },



    
}) 