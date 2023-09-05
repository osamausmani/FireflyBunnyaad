
import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AppFormField, AppText, Background, Colors, Logo } from '../../constants'
import OtpInputs from 'react-native-otp-inputs';
import AppFormText from '../../component/appComponnet/AppFormText';
import { PostRequest } from '../../api/axios';
import { resendUserOTPByPhoneNumberApi } from '../../api/apiEndPoint';

const ForgotPassword = ({ navigation }) => {
    const [phoneNo, setPhoneNo] = useState('')
    const [errorphoneNo, setErrorPhoneNo] = useState('')



    const checkValidity = () => {
        if (phoneNo == "") {
            setErrorPhoneNo("Phone number is required *")
        }
        else if (phoneNo && (phoneNo.length < 10 || phoneNo.length > 11)) {
            setErrorPhoneNo("Please enter valid mobile no")
        }
        else {
            hadleMobileOtp()
        }

    }
    const sendOTP = async (receiver, sender, otp) => {
        console.log(receiver,sender,otp)
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YourAuthToken'
          },
          body: JSON.stringify({ receiver, sender, otp }),
          mode: 'cors'
        };
      
        // Send the request
        fetch('http://95.216.202.81/plesk-site-preview/api.bunnyaad.com/api/User/SendOTP', requestOptions)
          .then(response => response.json())
          .then(data => {
            console.log('Response:', data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      };
    const hadleMobileOtp = () => {
        try {
            const model = {
                "userID": 0,
                "userKey": "string",
                "languageCode": "string",
                "ip": "string",
                "responseState": 200,

                "user": {
                    "userId": 0,
                    "userLogin": phoneNo,
                    "password": "string",
                    "email": "string",
                    "mobile": phoneNo,
                    "cnic": "string",
                    "isOtpverified": true,
                    "isEmailVerified": true,
                    "mobileOtp": "string",
                    "emailOtp": "string",
                    "todayOtpattempts": 0,
                    "createdAt": "2022-12-05T09:53:46.460Z",
                    "updatedAt": "2022-12-05T09:53:46.460Z",
                    "createdBy": 0,
                    "updatedBy": 0,
                    "dataStateId": 1,
                    "isSuperAdmin": false,
                    "userLanguageCode": "en"
                }
            }
            console.log(model, "mode;");
            PostRequest(resendUserOTPByPhoneNumberApi, model).then(res => {
                if (res === 0) {
                    console.log("error");
                }
                else {
                    sendOTP(res?.user.mobile,'BUNNYAAD', res?.user.mobileOtp);

                    navigation.navigate("passwordOtp", {
                        user: res.user
                    })
                    console.log(res);
                }
            }
            )
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
            <ImageBackground source={Background.topshade} style={{ height: 200 }}>
                <View style={{
                    backgroundColor: "#fff",
                    width: "75%",
                    borderRadius: 15,
                    alignSelf: "center",
                    paddingVertical: 20,
                    position: "absolute",
                    bottom: -15
                }}>
                    <Image source={Logo.bunyad_updated_logo} style={{ alignSelf: "center", height: 110, width: 200, }} />
                </View>
            </ImageBackground>

            <AppFormText
                style={{
                    marginHorizontal: 40
                }}
                size={20}
                color={"#000"}
                title="Reset Password"
                onPress={() => navigation.navigate('NSignIn')}
            />
            <AppText
                title={"Please confirm your number"}
                marginHorizontal={50}
                marginVertical={10}
            />
            <AppFormField
                placeholder={"03000000000"}
                icon={"smartphone"}
                value={phoneNo}
                onChange={(text) => setPhoneNo(text)}
                keyboardType={'number-pad'}
                errorMessage={errorphoneNo}
            />




            <View style={{ alignItems: 'center', marginTop: 35, marginBottom: 35, width: "100%", }}>

                <TouchableOpacity
                    onPress={() => {
                        checkValidity()
                        // navigation.navigate("passwordOtp")
                    }}
                    style={{ height: 50, width: "90%", justifyContent: "center", alignItems: "center", borderRadius: 15, flexWrap: "wrap", overflow: "hidden" }}>
                    <ImageBackground source={Background.topshade} resizeMode="stretch" style={{ height: 50, width: "100%", justifyContent: "center", alignItems: "center", }}>
                        <Text style={{ fontSize: 16, color: "#fff", textTransform: "uppercase" }}>
                            confirm
                        </Text>
                    </ImageBackground>
                </TouchableOpacity>

            </View>



        </SafeAreaView>
    )
}

export default ForgotPassword

const styles = StyleSheet.create({
    form: {
        flex: 1,
        marginTop: 20,
        backgroundColor: Colors.white

    },
    action: {
        flexDirection: 'row',
        marginVertical: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
        marginHorizontal: 30,
    },
})

