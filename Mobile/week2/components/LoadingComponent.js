import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  loadingView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingText: {
    color: '#512DA8',
    fontSize: 14,
    fontWeight: 'bold'
  }
});

export const Loading = () => (
  <View style={styles.loadingView}>
    <ActivityIndicator size="large" color="#512DA8" />
    <Text style={styles.loadingText}>Loading..</Text>
  </View>
);
