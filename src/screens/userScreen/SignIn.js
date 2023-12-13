// import {
//   Image,
//   ImageBackground,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import React, { useState } from "react";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import {
//   Background,
//   Logo,
//   Icon,
//   AppFormField,
//   AppFormText,
//   AppSubmitButton,
//   Colors,
// } from "../../constants";
// import { PostRequest } from "../../api/axios";
// import { loginUserApi } from "../../api/apiEndPoint";
// import jwt_decode from "jwt-decode";
// import { _setData } from "../../constants/AsyncStorageHelper";

// const SignIn = ({ navigation }) => {
//   const [formData, setFormData] = React.useState({
//     phoneNo: "",
//     password: "",
//   });
//   const [error, setError] = React.useState({
//     phoneNo: "",
//     password: "",
//   });
//   const [showIcon, setShowIcon] = React.useState(true);
//   const [message, setMessage] = useState("");
//   const [isShowError, setisShowError] = useState(false);

//   const [isDisabled, setIsDisabled] = React.useState(false);
//   const onFormChange = (key, value) => {
//     setFormData({
//       ...formData,
//       [key]: value,
//     });
//   };

//   const checkValidity = () => {
//     if (!formData.phoneNo) {
//       setError({
//         ...error,
//         phoneNo: "password is required",
//       });
//     } else if (
//       formData.phoneNo &&
//       (formData.phoneNo.length < 10 || formData.phoneNo.length > 11)
//     ) {
//       setError({
//         ...error,
//         phoneNo: "password is too short",
//       });
//     } else if (!formData.password) {
//       setError({
//         ...error,
//         password: "password is required",
//       });
//     } else {
//       setIsDisabled(true);
//       loginUser();
//     }
//   };

//   const loginUser = () => {
//     setisShowError(false);
//     try {
//       const model = {
//         userID: 0,
//         userKey: "string",
//         languageCode: "en",
//         ip: "string",
//         responseState: 200,
//         user: {
//           userId: 0,
//           userLogin: formData?.phoneNo,
//           password: formData?.password,
//           email: "string",
//           mobile: formData?.phoneNo,
//           cnic: "string",
//           isOtpverified: true,
//           isEmailVerified: true,
//           mobileOtp: "string",
//           emailOtp: "string",
//           todayOtpattempts: 0,
//           createdAt: "2022-12-05T13:29:18.866Z",
//           updatedAt: "2022-12-05T13:29:18.866Z",
//           createdBy: 0,
//           updatedBy: 0,
//           dataStateId: 1,
//           isSuperAdmin: false,
//           userLanguageCode: "en",
//         },
//       };

//       PostRequest(loginUserApi, model).then((res) => {
//         console.log(res);
//         console.log(loginUserApi);
//         if (res === 0) {
//           console.log("error", res);
//           setIsDisabled(false);
//           setMessage("please enter valid information");
//           setisShowError(true);
//         } else {
//           setIsDisabled(false);
//           setisShowError(false);
//           _setData("@token", JSON.stringify(res));
//           decodeJwt(res);
//           navigation.replace("AppStack");
//           console.log(res);
//         }
//       });
//     } catch (error) {
//       console.log(error);
//       setIsDisabled(false);
//     }
//   };

//   const decodeJwt = (token) => {
//     let tokenObj = jwt_decode(token);
//     console.log(tokenObj, "---parse token");
//     _setData("@tokenObj", JSON.stringify(tokenObj));
//   };

//   return (
//     <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
//       <ImageBackground source={Background.topshadebg} style={{ height: 200 }}>
//         <View
//           style={{
//             backgroundColor: "#fff",
//             width: "75%",
//             borderRadius: 15,
//             alignSelf: "center",
//             paddingVertical: 20,
//             position: "absolute",
//             bottom: -15,
//           }}
//         >
//           <Image
//             source={Logo.bunyad_updated_logo}
//             style={{ alignSelf: "center", height: 110, width: 200 }}
//           />
//         </View>
//       </ImageBackground>

//       <KeyboardAwareScrollView
//         keyboardShouldPersistTaps={"handled"}
//         showsHorizontalScrollIndicator={false}
//         showsVerticalScrollIndicator={false}
//         style={styles.form}
//       >
//         {isShowError && (
//           <AppFormText
//             style={{
//               marginHorizontal: 40,
//             }}
//             size={12}
//             color={Colors.fieldTextColor}
//             title={message}
//           />
//         )}

//         <AppFormText
//           style={{
//             marginHorizontal: 40,
//           }}
//           size={22}
//           color={"#000"}
//           title="Login"
//         />

//         <AppFormField
//           placeholder={"03009880623"}
//           icon={"smartphone"}
//           value={formData.phoneNo}
//           onChange={(text) => onFormChange("phoneNo", text)}
//           keyboardType={"number-pad"}
//         />

//         <AppFormField
//           placeholder={"Password"}
//           icon={"lock"}
//           value={formData.password}
//           onChange={(text) => onFormChange("password", text)}
//           secureTextEntry={showIcon}
//           onPress={() => setShowIcon(!showIcon)}
//           eyeicon={showIcon ? Icon.show_eye : Icon.hide_eye}
//         />

//         <View
//           style={{
//             alignItems: "flex-end",
//             marginHorizontal: 30,
//             fontFamily: "TAN Aegean",
//           }}
//         >
//           <AppFormText
//             title="Fogot your password ?"
//             onPress={() => navigation.navigate("ForgetPass")}
//           />
//         </View>

//         <View
//           style={{
//             alignItems: "center",
//             marginTop: 35,
//             marginBottom: 35,
//             width: "100%",
//           }}
//         >
//           {/* <AppSubmitButton
//                     name={"Login"}
//                     /> */}
//           <AppSubmitButton
//             disabled={isDisabled}
//             isYellow={true}
//             name={"Login"}
//             onPress={() => {
//               checkValidity();
//             }}
//           />

//           <TouchableOpacity
//             onPress={() => navigation.navigate("AppStack")}
//             style={{
//               height: 45,
//               width: "90%",
//               justifyContent: "center",
//               alignItems: "center",
//               borderRadius: 15,
//               backgroundColor: "#343436",
//               marginTop: 10,
//             }}
//           >
//             <Text
//               style={{
//                 fontSize: 16,
//                 color: "#fff",
//               }}
//             >
//               Continue as a Guest
//             </Text>
//           </TouchableOpacity>
//           <AppFormText
//             title="Sign Up"
//             onPress={() => navigation.navigate("SignUp")}
//           >
//             Don't have an account?{" "}
//           </AppFormText>
//         </View>
//       </KeyboardAwareScrollView>
//     </SafeAreaView>
//   );
// };

// export default SignIn;

// const styles = StyleSheet.create({
//   form: {
//     flex: 1,
//     marginTop: 20,
//   },
//   action: {
//     flexDirection: "row",
//     marginVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#f2f2f2",
//     paddingBottom: 5,
//     marginHorizontal: 30,
//   },
// });

// // <AppFormField
// // title={"Password"}
// // value={formData.password}
// // onChange={(text) => onFormChange('password', text)}
// // errorMessage={error.password}

// // secureTextEntry={showIcon.password}
// // placeholder={"********"}
// // onPress={() => onShowPass('password')}
// // icon={showIcon.password ? show_eye : hide_eye}
// // />

import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Background,
  Logo,
  Icon,
  AppFormField,
  AppFormText,
  AppSubmitButton,
  Colors,
  Images,
} from "../../constants";
import { PostRequest } from "../../api/axios";
import { loginUserApi } from "../../api/apiEndPoint";
import jwt_decode from "jwt-decode";
import { _setData } from "../../constants/AsyncStorageHelper";

const SignIn = ({ navigation }) => {
  const [formData, setFormData] = React.useState({
    phoneNo: "",
    password: "",
  });
  const [error, setError] = React.useState({
    phoneNo: "",
    password: "",
  });
  const [showIcon, setShowIcon] = React.useState(true);
  const [message, setMessage] = useState("");
  const [isShowError, setisShowError] = useState(false);

  const [isDisabled, setIsDisabled] = React.useState(false);
  const onFormChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const checkValidity = () => {
    if (!formData.phoneNo) {
      setError({
        ...error,
        phoneNo: "password is required",
      });
    } else if (
      formData.phoneNo &&
      (formData.phoneNo.length < 10 || formData.phoneNo.length > 11)
    ) {
      setError({
        ...error,
        phoneNo: "password is too short",
      });
    } else if (!formData.password) {
      setError({
        ...error,
        password: "password is required",
      });
    } else {
      setIsDisabled(true);
      loginUser();
    }
  };

  const loginUser = () => {
    setisShowError(false);
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
          createdAt: "2022-12-05T13:29:18.866Z",
          updatedAt: "2022-12-05T13:29:18.866Z",
          createdBy: 0,
          updatedBy: 0,
          dataStateId: 1,
          isSuperAdmin: false,
          userLanguageCode: "en",
        },
      };

      PostRequest(loginUserApi, model).then((res) => {
        console.log(res);
        console.log(loginUserApi);
        if (res === 0) {
          console.log("error", res);
          setIsDisabled(false);
          setMessage("please enter valid information");
          setisShowError(true);
        } else {
          setIsDisabled(false);
          setisShowError(false);
          _setData("@token", JSON.stringify(res));
          decodeJwt(res);
          navigation.replace("AppStack");
          console.log(res);
        }
      });
    } catch (error) {
      console.log(error);
      setIsDisabled(false);
    }
  };

  const decodeJwt = (token) => {
    let tokenObj = jwt_decode(token);
    console.log(tokenObj, "---parse token");
    _setData("@tokenObj", JSON.stringify(tokenObj));
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
        keyboardShouldPersistTaps={"handled"}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={styles.form}
      >
        {isShowError && (
          <AppFormText
            style={{
              marginHorizontal: 40,
            }}
            size={12}
            color={Colors.fieldTextColor}
            title={message}
          />
        )}

        <TouchableOpacity
          style={{
            alignItems: "center",
            marginTop: 20,
          }}
          activeOpacity={1}
          onPress={() => {
            navigation.navigate("WebView", {
              webURL: "https://bunnyaad.com",
            });
          }}
        >
          <AppFormText
            style={{}}
            size={26}
            color={"#EFAF0F"}
            title="Visit Our Website"
          />

          <AppFormText
            style={{ marginTop: -2 }}
            size={20}
            color={"#0f0f0f"}
            title="Click Here"
          />

          <Image
            source={Images.bunyadWeb}
            style={{ alignSelf: "center", width: 160, height: 160 }}
          />
        </TouchableOpacity>

        {/* <AppFormField
          placeholder={"03009880623"}
          icon={"smartphone"}
          value={formData.phoneNo}
          onChange={(text) => onFormChange("phoneNo", text)}
          keyboardType={"number-pad"}
        /> */}

        {/* <AppFormField
          placeholder={"Password"}
          icon={"lock"}
          value={formData.password}
          onChange={(text) => onFormChange("password", text)}
          secureTextEntry={showIcon}
          onPress={() => setShowIcon(!showIcon)}
          eyeicon={showIcon ? Icon.show_eye : Icon.hide_eye}
        /> */}

        <View
          style={{
            alignItems: "center",
            marginTop: 35,
            marginBottom: 35,
            width: "100%",
          }}
        >
          {/* <AppSubmitButton
                    name={"Login"}
                    /> */}
          <AppSubmitButton
            disabled={isDisabled}
            isYellow={true}
            name={"Login"}
            onPress={() => {
              navigation.navigate("WebView", {
                webURL: "https://bunnyaad.com//web/login",
              });
            }}
          />

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("WebView", {
                webURL: "https://bunnyaad.com/web/signup",
              });
            }}
            style={{
              height: 45,
              width: "90%",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 15,
              backgroundColor: "#343436",
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#fff",
              }}
            >
              SignUp
            </Text>
          </TouchableOpacity>
          {/* <AppFormText
            title="Sign Up"
            onPress={() => navigation.navigate("SignUp")}
          >
            Don't have an account?{" "}
          </AppFormText> */}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    marginTop: 20,
  },
  action: {
    flexDirection: "row",
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
    marginHorizontal: 30,
  },
});

// <AppFormField
// title={"Password"}
// value={formData.password}
// onChange={(text) => onFormChange('password', text)}
// errorMessage={error.password}

// secureTextEntry={showIcon.password}
// placeholder={"********"}
// onPress={() => onShowPass('password')}
// icon={showIcon.password ? show_eye : hide_eye}
// />
