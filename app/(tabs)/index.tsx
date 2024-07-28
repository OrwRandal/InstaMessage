import React, { useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import InstagramWebView from '@/components/instagramDmView';

const HomeScreen = () => {
  const webViewRef = useRef<{ reload: () => void }>(null);

  const refreshPage = () => {
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  return (
    <>
      <LinearGradient
        colors={['#833ab4', '#fd1d1d', '#fcb045']}
        style={styles.headerContainer}
      >
        <View style={styles.headerContent}>
          <Text style={styles.header}>Dm Gram</Text>
          <TouchableOpacity onPress={refreshPage}>
            <FontAwesomeIcon icon={faArrowsRotate} style={{ color: '#ffffff' }} size={30} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <View style={styles.container}>
        <InstagramWebView ref={webViewRef} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  headerContent: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    color: 'white',
    fontSize: 28,
    fontWeight: '800',
  },
  container: {
    flex: 1,
  },
});

export default HomeScreen;
