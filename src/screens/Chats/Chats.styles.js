import { StyleSheet } from 'react-native';
import colors from '../../contains/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    statusBar: {
        height: 30,
    },
    footerWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%'
    }
}) 