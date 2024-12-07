import { StyleSheet } from 'react-native';
import colors from '../../contains/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  label1: {
    fontSize: 13,
    color: colors.gray02,
    textTransform: 'uppercase',
    paddingHorizontal: 15,
    paddingVertical: 15
  }
}) 