import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RootNavigation from './app/Navigation/RootNavigation';

export default function App() {
  return (
    <View style={styles.container}>
    <RootNavigation/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
});
