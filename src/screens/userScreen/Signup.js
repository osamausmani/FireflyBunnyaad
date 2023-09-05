import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { insertUserApi } from "../../api/apiEndPoint";
import { PostRequest } from "../../api/axios";
import {
  AppFormField,
  AppFormText,
  AppSubmitButton,
  Background,
  Logo,
  Icon,
  ValidateSignUp,
} from "../../constants";
import axios from "axios";

const Signup = ({ navigation }) => {
  const [formData, setFormData] = React.useState({
    name: "",
    phoneNo: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = React.useState({
    name: "",
    phoneNo: "",
    password: "",
    confirmPassword: "",
  });
  const [showIcon, setShowIcon] = React.useState({
    password: true,
    confirmPassword: true,
  });
  const [isDisabled, setIsDisabled] = useState(false);
  const onFormChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  // function handleOtp(msisdn, otp) {
  //     console.log(msisdn,otp,"dfhsddcfs")
  //     fetch(`https://bsms.its.com.pk/api?key=608a33d40dac0e40f0845f04ffbfdd24&originator=Test&receiver=${msisdn}&message=Your+OTP+code+is%3A+${otp}`, {
  //         method: 'GET',
  //     });
  // }

  const sendOTP = async (receiver, sender, otp) => {
    console.log(receiver, sender, otp);
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

  // function handleOtp(msisdn, otp) {
  //     const url = `https://bsms.its.com.pk/api?key=c43c3d64527bad381c6c3237c9e4493a&originator=Test&receiver=${msisdn}&sender=BUNNYAAD&message=Your+OTP+code+is%3A+${otp}`;

  //     fetch(url, {
  //       method: 'GET',
  //     })
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error('Network response was not ok');
  //         }
  //         return response.json();
  //       })
  //       .then((data) => {
  //         console.log(data);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }

  const InsetUser = () => {
    try {
      const model = {
        userID: 0,
        userKey: "string",
        languageCode: "en",
        ip: "string",
        responseState: 200,

        user: {
          userId: 0,
          userLogin: formData?.phoneNo,
          password: formData?.password,
          email: "string",
          mobile: formData?.phoneNo,
          cnic: "string",
          isOtpverified: true,
          isEmailVerified: true,
          mobileOtp: "string",
          emailOtp: "string",
          todayOtpattempts: 0,
          createdAt: "2022-12-02T07:10:06.480Z",
          updatedAt: "2022-12-02T07:10:06.480Z",
          createdBy: 0,
          updatedBy: 0,
          dataStateId: 1,
          isSuperAdmin: false,
          userLanguageCode: "en",
        },

        userTextList: [
          {
            userId: 0,
            languageCode: "en",
            firstName: formData?.name,
            lastName: "string",
            dataStateId: 1,
          },
        ],
      };
      PostRequest(insertUserApi, model).then((res) => {
        console.log(res);
        if (res === 0) {
          console.log("error");
          setIsDisabled(false);
        } else {
          if (res.responseState == 200) {
            sendOTP(res.user.userLogin, "BUNNYAAD", res.user.mobileOtp);
            navigation.navigate("Otp", {
              user: res.user,
            });
            // console.log('data is here',res.user.userLogin, res.user.mobileOtp);

            setIsDisabled(false);
          } else {
            setIsDisabled(false);
            setError({
              name: "",
              phoneNo: "Phone no is already registered",
              password: "",
              confirmPassword: "",
            });
            // console.log("res", res.exceptionList[0].code, res.exceptionList[0].description);
          }
        }
      });
    } catch (error) {
      console.log(error);
      setIsDisabled(false);
    }
  };

  const handleSignUp = () => {
    setIsDisabled(true);
    const checkError = ValidateSignUp(formData);

    if (Object.values(checkError).every((e) => e === "")) {
      InsetUser();
      // console.log("signup success");
      // navigation.navigate('SignIn')

      setError({
        name: "",
        phoneNo: "",
        password: "",
        confirmPassword: "",
      });
    } else {
      setIsDisabled(false);
      setError(checkError);
      console.log("field Error");
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
      <ImageBackground source={Background.topshade} style={{ height: 200 }}>
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
        keyboardShouldPersistTaps={"handled"}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={styles.form}
      >
        <AppFormText
          style={{
            marginHorizontal: 40,
          }}
          size={22}
          color={"#000"}
          title="Create Account"
        />
        <AppFormField
          placeholder={"User Name"}
          icon={"user"}
          value={formData.name}
          onChange={(text) => onFormChange("name", text)}
          errorMessage={error.name}
        />

        <AppFormField
          placeholder={"03009880623"}
          icon={"smartphone"}
          value={formData.phoneNo}
          onChange={(text) => onFormChange("phoneNo", text)}
          keyboardType={"number-pad"}
          errorMessage={error.phoneNo}
        />
        <AppFormField
          placeholder={"Password"}
          icon={"lock"}
          value={formData.password}
          onChange={(text) => onFormChange("password", text)}
          onPress={() =>
            setShowIcon((prev) => ({ ...prev, password: !prev.password }))
          }
          secureTextEntry={showIcon.password}
          eyeicon={!showIcon.password ? Icon.show_eye : Icon.hide_eye}
          errorMessage={error.password}
        />
        <AppFormField
          placeholder={"Re-type Password"}
          icon={"lock"}
          value={formData.confirmPassword}
          onChange={(text) => onFormChange("confirmPassword", text)}
          secureTextEntry={showIcon.confirmPassword}
          onPress={() =>
            setShowIcon((prev) => ({
              ...prev,
              confirmPassword: !prev.confirmPassword,
            }))
          }
          eyeicon={!showIcon.confirmPassword ? Icon.show_eye : Icon.hide_eye}
          errorMessage={error.confirmPassword}
        />

        <View
          style={{
            alignItems: "center",
            marginTop: 35,
            marginBottom: 35,
            width: "100%",
          }}
        >
          <AppSubmitButton
            disabled={isDisabled}
            isYellow={true}
            name={"Register"}
            onPress={() => {
              handleSignUp();
            }}
          />

          <AppFormText
            title="Login"
            onPress={() => navigation.navigate("SignIn")}
          >
            Already have an account?{" "}
          </AppFormText>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    marginTop: 20,
  },
  action: {
    flexDirection: "row",
    marginVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
    marginHorizontal: 30,
  },
});
