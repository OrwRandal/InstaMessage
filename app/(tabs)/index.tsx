import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import InstagramWebView from '@/components/instagramDmView';

const HomeScreen: React.FC = () => {
  return (
    <>
    <View style={styles.headerContainer}>
        <Text style={styles.header}>DM Gram</Text>
      </View>
    <View style={styles.container}>
      <InstagramWebView />
    </View>
    </>
  );
};


const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'black', // Assuming you want a black background for the header
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 30
  },
  header: {
    color: 'white',
    fontSize: 30,
    fontWeight: '900'
  },
  container: {
    flex: 1,
  },
});

export default HomeScreen;
