import { StyleSheet, View } from 'react-native';

export const Divider = () => <View style={styles.divider} />;

const styles = StyleSheet.create({
  divider: {
    backgroundColor: 'grey',
    height: 1,
  },
});
