import { StyleSheet } from 'react-native';
import colors from '../../contains/colors';
export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: colors.white,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingRight: 10
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontSize: 30,
        fontWeight: '700',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 40,
        marginHorizontal: 15,
        marginVertical: 15
    },
    icon: {
        width: 40,
        height: 40,
        marginHorizontal: 5,
        marginVertical: 15
    }
}) 