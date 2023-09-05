import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Modal, Pressable, StatusBar } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Background, Logo, Icon, AppFormField, AppFormText, Colors, AppSubmitButton } from '../../constants'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { AppContext } from '../../contextApi/AppProvider';
import { _setData } from '../../constants/AsyncStorageHelper';
import jwt_decode from "jwt-decode";
import { PostRequest } from '../../api/axios';
import { loginUserApi } from '../../api/apiEndPoint';

const ModalSignIn = ({ visible, onCancel, onPresSignup, onPressLogin }) => {
    const { modalData, authData, setAuthData } = useContext(AppContext)

    const [message, setMessage] = useState("")
    const [isShowError, setisShowError] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    const [formData, setFormData] = useState({
        phoneNo: '',
        password: '',
    })
    const [error, setError] = useState({
        phoneNo: '',
        password: '',
    })
    const [showIcon, setShowIcon] = useState(true)

    const onFormChange = (key, value) => {
        setFormData({
            ...formData,
            [key]: value
        })
    }

    const checkValidity = () => {
        if (!formData.phoneNo) {
            setError({
                ...error,
                phoneNo: "Ph number is required"
            })
        }
        else if (formData.phoneNo && (formData.phoneNo.length < 10 || formData.phoneNo.length > 11)) {
            setError({
                ...error,
                phoneNo: "password is too short"
            })
        }
        else if (!formData.password) {
            setError({
                ...error,
                password: "password is required"
            })
        }

        else {
            setIsDisabled(true)
            loginUser()
        }

    }

    const loginUser = () => {
        setisShowError(false)
        console.log(formData, "data")

        try {
            const model = {
                "userID": 0,
                "userKey": "string",
                "languageCode": "en",
                "ip": "string",
                "responseState": 200,
                "user": {
                    "userId": 0,
                    "userLogin": formData?.phoneNo,
                    "password": formData?.password,
                    "email": "string",
                    "mobile": formData?.phoneNo,
                    "cnic": "string",
                    "isOtpverified": true,
                    "isEmailVerified": true,
                    "mobileOtp": "string",
                    "emailOtp": "string",
                    "todayOtpattempts": 0,
                    "createdAt": "2022-12-05T13:29:18.866Z",
                    "updatedAt": "2022-12-05T13:29:18.866Z",
                    "createdBy": 0,
                    "updatedBy": 0,
                    "dataStateId": 1,
                    "isSuperAdmin": false,
                    "userLanguageCode": "en"
                }
            }
            console.log(JSON.stringify(model, null, 2));
            PostRequest(loginUserApi, model).then(res => {
                if (res === 0) {
                    console.log("error", res);
                    setIsDisabled(false)
                    setMessage("please enter valid information")
                    setisShowError(true)
                }
                else {
                    setIsDisabled(false)
                    _setData('@token', JSON.stringify(res))
                    decodeJwt(res)
                    onPressLogin()
                    console.log(res);
                    setisShowError(false)
                }
            }
            )
        } catch (error) {
            console.log(error);
            setIsDisabled(false)
        }
    }

    const decodeJwt = (token) => {
        let tokenObj = jwt_decode(token)
        console.log(tokenObj, "---parse token")
        setAuthData({
            ...authData,
            isLogin: true,
            userId: tokenObj.UserID,
            userName: tokenObj.FirstName,
            phNumber: tokenObj.UserLogin
        })
        _setData('@tokenObj', JSON.stringify(tokenObj))

    }

    return (
        <Modal
            animationType="slide"
            statusBarTranslucent
            visible={visible}
        >
            <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>

                <ImageBackground
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
                            onPress={() => { onCancel() }}>
                            <AntDesign size={26} color={Colors.fieldTextColor} name={"arrowleft"} />
                        </TouchableOpacity>
                        <Image source={Logo.nlogo} style={{ alignSelf: "center", height: 110, width: 110, }} />
                    </View>
                </ImageBackground>

                <KeyboardAwareScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={styles.form}>
                    {
                        isShowError &&
                        <AppFormText
                            style={{
                                marginHorizontal: 40
                            }}
                            size={12}
                            color={Colors.fieldTextColor}
                            title={message}
                        />
                    }
                    <AppFormText
                        style={{
                            marginHorizontal: 40
                        }}
                        size={22}
                        color={Colors.fieldTextColor}
                        title="Login"
                    />

                    <AppFormField
                        placeholder={"0300 0000000"}
                        icon={"smartphone"}
                        value={formData.phoneNo}
                        onChange={(text) => onFormChange('phoneNo', text)}
                        keyboardType={'number-pad'}
                        errorMessage={error.phoneNo}
                    />

                    <AppFormField
                        placeholder={"Password"}
                        icon={"lock"}
                        value={formData.password}
                        onChange={(text) => onFormChange('password', text)}
                        secureTextEntry={showIcon}
                        onPress={() => setShowIcon(!showIcon)}
                        eyeicon={!showIcon ? Icon.show_eye : Icon.hide_eye}
                        errorMessage={error.password}
                    />

                    <View style={{ alignItems: "flex-end", marginHorizontal: 30 }}>
                        {/* <AppFormText
                            title="Fogot your password ?"
                        // onPress={() => navigation.navigate('NSignIn')
                        // }
                        /> */}
                    </View>


                    <View style={{ alignItems: 'center', marginTop: 35, marginBottom: 35, width: "100%", }}>
                        <AppSubmitButton
                            disabled={isDisabled}
                            isYellow={true}
                            name={"Login"}
                            onPress={() => {
                                checkValidity()

                            }}
                        />
                        <AppFormText
                            title="Sign Up"
                            onPress={onPresSignup}
                        >
                            Don't have an account?{' '}
                        </AppFormText>
                    </View>



                </KeyboardAwareScrollView>

            </SafeAreaView >
        </Modal>
    )
}

export default ModalSignIn

const styles = StyleSheet.create({
    form: {
        flex: 1,
        marginTop: 20

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






























