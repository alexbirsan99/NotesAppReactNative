
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import NoteListScreen from './screens/NoteListScreen';
import AddEditNoteScreen from './screens/AddEditNoteScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer theme={customTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen
          name='NoteList'
          component={NoteListScreen}
        />

        <Stack.Screen
        name='AddEditNote'
        component={AddEditNoteScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff'
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
