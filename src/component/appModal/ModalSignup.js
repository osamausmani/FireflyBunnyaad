
import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native'
import React, { useContext, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AppFormField, AppFormText, Background, Logo, Icon, Colors, ValidateSignUp, AppSubmitButton } from '../../constants'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { PostRequest } from '../../api/axios';
import { insertUserApi } from '../../api/apiEndPoint';
import { userModel, User, userTextList } from "../../models"
import { AppContext } from '../../contextApi/AppProvider';

const ModalSignup = ({ visible, onCancel, onPressLogin, onPressSignup }) => {

    const { modalData, setModlData } = useContext(AppContext)

    const [isDisabled, setIsDisabled] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        phoneNo: '',
        password: '',
        confirmPassword: '',
    })
    const [error, setError] = useState({
        name: '',
        phoneNo: '',
        password: '',
        confirmPassword: '',
    })
    const [showIcon, setShowIcon] = useState({
        password: true,
        confirmPassword: true
    })

    const onFormChange = (key, value) => {
        setFormData({
            ...formData,
            [key]: value
        })
    }

    const handleSignUp = () => {
        setIsDisabled(true)
        const checkError = ValidateSignUp(formData);
        if (Object.values(checkError).every(e => e === '')) {
            InsetUser()
            setError({
                name: '',
                phoneNo: '',
                password: '',
                confirmPassword: '',
            })
        }
        else {
            setIsDisabled(false)
            setError(checkError)
            console.log("field Error");
        }
    }


    const InsetUser = () => {
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
                    "createdAt": "2022-12-02T07:10:06.480Z",
                    "updatedAt": "2022-12-02T07:10:06.480Z",
                    "createdBy": 0,
                    "updatedBy": 0,
                    "dataStateId": 1,
                    "isSuperAdmin": false,
                    "userLanguageCode": "en"
                },

                "userTextList": [
                    {
                        "userId": 0,
                        "languageCode": "en",
                        "firstName": formData?.name,
                        "lastName": "string",
                        "dataStateId": 1
                    }
                ]
            }
            // console.log(JSON.stringify(model, null, 2), "model")
            PostRequest(insertUserApi, model).then(res => {
                if (res === 0) {
                    console.log("error");
                    setError({
                        ...error,
                        name: 'number already registeered'
                    })
                    setIsDisabled(false)
                }
                else {
                    if (res.responseState == 200) {
                        setModlData({
                            ...modalData,
                            user: res.user
                        })
                        onPressSignup()
                        // console.log("user otp", res.user.mobileOtp);
                        setIsDisabled(false)
                    }
                    else {
                        setIsDisabled(false)
                        setError({
                            name: '',
                            phoneNo: "Phone no is already registered",
                            password: '',
                            confirmPassword: '',
                        })
                        // console.log("res", res.exceptionList[0].code, res.exceptionList[0].description);
                    }
                }
            }
            )
        } catch (error) {
            console.log(error);
            setIsDisabled(false)
        }
    }

    return (
        <Modal
            animationType="slide"
            visible={visible}
            statusBarTranslucent
        >
            <SafeAreaView style={{ backgroundColor: "#fff", flex: 1, height: "100%" }}>
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
                            onPress={() => {
                                onCancel()
                                setIsDisabled(false)
                            }}>
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
                        size={22}
                        color={"#000"}
                        title="Create Account"
                    />
                    <AppFormField
                        placeholder={"User Name"}
                        icon={"user"}
                        value={formData.name}
                        onChange={(text) => onFormChange('name', text)}
                        errorMessage={error.name}
                    />

                    <AppFormField
                        placeholder={"03000000000"}
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
                        onPress={() => setShowIcon((prev) => ({ ...prev, password: !prev.password }))}
                        secureTextEntry={showIcon.password}
                        eyeicon={!showIcon.password ? Icon.show_eye : Icon.hide_eye}
                        errorMessage={error.password}
                    />
                    <AppFormField
                        placeholder={"Re-type Password"}
                        icon={"lock"}
                        value={formData.confirmPassword}
                        onChange={(text) => onFormChange('confirmPassword', text)}
                        secureTextEntry={showIcon.confirmPassword}
                        onPress={() => setShowIcon((prev) => ({ ...prev, confirmPassword: !prev.confirmPassword }))}
                        eyeicon={!showIcon.confirmPassword ? Icon.show_eye : Icon.hide_eye}
                        errorMessage={error.confirmPassword}
                    />

                    <View style={{ alignItems: 'center', marginTop: 35, marginBottom: 35, width: "100%", }}>
                        <AppSubmitButton
                            disabled={isDisabled}
                            isYellow={true}
                            name={"Register"}
                            onPress={() => {
                                handleSignUp()
                            }}
                        />
                        <AppFormText
                            title="Login"
                            onPress={onPressLogin}
                        >
                            Already have an account?{' '}
                        </AppFormText>
                    </View>
                </KeyboardAwareScrollView>

            </SafeAreaView>
        </Modal>
    )
}

export default ModalSignup

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
