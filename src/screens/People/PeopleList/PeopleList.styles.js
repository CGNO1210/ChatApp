import { StyleSheet } from 'react-native';
import colors from '../../../contains/colors';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    rowContainer: {
        flexDirection: 'row',
        paddingVertical: 6,
        paddingHorizontal: 15,
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: colors.gray02
    },
    rowLeft: {
        flexDirection: 'row',
        paddingVertical: 15,
        alignItems: 'center',
        flex: 1
    },
    waveIcon: {
        width: 32,
        height: 32
    },
    label1: {
        fontSize: 17,
        fontWeight: '500',
        marginLeft: 15,
        lineHeight: 22
    }
}) 