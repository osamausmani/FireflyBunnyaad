import React from "react";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { insertUserApi, resetUserPasswordApi } from "../../api/apiEndPoint";
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

const PasswordChange = ({ navigation, route }) => {
  const { user } = route.params;
  const [formData, setFormData] = React.useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = React.useState({
    password: "",
    confirmPassword: "",
  });
  const [showIcon, setShowIcon] = React.useState({
    password: true,
    confirmPassword: true,
  });

  const onFormChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const checkValidity = () => {
    if (!formData.password) {
      setError({
        ...error,
        password: "password is required",
      });
    } else if (formData && formData.password.length < 5) {
      setError({
        ...error,
        password: "password is too short",
      });
    } else if (!formData.confirmPassword) {
      setError({
        ...error,
        confirmPassword: "confirm password is required",
      });
    } else if (formData && formData.confirmPassword !== formData.password) {
      setError({
        ...error,
        confirmPassword: "password not matched",
      });
    } else {
      handlePasswordChanged();
    }
  };

  const handlePasswordChanged = () => {
    setError({
      password: "",
      confirmPassword: "",
    });
    try {
      const model = {
        userID: 0,
        userKey: "string",
        languageCode: "string",
        ip: "string",
        responseState: 200,
        user: {
          userId: user && user.UserID,
          userLogin: "string",
          password: "123456",
          email: "string",
          mobile: "string",
          cnic: "string",
          isOtpverified: true,
          isEmailVerified: true,
          mobileOtp: "string",
          emailOtp: "string",
          todayOtpattempts: 0,
          createdAt: "2022-12-06T08:09:18.467Z",
          updatedAt: "2022-12-06T08:09:18.467Z",
          createdBy: 0,
          updatedBy: 0,
          dataStateId: 1,
          isSuperAdmin: false,
          userLanguageCode: "en",
        },
      };
      console.log(model, "mode;");
      PostRequest(resetUserPasswordApi, model).then((res) => {
        if (res === 0) {
          console.log("error");
        } else {
          console.log("res");
          navigation.navigate("SignIn");
        }
      });
    } catch (error) {
      console.log(error);
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
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={"handled"}
        style={styles.form}
      >
        <AppFormText
          style={{
            marginHorizontal: 40,
          }}
          size={22}
          color={"#000"}
          title="Reset Password"
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
            name={"Reset Password"}
            onPress={() => checkValidity()}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default PasswordChange;

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
