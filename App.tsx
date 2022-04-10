import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import NoteListScreen from './screens/NoteListScreen';


export default function App() {

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView>
        <NoteListScreen />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
