import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AppText, Background, Colors, Logo } from "../../constants";
import OtpInputs from "react-native-otp-inputs";
import AppFormText from "../../component/appComponnet/AppFormText";
import { _setData } from "../../constants/AsyncStorageHelper";
import { PostRequest } from "../../api/axios";
import { resendUserOTPApi, validateUserOtpApi } from "../../api/apiEndPoint";
import jwt_decode from "jwt-decode";
import axios from "axios";

const Otp = ({ navigation, route }) => {
  const { user } = route.params;

  const [otp, setOtp] = useState("");
  const [resendOtp, setResentOtp] = useState("");
  //code
  let resendOtpTimerInterval;
  let RESEND_OTP_TIME_LIMIT = 10;
  const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(
    RESEND_OTP_TIME_LIMIT
  );

  //to start resent otp option
  const startResendOtpTimer = () => {
    if (resendOtpTimerInterval) {
      clearInterval(resendOtpTimerInterval);
    }
    resendOtpTimerInterval = setInterval(() => {
      if (resendButtonDisabledTime <= 0) {
        clearInterval(resendOtpTimerInterval);
      } else {
        setResendButtonDisabledTime(resendButtonDisabledTime - 1);
      }
    }, 1000);
  };

  const decodeJwt = (token) => {
    let tokenObj = jwt_decode(token);
    _setData("@tokenObj", JSON.stringify(tokenObj));
  };

  useEffect(() => {
    startResendOtpTimer();
    return () => {
      if (resendOtpTimerInterval) {
        clearInterval(resendOtpTimerInterval);
      }
    };
  }, [resendButtonDisabledTime]);

  const handleConfirmOtp = (phoneNo) => {
    try {
      const modal = {
        userID: 0,
        userKey: "string",
        languageCode: "string",
        ip: "string",
        responseState: 200,

        user: {
          userId: user && user.userId,
          userLogin: "string",
          password: "string",
          email: "string",
          mobile: "string",
          cnic: "string",
          isOtpverified: true,
          isEmailVerified: true,
          mobileOtp: resendOtp !== "" ? resendOtp : otp,
          emailOtp: "string",
          todayOtpattempts: 0,
          createdAt: "2022-12-05T09:05:32.854Z",
          updatedAt: "2022-12-05T09:05:32.854Z",
          createdBy: 0,
          updatedBy: 0,
          dataStateId: 1,
          isSuperAdmin: false,
          userLanguageCode: "string",
        },
      };

      PostRequest(validateUserOtpApi, modal).then((res) => {
        console.log(modal);
        if (res === 0) {
          alert("You have entered an invalid code.");
        } else {
          Alert.alert("", "Your account is successfully created.", [
            {
              text: "Proceed",
              onPress: () => {
                _setData("@token", JSON.stringify(user));
                decodeJwt(res);
                navigation.replace("AppStack");
                // navigation.replace("SignIn");
              },
            },
          ]);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const sendOTP = async (receiver, sender, otp) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer YourAuthToken",
      },
      body: JSON.stringify({ receiver, sender, otp }),
      mode: "cors",
    };

    // Send the request
    fetch(
      "http://95.216.202.81/plesk-site-preview/api.bunnyaad.com/api/User/SendOTP",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Response:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleResentOtp = () => {
    setResendButtonDisabledTime(60);
    try {
      const modal = {
        userID: 0,
        userKey: "string",
        languageCode: "en",
        ip: "string",
        responseState: 200,
        user: {
          userId: user && user.userId,
          userLogin: "string",
          password: "string",
          email: "string",
          mobile: "string",
          cnic: "string",
          isOtpverified: true,
          isEmailVerified: true,
          mobileOtp: "string",
          emailOtp: "string",
          todayOtpattempts: 0,
          createdAt: "2022-12-05T12:37:12.747Z",
          updatedAt: "2022-12-05T12:37:12.747Z",
          createdBy: 0,
          updatedBy: 0,
          dataStateId: 1,
          isSuperAdmin: false,
          userLanguageCode: "string",
        },
      };
      PostRequest(resendUserOTPApi, modal).then((res) => {
        if (res === 0) {
          console.log("error");
        } else {
          setResentOtp(res?.user.mobileOtp);
          sendOTP(res?.user.mobile, "BUNNYAAD", res.user.mobileOtp);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
      <ImageBackground source={Background.topshadebg} style={{ height: 200 }}>
        <View
          style={{
            backgroundColor: "#fff",
            width: "75%",
            borderRadius: 15,
            alignSelf: "center",
            paddingVertical: 20,
            position: "absolute",
            bottom: -15,
          }}
        >
          <Image
            source={Logo.bunyad_updated_logo}
            style={{ alignSelf: "center", height: 110, width: 200 }}
          />
        </View>
      </ImageBackground>

      <KeyboardAwareScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={"handled"}
        style={styles.form}
      >
        <AppFormText
          style={{
            marginHorizontal: 40,
          }}
          size={20}
          color={"#000"}
          title="Confirm OTP"
          onPress={() => navigation.navigate("NSignIn")}
        />
        <AppText
          title={"Enter OTP here"}
          marginHorizontal={50}
          marginVertical={10}
        />
        {/* <AppText
                    title={`OTP-${resendOtp !== "" ? resendOtp : user && user.mobileOtp}`}
                    marginHorizontal={50}
                    marginVertical={10}
                /> */}
        <View style={styles.action}>
          <OtpInputs
            style={{
              marginHorizontal: 25,
              width: "90%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
            inputStyles={{
              width: 55,
              height: 55,
              textAlign: "center",
              borderRadius: 5,
              color: "#000",
              borderWidth: 2,
              borderColor: Colors.lightYello,
            }}
            handleChange={(code) => setOtp(code)}
            numberOfInputs={4}
          />
        </View>
        {/* sddvsg */}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 30,
          }}
        >
          {resendButtonDisabledTime > 0 ? (
            <AppFormText
              title={`Expier in ${resendButtonDisabledTime}s`}
              color={Colors.lightGrey}
              size={12}
              onPress={() => navigation.navigate("NSignIn")}
            />
          ) : (
            <AppFormText
              title={`Resend OTP`}
              color={Colors.lightYello}
              size={12}
              onPress={() => handleResentOtp()}
            />
          )}
        </View>

        <View
          style={{
            alignItems: "center",
            marginTop: 35,
            marginBottom: 35,
            width: "100%",
          }}
        >
          <TouchableOpacity
            onPress={() => handleConfirmOtp()}
            style={{
              height: 50,
              width: "90%",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 15,
              flexWrap: "wrap",
              overflow: "hidden",
            }}
          >
            <ImageBackground
              source={Background.topshadebg}
              resizeMode="stretch"
              style={{
                height: 50,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "#fff",
                  textTransform: "uppercase",
                }}
              >
                confirm
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Otp;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    marginTop: 20,
  },
  action: {
    flexDirection: "row",
    marginVertical: 10,
    paddingBottom: 5,
    marginHorizontal: 30,
  },
});
