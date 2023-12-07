import React, { useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import { useRoute } from "@react-navigation/native";

const WebViewScreen = () => {
  const route = useRoute();
  const { webURL } = route.params || {};
  const [loading, setLoading] = useState(true);

  const renderLoading = () => (
    <ActivityIndicator
      style={StyleSheet.absoluteFill}
      size="large"
      color="#EFAF0F"
    />
  );

  const onLoadEnd = () => {
    setLoading(false);
  };

  useEffect(() => {
    if (webURL) {
      // Use the webURL parameter as needed
      console.log("Web URL:", webURL);
    }
  }, [webURL]);

  return (
    <View style={{ flex: 1 }}>
      {loading && renderLoading()}
      <WebView
        source={{ uri: webURL }}
        style={{ flex: 1 }}
        onLoadEnd={onLoadEnd}
        renderLoading={renderLoading}
        startInLoadingState
      />
    </View>
  );
};

export default WebViewScreen;
