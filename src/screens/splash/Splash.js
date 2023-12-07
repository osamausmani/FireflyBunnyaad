import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  ImageBackground,
  Image,
  Animated,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";

import { Colors, Logo } from "../../constants";
import { styles } from "../../styles/splashStyle";
import { _retrieveObject } from "../../constants/AsyncStorageHelper";

const Splash = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const getUserData = async () => {
    const res = await _retrieveObject("@tokenObj");
    // if (res) {
    //   navigation.replace("AppStack");
    // } else {
    //   navigation.replace("NOnBoard");
    // }

    navigation.replace("SignIn");
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1800,
      useNativeDriver: false,
    }).start(() => {
      getUserData();
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.lightYello }}>
      <ImageBackground source={Logo.new_splashscreen} style={styles.bg}>
        <Animated.View
          style={{
            top: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -50],
            }),
          }}
        >
          <Image source={Logo.bunnw2} />
        </Animated.View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Splash;
