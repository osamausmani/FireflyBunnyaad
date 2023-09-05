
import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Background, Colors, Logo } from '../../constants'
import OtpInputs from 'react-native-otp-inputs';
import AppFormText from '../../component/appComponnet/AppFormText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { _setData } from '../../constants/AsyncStorageHelper';
import { PostRequest } from '../../api/axios';
import { userModel, User, userTextList } from "../../models"
import { resendUserOTPApi, validateUserOtpApi } from '../../api/apiEndPoint';
import { AppContext } from '../../contextApi/AppProvider';
import jwt_decode from "jwt-decode";


const ModalOtp = ({ visible, onCancel, onPressSubmit }) => {

    const { modalData, authData, setAuthData } = useContext(AppContext)
    const [resendOtp, setResentOtp] = useState("")
    const [otpError, setOtpError] = useState("")
    const [isotpError, setisotpError] = useState(false)

    const [otp, setOtp] = useState('')
    //code
    let resendOtpTimerInterval;
    let RESEND_OTP_TIME_LIMIT = 34;
    const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(
        RESEND_OTP_TIME_LIMIT,
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

    //on click of resend button
    const decodeJwt = (token) => {
        let tokenObj = jwt_decode(token)
        console.log(tokenObj, "---parse token")
        _setData('@tokenObj', JSON.stringify(tokenObj))
        setAuthData({
            ...authData,
            isLogin: true,
            userId: tokenObj.UserID,
            userName: tokenObj.FirstName,
            phNumber: tokenObj.UserLogin
        })
    }

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
                userModel,
                user: {
                    ...User,
                    userId: modalData && modalData.user && modalData.user.userId,
                    mobileOtp: otp,
                }

            }
            console.log(JSON.stringify(modal, null, 2), "otp");

            PostRequest(validateUserOtpApi, modal).then(res => {
                if (res === 0) {
                    console.log("error");
                    setOtpError("enter valid otp");
                    setisotpError(true)
                }
                else {
                    _setData('@token', JSON.stringify(res))
                    decodeJwt(res)
                    onPressSubmit()
                    console.log("user otp res", res);
                    setisotpError(false);
                    setOtpError("");
                }
            }
            )
        } catch (error) {
            console.log(error);
        }
    }

    const handleResentOtp = () => {
        setResendButtonDisabledTime(60)
        try {
            const modal = {
                userModel,
                user: {
                    ...User,
                    userId: modalData && modalData.user && modalData.user.userId,
                }
            }
            PostRequest(resendUserOTPApi, modal).then(res => {
                if (res === 0) {
                    console.log("error");
                }
                else {
                    console.log("user otp reset", res?.user.mobileOtp);
                    setResentOtp(res?.user.mobileOtp)
                }
            }
            )
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <Modal
            animationType="fade"
            statusBarTranslucent
            visible={visible}
        >
            <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
                <ImageBackground
                    // source={Background.topshade}
                    style={{ height: 200, backgroundColor: Colors.lightYello }}>
                    <View style={{
                        backgroundColor: "#fff",
                        width: "75%",
                        borderRadius: 15,
                        alignSelf: "center",
                        paddingVertical: 20,
                        position: "absolute",
                        bottom: -15
                    }}>
                        <TouchableOpacity
                            style={{ marginLeft: 10 }}
                            onPress={onCancel}>
                            <AntDesign size={26} color={Colors.fieldTextColor} name={"arrowleft"} />
                        </TouchableOpacity>
                        <Image source={Logo.nlogo} style={{ alignSelf: "center", height: 110, width: 110, }} />
                    </View>
                </ImageBackground>

                <KeyboardAwareScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={styles.form}>
                    <AppFormText
                        style={{
                            marginHorizontal: 40
                        }}
                        size={20}
                        color={"#000"}
                        title="Confirm OTP"
                    // onPress={() => navigation.navigate('NSignIn')}
                    />
                    <Text style={{
                        marginHorizontal: 50,
                        marginVertical: 10
                    }}>Enter OTP here</Text>
                    {isotpError && <Text style={{
                        marginHorizontal: 50,
                        marginVertical: 0,
                        color: Colors.lightYello
                    }}>{otpError} **</Text>
                    }
                    <View style={styles.action}>
                        <OtpInputs
                            style={{
                                marginHorizontal: 25,
                                width: "90%",
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}
                            inputStyles={{
                                width: 55,
                                height: 55,
                                textAlign: 'center',
                                borderRadius: 5,
                                color: "#000",
                                borderWidth: 2,
                                borderColor: Colors.lightYello,
                            }}

                            handleChange={(code) => setOtp(code)}
                            numberOfInputs={4}
                        />
                    </View>

                    <View style={{ marginHorizontal: 50, }}>
                        {resendButtonDisabledTime > 0 ? (
                            <AppFormText
                                title={`Expier in ${resendButtonDisabledTime}s`}
                                color={Colors.lightGrey}
                                size={12}
                            // onPress={() => navigation.navigate('NSignIn')}
                            />
                        ) :
                            <AppFormText
                                title={`Resend OTP`}
                                color={Colors.lightYello}
                                size={12}
                                onPress={() => handleResentOtp()}
                            />
                        }

                    </View>

                    <View style={{ alignItems: 'center', marginTop: 35, marginBottom: 35, width: "100%", }}>
                        <TouchableOpacity
                            onPress={() => {
                                handleConfirmOtp()

                            }}
                            style={{ height: 50, width: "90%", justifyContent: "center", alignItems: "center", borderRadius: 70, flexWrap: "wrap", overflow: "hidden" }}>
                            <ImageBackground source={Background.topshade} resizeMode="stretch" style={{ height: 50, width: "100%", justifyContent: "center", alignItems: "center", }}>
                                <Text style={{ fontSize: 16, color: "#fff", textTransform: "uppercase" }}>
                                    confirm
                                </Text>
                            </ImageBackground>
                        </TouchableOpacity>

                    </View>



                </KeyboardAwareScrollView>

            </SafeAreaView >
        </Modal>
    )
}

export default ModalOtp

const styles = StyleSheet.create({
    form: {
        flex: 1,
        marginTop: 20

    },
    action: {
        flexDirection: 'row',
        marginVertical: 10,
        paddingBottom: 5,
        marginHorizontal: 30,
    },
})