import React, { useRef, useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, BackHandler } from 'react-native';
import { WebView } from 'react-native-webview';

const InstagramWebView: React.FC = () => {
  const [currentUrl, setCurrentUrl] = useState('https://www.instagram.com/accounts/login/');
  const [canGoBack, setCanGoBack] = useState(false);
  const webviewRef = useRef<WebView>(null);

  const onNavigationStateChange = (navState: any) => {
    const { url, canGoBack } = navState;

    setCanGoBack(canGoBack);

    if (url.includes('/accounts/login/')) {
      // Allow login page
      setCurrentUrl(url);
    } else if (url.includes('/direct/inbox/')) {
      // Allow DM page
      setCurrentUrl(url);
    } else if (url.includes('/direct/t/')) {
      // Allow individual message threads
      setCurrentUrl(url);
    } else if (url.includes('/p/')) {
      // Allow individual posts
      setCurrentUrl(url);
    } else {
      // Redirect to DM page if on any other page
      if (webviewRef.current) {
        webviewRef.current.stopLoading();
        webviewRef.current.injectJavaScript(`window.location.href = 'https://www.instagram.com/direct/inbox/';`);
      }
    }
  };

  const onShouldStartLoadWithRequest = (request: any) => {
    const { url } = request;
    console.log('Attempting to load URL:', url);  // Log the URL being attempted

    if (
      url.includes('/accounts/login/') ||
      url.includes('/direct/inbox/') ||
      url.includes('/direct/t/') ||
      url.includes('/p/')
    ) {
      return true; // Allow navigation
    } else {
      if (webviewRef.current) {
        webviewRef.current.stopLoading();
        webviewRef.current.injectJavaScript(`window.location.href = 'https://www.instagram.com/direct/inbox/';`);
      }
      return false; // Prevent navigation
    }
  };

  useEffect(() => {
    const handleBackPress = () => {
      if (canGoBack && webviewRef.current) {
        webviewRef.current.goBack();
        return true; // Prevent default behavior (exit app)
      }
      return false;
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [canGoBack]);

  const injectedJavaScript = `
    (function() {
      window.open = function(url) {
        window.location.href = url;
      };
      document.addEventListener('click', function(event) {
        var target = event.target.closest('a');
        if (target) {
          event.preventDefault();
          window.location.href = target.href;
        }
      }, true);
    })();
  `;

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webviewRef}
        source={{ uri: currentUrl }}
        onNavigationStateChange={onNavigationStateChange}
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        injectedJavaScript={injectedJavaScript} // Inject JavaScript to intercept window.open and anchor clicks
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default InstagramWebView;
