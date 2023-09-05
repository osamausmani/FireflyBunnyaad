import { StyleSheet, TouchableOpacity, View, ActivityIndicator, Alert, Text, Modal, StatusBar } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import AppText from './AppText';
import { Colors } from '../../constants';
import ModalCostSave from '../appModal/ModalCostSave';
import ModalSignIn from '../appModal/ModalSignIn';
import { insertClientCostEstimateApi } from '../../api/apiEndPoint';
import { PostRequest } from '../../api/axios';
import ModalSignup from '../appModal/ModalSignup';
import ModalOtp from '../appModal/ModalOtp';

const CostEstimateHeader = ({ authData, result, constructionData = null, navigation, percentage }) => {



    const [selectedItem, setSelectedItem] = useState(null)
    const [showIndicator, setShowIndicator] = useState(true);
    const [cityList, setCityList] = useState([]);

    const [showSaveProjectModal, setShowSaveProjectModal] = useState(false)
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showSignUpModal, setShowSignUpModal] = useState(false)
    const [showOtpModal, setShowOtpModal] = useState(false)

    const showAlert = () => {
        Alert.alert(
            "",
            // "Do you want  to save this Project for later ?",
            "Are you sure want to leave ?",
            [
                {
                    text: "No",
                    onPress: () => { },
                    style: "No"
                },
                {
                    text: "yes", onPress: () => {
                        navigation.replace("AppStack")
                        // authData?.isLogin ? setShowSaveProjectModal(true) : setShowLoginModal(true)

                    }
                }
            ]
        );
    }


    const SaveCostEstimate = async (projectName) => {

        try {
            const Model = {
                "userID": 0,
                "userKey": "string",
                "languageCode": "en",
                "ip": "string",
                "responseState": 200,

                "isPremium": false,
                "clientCostEstimate": {
                    "id": 0,
                    "userId": authData?.userId,
                    "projectName": projectName,
                    "projectTotalCost": 0,
                    "cityId": result.cityId,
                    "societyId": result.societyId,
                    "plotSizeId": result.plotSizeId,
                    "floorId": result.floorId,
                    "unitId": result.unitId,
                    "floorPlanId": result.floorPlanId,
                    "constructionQualityId": result.constructionQualityId,
                    "city": result.city,
                    "plotCategoryId": result.plotCategoryId,
                    "plotCategory": result.plotCategory,
                    "society": result.plotArea,
                    "plotSize": result.sizeOfPlot,
                    "floor": result.noOfFloors,
                    "unit": result.noOfUnits,
                    "floorPlan": result.floorPlan,
                    "constructionQuality": result.constructionQuality,
                    "isPaid": false,
                    "paymentMethodId": 0,
                    "paymentTransactionId": "string",
                    "rawMaterialDetails": constructionData !== null ? JSON.stringify(constructionData) : null,
                    "finishingRawMaterialDetails": null,
                    "completedPercentage": percentage,
                    "isFullyCompleted": false,
                    "costEstimateUrl": null,
                    "isInterstedInDiagrams": false,
                    "isInterestedInHomeFinance": false,
                    "diagramLeadStatus": 0,
                    "homeFinanceLeadStatus": 0,
                    "createdAt": "2022-12-07T12:48:43.935Z",
                    "updatedAt": "2022-12-07T12:48:43.935Z",
                    "createdBy": 0,
                    "updatedBy": 0,
                    "dataStateId": 1,
                    "bankId": 0
                }

            }
            // console.log(JSON.stringify(Model, null, 2));
            PostRequest(insertClientCostEstimateApi, Model).then(res => {
                if (res === 0) {
                    console.log("error");
                    setShowIndicator(false)
                }
                else {
                    setShowIndicator(false)
                    // console.log("res", JSON.stringify(res, null, 2));
                    navigation.replace("AppStack")
                }
            })
        } catch (error) {
            console.log(err);
        }
    }

    return (
        <>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => {
                    showAlert()
                }}>
                    <AppText
                        marginLeft={"5%"}
                        size={20}
                        bold
                        title={"X"}
                        color="#fff"
                    />
                </TouchableOpacity>
                <AppText
                    marginLeft={"0%"}
                    bold
                    size={20}
                    title={"Cancel"}
                    color="#fff"
                />
            </View>

            {/* Show Modals */}
            <ModalCostSave
                visible={showSaveProjectModal}
                onCancelPress={() => setShowSaveProjectModal(false)}
                onPressOk={(projectName) => {
                    console.log("Save Project", projectName)
                    SaveCostEstimate(projectName)
                    // navigation.replace("AppStack")
                    // setShowSaveProjectModal(false)
                }}
            />
            <ModalSignIn
                visible={showLoginModal}
                onCancel={() => setShowLoginModal(false)}
                onPresSignup={() => {
                    setShowLoginModal(false)
                    setShowSignUpModal(true)
                }}
                onPressLogin={() => setShowLoginModal(false)}
            />
            <ModalSignup
                visible={showSignUpModal}
                onCancel={() => setShowSignUpModal(false)}
                onPressLogin={() => {
                    setShowLoginModal(true)
                    setShowSignUpModal(false)
                }}
                onPressSignup={() => {
                    setShowOtpModal(true)
                    setShowSignUpModal(false)
                }}
            />
            <ModalOtp
                visible={showOtpModal}
                onCancel={() => setShowOtpModal(false)}
                onPressSubmit={() => setShowOtpModal(false)}
            />
        </>

    )
}

export default CostEstimateHeader

const styles = StyleSheet.create({
    header: {
        height: 75,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.new_blueColor,
        paddingHorizontal: 40
    },
})