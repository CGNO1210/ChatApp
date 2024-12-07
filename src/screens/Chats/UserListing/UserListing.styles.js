import { StyleSheet } from 'react-native';
import colors from '../../../contains/colors';

export const styles = StyleSheet.create({
    container: {},
    user: {
        backgroundColor: colors.white
    },
    userItemContainer: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 10,
        alignItems: 'center',
    },
    userIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        flex: 1
    },
    userDetailsSectionContainer: {
        marginLeft: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 5,
    },
    nameLabel: {
        color: colors.black,
        fontSize: 17,
        fontWeight: '500',
        lineHeight: 22
    },
    lastMessageLabel: {
        color: colors.black,
        opacity: 0.5,
        fontWeight: '400',        
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: colors.white,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    itemRowWrapper: {
        flexDirection: 'row'
    },
    itemRowIcon: {
        marginHorizontal: 5,
        width: 36,
        height: 36
    }
}) 