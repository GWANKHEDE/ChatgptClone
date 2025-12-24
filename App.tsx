import React from 'react';
import { View, StyleSheet } from 'react-native';
import ChatScreen from './src/screens/ChatScreen';

function App(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <ChatScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
